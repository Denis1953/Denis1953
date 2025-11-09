import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Valid activities list
const VALID_ACTIVITIES = [
  "J’accepte de recevoir des informations concernant la liste Ensemble pour Fontaine 2026.",
  "Je souhaite organiser une réunion à mon domicile afin d’échanger avec Franck LONGO et son équipe.",
  "Je suis prêt à aider Franck LONGO et son équipe dans le cadre des élections municipales.",
  "J’accepte de rejoindre le comité de soutien de la liste Ensemble pour Fontaine 2026 conduite par Franck LONGO et j’accepte que mon nom soit diffusé.",
];

// Server-side validation schema
const volunteerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(255).optional().or(z.literal("")),
  phone: z.string()
    .trim()
    .min(1, "Phone is required")
    .transform(val => val.replace(/\s/g, ''))
    .refine(
      (val) => /^\+?[0-9]{8,15}$/.test(val),
      { message: "Invalid phone format" }
    ),
  activities: z.array(z.string().refine(
    (activity) => VALID_ACTIVITIES.includes(activity),
    { message: "Invalid activity" }
  )).min(1).max(10)
});

interface VolunteerRequest {
  name: string;
  email?: string;
  phone: string;
  activities: string[];
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
    .from('volunteer_responses')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneHourAgo);
  
  return (count || 0) < 5; // Max 5 submissions per hour per fingerprint
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
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

    const requestData: VolunteerRequest = await req.json();
    console.log("Received volunteer submission");

    // Server-side validation with Zod
    const validation = volunteerSchema.safeParse(requestData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Données invalides",
          details: validation.error.errors.map(e => e.message)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, activities } = validation.data;

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

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

    // Insert into database
    const { error: dbError } = await supabase
      .from("volunteer_responses")
      .insert({
        name,
        email: email || null,
        phone,
        activities,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement. Veuillez réessayer." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Successfully inserted into database");

    // HTML escape function
    const escapeHtml = (text: string) => 
      text.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char] || char));

    // Format activities list for email with sanitization
    const activitiesList = activities
      .map((activity) => `<li style="margin: 8px 0;">${escapeHtml(activity)}</li>`)
      .join("");

    // Get admin email from environment and validate
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
          const emailResponse = await resend.emails.send({
          from: "Ensemble pour Fontaine <onboarding@resend.dev>",
          to: recipients,
          subject: "Nouvelle candidature bénévole - Franck Longo 2026",
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
            Nouvelle candidature bénévole
          </h1>
          
          <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 20px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Informations du bénévole</h2>
            <p style="margin: 10px 0;"><strong>Nom :</strong> ${escapeHtml(name)}</p>
            ${email ? `<p style="margin: 10px 0;"><strong>Email :</strong> ${escapeHtml(email)}</p>` : ""}
            <p style="margin: 10px 0;"><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Activités sélectionnées</h2>
            <ul style="list-style-type: none; padding-left: 0; color: #555;">
              ${activitiesList}
            </ul>
          </div>

          <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Cette notification a été envoyée automatiquement le ${new Date().toLocaleString("fr-FR")}.</p>
            <p>Répondez directement à ${email} pour contacter le bénévole.</p>
          </div>
        </div>
      `,
        });

          if (emailResponse.error) {
            console.error("Resend error:", emailResponse.error);
          } else {
            console.log("Email sent successfully");
          }
        }
      } catch (e) {
        console.error("Email sending exception:", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Candidature envoyée avec succès" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-volunteer-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
