# 🔒 Audit de Sécurité - ensemblepourfontaine2026.fr

**Date de l'audit :** 9 novembre 2025
**Auditeur :** Claude (Anthropic)
**Projet :** Site web de campagne municipale - Franck Longo 2026
**Technologies :** React 18, TypeScript, Vite, Supabase, Tailwind CSS

---

## 📋 Résumé Exécutif

L'audit de sécurité a identifié **plusieurs vulnérabilités critiques** qui nécessitent une attention immédiate. Le site présente des failles de sécurité majeures concernant l'exposition de secrets, la configuration des APIs, et la protection contre les abus.

### Niveau de Risque Global : 🔴 **CRITIQUE**

- **Vulnérabilités Critiques :** 3
- **Vulnérabilités Élevées :** 2
- **Vulnérabilités Moyennes :** 5
- **Vulnérabilités Faibles :** 7

---

## 🚨 Vulnérabilités Critiques (Action Immédiate Requise)

### 1. 🔴 CRITIQUE - Fichier `.env` commité dans Git

**Localisation :** `.env:1-4`
**Niveau de risque :** CRITIQUE
**CVSS Score :** 9.8 (Critical)

**Description :**
Le fichier `.env` contenant les clés secrètes Supabase a été commité dans l'historique Git et est publiquement accessible.

**Preuve :**
```bash
git log --all --full-history -- .env
# commit 14b92403212c14e70c8c4d1a37cc30844757d342
```

**Données exposées :**
```
VITE_SUPABASE_PROJECT_ID="zigopbuvtioxpwcbgszz"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://zigopbuvtioxpwcbgszz.supabase.co"
```

**Impact :**
- ✅ Un attaquant peut accéder à votre base de données Supabase
- ✅ Possibilité de lire/modifier/supprimer des données selon les RLS policies
- ✅ Abus des Edge Functions sans restriction
- ✅ Épuisement des quotas Supabase (déni de service)

**Recommandations URGENTES :**
1. **Immédiat :**
   - Révoquer les clés Supabase actuelles dans le dashboard Supabase
   - Générer de nouvelles clés
   - Supprimer le fichier `.env` de Git : `git rm --cached .env`

2. **Court terme :**
   - Ajouter `.env` au `.gitignore` (DÉJÀ MANQUANT !)
   - Créer un `.env.example` sans valeurs réelles
   - Utiliser BFG Repo-Cleaner pour purger l'historique Git

3. **Long terme :**
   - Mettre en place des hooks Git pre-commit pour empêcher les commits de secrets
   - Utiliser un outil comme `git-secrets` ou `detect-secrets`

**Fichiers à modifier :**
```bash
# .gitignore - AJOUTER :
.env
.env.local
.env.production
.env.*.local
```

---

### 2. 🔴 CRITIQUE - Edge Functions sans vérification JWT

**Localisation :** `supabase/config.toml:3-7`
**Niveau de risque :** CRITIQUE
**CVSS Score :** 8.6 (High)

**Description :**
Les Edge Functions Supabase sont configurées avec `verify_jwt = false`, permettant à n'importe qui d'appeler ces fonctions sans authentification.

**Code vulnérable :**
```toml
[functions.send-proxy-notification]
verify_jwt = false

[functions.send-volunteer-notification]
verify_jwt = false
```

**Impact :**
- ✅ Spam massif de formulaires
- ✅ Abus de l'API d'envoi d'emails (épuisement du quota Resend)
- ✅ Insertion de données malveillantes en base
- ✅ Coûts financiers accrus (quotas dépassés)
- ✅ Déni de service

**Recommandations :**
1. **Option A - Activer JWT (recommandé pour admin) :**
   ```toml
   [functions.send-proxy-notification]
   verify_jwt = true

   [functions.send-volunteer-notification]
   verify_jwt = true
   ```

2. **Option B - Ajouter CAPTCHA (recommandé pour formulaires publics) :**
   - Implémenter Google reCAPTCHA v3
   - Vérifier le token CAPTCHA côté serveur dans les Edge Functions
   - Remplacer `VITE_RECAPTCHA_SITE_KEY="VOTRE_CLE_DE_SITE_RECAPTCHA"` par une vraie clé

3. **Option C - Combiner les deux (RECOMMANDÉ) :**
   - CAPTCHA pour les formulaires publics
   - JWT pour les opérations admin

---

### 3. 🔴 CRITIQUE - Fichier `.gitignore` incomplet

**Localisation :** `.gitignore:1-25`
**Niveau de risque :** CRITIQUE
**CVSS Score :** 8.2 (High)

**Description :**
Le fichier `.gitignore` ne contient PAS `.env`, ce qui a permis le commit accidentel de secrets.

**Fichiers sensibles manquants :**
```gitignore
# Actuellement ABSENT :
.env
.env.local
.env.production
.env.*.local
```

**Impact :**
- ✅ Risque élevé de commits accidentels de secrets
- ✅ Exposition de clés API, tokens, mots de passe

**Recommandations :**
```gitignore
# Environment variables
.env
.env.local
.env.production
.env.development
.env.*.local

# Sensitive files
*.key
*.pem
*.p12
credentials.json
secrets.yaml
```

---

## ⚠️ Vulnérabilités Élevées

### 4. 🟠 ÉLEVÉ - Bug de Rate Limiting dans Edge Functions

**Localisation :**
- `supabase/functions/send-volunteer-notification/index.ts:60-71`
- `supabase/functions/send-proxy-notification/index.ts:53-64`

**Niveau de risque :** ÉLEVÉ
**CVSS Score :** 7.4 (High)

**Description :**
Le rate limiting compte TOUTES les soumissions dans la dernière heure, pas seulement celles du même fingerprint. Cela bloque les utilisateurs légitimes après 5 soumissions totales.

**Code vulnérable :**
```typescript
async function checkRateLimit(supabase: any, fingerprint: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // BUG : Compte TOUTES les soumissions, pas par fingerprint !
  const { count } = await supabase
    .from('volunteer_responses')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneHourAgo);

  return (count || 0) < 5; // FAUX : ne filtre pas par fingerprint
}
```

**Impact :**
- ✅ Déni de service involontaire pour les utilisateurs légitimes
- ✅ Rate limiting inefficace (n'empêche pas vraiment le spam)
- ✅ Mauvaise expérience utilisateur

**Recommandations :**

**Solution 1 - Table dédiée de rate limiting (RECOMMANDÉ) :**
```sql
-- Migration SQL
CREATE TABLE public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  INDEX idx_fingerprint_created (fingerprint, created_at)
);

-- RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.rate_limits USING (false);
```

```typescript
async function checkRateLimit(supabase: any, fingerprint: string, endpoint: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Compter par fingerprint ET endpoint
  const { count } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('fingerprint', fingerprint)
    .eq('endpoint', endpoint)
    .gte('created_at', oneHourAgo);

  if ((count || 0) >= 5) {
    return false;
  }

  // Enregistrer la tentative
  await supabase.from('rate_limits').insert({ fingerprint, endpoint });
  return true;
}
```

**Solution 2 - Utiliser Supabase Edge Functions avec Upstash Redis (production) :**
```typescript
import { Redis } from "https://esm.sh/@upstash/redis@1.34.3";

const redis = new Redis({
  url: Deno.env.get("UPSTASH_REDIS_URL")!,
  token: Deno.env.get("UPSTASH_REDIS_TOKEN")!,
});

async function checkRateLimit(fingerprint: string): Promise<boolean> {
  const key = `ratelimit:${fingerprint}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 heure
  }

  return count <= 5;
}
```

---

### 5. 🟠 ÉLEVÉ - CORS trop permissif

**Localisation :**
- `supabase/functions/send-volunteer-notification/index.ts:8-11`
- `supabase/functions/send-proxy-notification/index.ts:8-11`

**Niveau de risque :** ÉLEVÉ
**CVSS Score :** 6.8 (Medium)

**Description :**
Les Edge Functions utilisent `Access-Control-Allow-Origin: "*"`, permettant à n'importe quel site d'appeler ces APIs.

**Code vulnérable :**
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // ⚠️ TROP PERMISSIF !
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
```

**Impact :**
- ✅ N'importe quel site peut abuser de vos APIs
- ✅ CSRF (Cross-Site Request Forgery) possible
- ✅ Spam depuis des sites malveillants

**Recommandations :**
```typescript
const allowedOrigins = [
  'https://ensemblepourfontaine2026.fr',
  'https://www.ensemblepourfontaine2026.fr',
  'https://lovable.app', // Pour le développement
];

const corsHeaders = (origin: string | null) => {
  const allowedOrigin = allowedOrigins.includes(origin || '')
    ? origin
    : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
};

// Dans le handler :
const origin = req.headers.get('origin');
return new Response(json, {
  headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
});
```

---

## ⚡ Vulnérabilités Moyennes

### 6. 🟡 MOYEN - Pas de protection CAPTCHA

**Niveau de risque :** MOYEN
**CVSS Score :** 5.3 (Medium)

**Description :**
Les formulaires publics n'ont aucune protection CAPTCHA, facilitant les attaques automatisées.

**Recommandations :**

1. **Implémenter reCAPTCHA v3 :**

```tsx
// VolunteerForm.tsx
import ReCAPTCHA from "react-google-recaptcha";

const onSubmit = async (data: VolunteerFormData) => {
  // Obtenir le token CAPTCHA
  const recaptchaToken = await recaptchaRef.current?.executeAsync();

  const { error } = await supabase.functions.invoke("send-volunteer-notification", {
    body: {
      ...data,
      recaptchaToken, // Envoyer le token
    },
  });
};
```

2. **Vérifier côté serveur :**

```typescript
// Edge Function
async function verifyCaptcha(token: string): Promise<boolean> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${Deno.env.get('RECAPTCHA_SECRET_KEY')}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success && data.score >= 0.5; // Score minimum
}

// Dans le handler
const { recaptchaToken, ...formData } = requestData;
if (!await verifyCaptcha(recaptchaToken)) {
  return new Response(
    JSON.stringify({ error: "Vérification CAPTCHA échouée" }),
    { status: 400, headers: corsHeaders }
  );
}
```

---

### 7. 🟡 MOYEN - Email admin pattern prévisible

**Localisation :** `src/pages/Auth.tsx:60`
**Niveau de risque :** MOYEN
**CVSS Score :** 5.0 (Medium)

**Description :**
Le pattern email `${username}@fontaine-admin.local` est prévisible et facilite les attaques par énumération.

**Code vulnérable :**
```typescript
const email = `${username.toLowerCase()}@fontaine-admin.local`;
```

**Impact :**
- ✅ Énumération des comptes admin possibles
- ✅ Facilite les attaques par force brute
- ✅ Révèle la structure interne

**Recommandations :**

1. **Utiliser des emails réels :**
```typescript
// Supprimer la transformation, utiliser l'email directement
const { data, error } = await supabase.auth.signInWithPassword({
  email: username, // L'utilisateur entre son vrai email
  password,
});
```

2. **Ajouter un delay sur les tentatives échouées :**
```typescript
if (error) {
  // Delay pour ralentir les attaques brute force
  await new Promise(resolve => setTimeout(resolve, 2000));
  toast.error("Identifiant ou mot de passe incorrect");
}
```

3. **Implémenter un rate limiting côté client :**
```typescript
const [loginAttempts, setLoginAttempts] = useState(0);

if (loginAttempts >= 5) {
  toast.error("Trop de tentatives. Réessayez dans 15 minutes.");
  return;
}

if (error) {
  setLoginAttempts(prev => prev + 1);
}
```

---

### 8. 🟡 MOYEN - Logs contenant des données sensibles

**Localisation :** Multiple fichiers
**Niveau de risque :** MOYEN
**CVSS Score :** 4.7 (Medium)

**Description :**
Les Edge Functions loggent des informations potentiellement sensibles avec `console.log` et `console.error`.

**Exemples :**
```typescript
console.log("Received volunteer submission"); // OK
console.error("Login error:", error); // ⚠️ Peut contenir des infos sensibles
console.error("Validation failed:", validation.error.errors); // ⚠️ Expose la structure
```

**Recommandations :**

1. **Sanitiser les logs :**
```typescript
// Créer une fonction de log sécurisée
function safeLog(message: string, data?: any) {
  const sanitized = data ? {
    ...data,
    password: '[REDACTED]',
    email: data.email ? data.email.replace(/(.{2}).*(@.*)/, '$1***$2') : undefined,
    phone: data.phone ? data.phone.replace(/(\d{2}).*(\d{2})/, '$1****$2') : undefined,
  } : undefined;

  console.log(message, sanitized);
}
```

2. **Utiliser des niveaux de log :**
```typescript
const LOG_LEVEL = Deno.env.get('LOG_LEVEL') || 'INFO';

function log(level: string, message: string, data?: any) {
  if (shouldLog(level, LOG_LEVEL)) {
    console.log(`[${level}] ${message}`, data);
  }
}
```

---

### 9. 🟡 MOYEN - Validation email faible côté serveur

**Localisation :** Edge Functions
**Niveau de risque :** MOYEN
**CVSS Score :** 4.5 (Medium)

**Description :**
La validation d'email utilise une regex simple qui peut accepter des emails invalides.

**Code actuel :**
```typescript
.filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
```

**Problèmes :**
- Accepte des emails comme `test@test..com`
- N'empêche pas `test@-domain.com`
- Pas de vérification DNS du domaine

**Recommandations :**

1. **Utiliser une regex plus stricte :**
```typescript
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```

2. **Utiliser une bibliothèque de validation :**
```typescript
import { z } from "zod";

const emailSchema = z.string().email().refine(
  async (email) => {
    // Vérification DNS optionnelle
    try {
      const domain = email.split('@')[1];
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
      const data = await response.json();
      return data.Answer && data.Answer.length > 0;
    } catch {
      return true; // Ne pas bloquer si la vérification échoue
    }
  },
  { message: "Domaine email invalide" }
);
```

---

### 10. 🟡 MOYEN - Pas de CSP (Content Security Policy)

**Niveau de risque :** MOYEN
**CVSS Score :** 4.3 (Medium)

**Description :**
Aucun header Content-Security-Policy n'est défini, augmentant les risques XSS.

**Recommandations :**

1. **Ajouter CSP dans index.html :**
```html
<meta http-equiv="Content-Security-Policy"
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://zigopbuvtioxpwcbgszz.supabase.co;
        frame-src 'self' https://www.google.com;
      ">
```

2. **Ajouter dans vite.config.ts pour le dev :**
```typescript
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-csp',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>\n<meta http-equiv="Content-Security-Policy" content="...">`
        );
      },
    },
  ],
});
```

---

## 📊 Vulnérabilités dans les Dépendances

### npm audit a détecté 7 vulnérabilités :

| Package | Sévérité | CVE | Description |
|---------|----------|-----|-------------|
| `vite` | Moderate | GHSA-vg6x-rcgg-rjx6 | Bypass de `server.fs.deny` |
| `vite` | Moderate | GHSA-x574-m823-4x7w | Bypass avec `?raw` |
| `vite` | Moderate | GHSA-4r4m-qw57-chr8 | Bypass avec `?import` |
| `vite` | Moderate | GHSA-93m4-6634-74q7 | Bypass via backslash Windows |
| `@babel/runtime` | Moderate | GHSA-968p-4wvh-cqc8 | RegExp inefficient |
| `brace-expansion` | Low | GHSA-v6h2-p8h4-qcjw | ReDoS |
| `@eslint/plugin-kit` | Low | GHSA-xffm-g5w8-qvg7 | ReDoS |

**Recommandations :**
```bash
# Mettre à jour toutes les dépendances
npm audit fix

# Ou manuellement :
npm install vite@latest @vitejs/plugin-react-swc@latest
npm install @babel/runtime@latest
npm install eslint@latest
```

---

## ✅ Points Positifs Identifiés

Malgré les vulnérabilités, certains aspects de sécurité sont bien implémentés :

1. ✅ **Row Level Security (RLS) activé** sur toutes les tables Supabase
2. ✅ **Validation Zod** côté client ET serveur
3. ✅ **HTML escaping** dans les emails pour prévenir XSS
4. ✅ **Politiques RLS strictes** :
   - `admin_users` : Insertion bloquée via app (`WITH CHECK (false)`)
   - `volunteer_responses` / `proxy_requests` : SELECT bloqué (anti-énumération)
5. ✅ **Utilisation de HTTPS** via Supabase
6. ✅ **Validation de Content-Type** dans les Edge Functions
7. ✅ **React Hook Form** avec validation stricte
8. ✅ **Fingerprinting multi-facteurs** (IP + User-Agent + Accept-Language)
9. ✅ **Service Role Key** utilisée côté serveur (pas exposée au client)

---

## 🎯 Plan d'Action Recommandé

### Phase 1 : URGENT (À faire IMMÉDIATEMENT)

1. **Révoquer et régénérer les clés Supabase**
2. **Ajouter `.env` au `.gitignore`**
3. **Purger `.env` de l'historique Git**
4. **Activer CAPTCHA sur les formulaires**

### Phase 2 : Court Terme (Cette semaine)

5. **Corriger le bug de rate limiting**
6. **Restreindre CORS aux domaines autorisés**
7. **Mettre à jour les dépendances vulnérables**
8. **Ajouter CSP headers**

### Phase 3 : Moyen Terme (Ce mois)

9. **Implémenter un rate limiting robuste avec Redis**
10. **Ajouter des hooks Git pre-commit**
11. **Mettre en place un monitoring de sécurité**
12. **Audit de pénétration externe**

### Phase 4 : Long Terme (3-6 mois)

13. **SOC 2 / ISO 27001 compliance (si applicable)**
14. **Bug bounty program**
15. **Formation sécurité pour l'équipe**

---

## 📞 Contact & Support

Pour toute question concernant cet audit :
- **Email :** ensemblepourfontaine2026@gmail.com
- **Projet Supabase :** zigopbuvtioxpwcbgszz

---

## 📝 Notes de Fin

Cet audit a été réalisé de manière automatisée et manuelle. Certaines vulnérabilités peuvent nécessiter une vérification supplémentaire en environnement de production.

**Rappel important :** La sécurité est un processus continu. Ce rapport doit être mis à jour régulièrement.

---

**Signature de l'audit :**
Claude Code - Anthropic
Date : 2025-11-09
