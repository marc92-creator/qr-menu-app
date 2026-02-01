/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

// Required environment variables for all environments
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_APP_URL',
] as const;

// Required server-side environment variables
const REQUIRED_SERVER_ENV_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

// Optional but recommended environment variables
const RECOMMENDED_ENV_VARS = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_ID',
  'LEMON_SQUEEZY_WEBHOOK_SECRET',
  'ANTHROPIC_API_KEY',
] as const;

interface ValidationResult {
  isValid: boolean;
  missing: string[];
  missingRecommended: string[];
}

/**
 * Validate environment variables
 * Should be called at application startup
 */
export function validateEnv(): ValidationResult {
  const missing: string[] = [];
  const missingRecommended: string[] = [];

  // Check required variables
  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  // Check server-side required variables (only on server)
  if (typeof window === 'undefined') {
    for (const varName of REQUIRED_SERVER_ENV_VARS) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }

    // Check recommended variables
    for (const varName of RECOMMENDED_ENV_VARS) {
      if (!process.env[varName]) {
        missingRecommended.push(varName);
      }
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
    missingRecommended,
  };
}

/**
 * Validate environment variables and throw error if invalid
 * Use this at application startup
 */
export function validateEnvOrThrow(): void {
  const result = validateEnv();

  if (!result.isValid) {
    const errorMessage = `
╔════════════════════════════════════════════════════════════════╗
║ FEHLER: Fehlende Umgebungsvariablen                           ║
╚════════════════════════════════════════════════════════════════╝

Folgende erforderliche Umgebungsvariablen fehlen:
${result.missing.map(v => `  ❌ ${v}`).join('\n')}

Bitte füge diese Variablen zu deiner .env.local Datei hinzu.
Siehe .env.example für ein Beispiel.
    `.trim();

    console.error(errorMessage);
    throw new Error('Missing required environment variables');
  }

  if (result.missingRecommended.length > 0) {
    const warningMessage = `
╔════════════════════════════════════════════════════════════════╗
║ WARNUNG: Empfohlene Umgebungsvariablen fehlen                ║
╚════════════════════════════════════════════════════════════════╝

Folgende empfohlene Umgebungsvariablen fehlen:
${result.missingRecommended.map(v => `  ⚠️  ${v}`).join('\n')}

Diese Features funktionieren möglicherweise nicht:
  - STRIPE_*: Stripe-Zahlungen
  - LEMON_SQUEEZY_WEBHOOK_SECRET: Lemon Squeezy Webhooks
  - ANTHROPIC_API_KEY: KI-Beschreibungen und Übersetzungen
    `.trim();

    console.warn(warningMessage);
  }
}

/**
 * Get environment variable with validation
 * Throws error if variable is missing
 */
export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

/**
 * Get optional environment variable
 * Returns undefined if not set
 */
export function getOptionalEnv(name: string): string | undefined {
  return process.env[name];
}
