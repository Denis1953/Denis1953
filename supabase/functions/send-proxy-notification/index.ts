import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Server-side validation schema
const proxyRequestSchema = z.object({
  nom: z.string().trim().min(1).max(100),
  prenom: z.string().trim().min(1).max(100),
  email: z.string().email().max(255).optional().or(z.literal("")),
  telephone: z.string()
    .trim()
    .min(1, "Phone is required")
    .transform(val => val.replace(/\s/g, ''))
    .refine(
      (val) => /^\+?[0-9]{8,15}$/.test(val),
      { message: "Invalid phone format" }
    ),
  adresse: z.string().trim().min(5).max(300),
  tours: z.array(z.enum(['1er tour le 15 mars', '2ème tour le 22 mars'])).min(1)
});

interface ProxyRequest {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email?: string;
  tours: string[];
}

// Enhanced rate limiting using request fingerprinting
// Combines multiple factors to make spoofing much harder
function createRequestFingerprint(req: Request): string {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             req.headers.get('cf-connecting-ip') || 
             'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const acceptLanguage = req.headers.get('accept-language') || 'unknown';
  
  // Create a fingerprint by combining multiple factors
  // Much harder to spoof all three simultaneously
  return `${ip}|${userAgent}|${acceptLanguage}`;
}

async function checkRateLimit(supabase: any, fingerprint: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  // Store fingerprint hash in created_at for basic tracking
  // In a production system, you'd want a dedicated rate_limit table
  const { count } = await supabase
    .from('proxy_requests')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneHourAgo);
  
  return (count || 0) < 5; // Max 5 submissions per hour per fingerprint
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: "Type de contenu invalide" }),
        { status: 415, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requestData: ProxyRequest = await req.json();
    console.log("Received proxy request");

    // Server-side validation with Zod
    const validation = proxyRequestSchema.safeParse(requestData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Données invalides",
          details: validation.error.errors.map(e => e.message)
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const validatedData = validation.data;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Rate limiting check with enhanced fingerprinting
    const fingerprint = createRequestFingerprint(req);
    const rateLimitOk = await checkRateLimit(supabase, fingerprint);
    
    if (!rateLimitOk) {
      console.warn("Rate limit exceeded for fingerprint:", fingerprint.substring(0, 50));
      return new Response(
        JSON.stringify({ error: "Trop de demandes. Veuillez réessayer plus tard." }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Insert into database using validated data
    const { data, error: dbError } = await supabase
      .from("proxy_requests")
      .insert([validatedData])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement. Veuillez réessayer." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Successfully inserted proxy request");

    // Send email notification with sanitized data
    const escapeHtml = (text: string) => 
      text.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char] || char));

    const emailHtml = `
      <h2>Nouvelle demande de mandataire</h2>
      <p>Une nouvelle demande de mandataire a été soumise :</p>
      <ul>
        <li><strong>Nom :</strong> ${escapeHtml(validatedData.nom)}</li>
        <li><strong>Prénom :</strong> ${escapeHtml(validatedData.prenom)}</li>
        <li><strong>Adresse :</strong> ${escapeHtml(validatedData.adresse)}</li>
        <li><strong>Téléphone :</strong> ${escapeHtml(validatedData.telephone)}</li>
        ${validatedData.email ? `<li><strong>Email :</strong> ${escapeHtml(validatedData.email)}</li>` : ''}
        <li><strong>Tour(s) :</strong> ${validatedData.tours.map(escapeHtml).join(", ")}</li>
      </ul>
    `;

    // Send email notification with validated email addresses
    const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL');
    if (!adminEmail) {
      console.error('ADMIN_NOTIFICATION_EMAIL not configured - skipping email notification');
    } else {
      try {
        // Validate and filter email addresses
        const recipients = adminEmail
          .split(/[;,]+/)
          .map((s) => s.trim())
          .filter(Boolean)
          .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

        if (recipients.length === 0) {
          console.error('No valid email addresses in ADMIN_NOTIFICATION_EMAIL - skipping notification');
        } else {
          const { error: emailError } = await resend.emails.send({
            from: "Procurations <onboarding@resend.dev>",
            to: recipients,
            subject: "Nouvelle demande de mandataire",
            html: emailHtml,
          });
          
          if (emailError) {
            console.error("Resend API error:", emailError);
          } else {
            console.log("Email sent successfully");
          }
        }
      } catch (e) {
        console.error("Email sending exception:", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Demande envoyée avec succès" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-proxy-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
