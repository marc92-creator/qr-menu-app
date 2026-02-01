/**
 * Instrumentation file - runs once when the server starts
 * Used for initialization and validation
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run on server
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnvOrThrow } = await import('./lib/env');

    try {
      validateEnvOrThrow();
    } catch {
      // Error is already logged in validateEnvOrThrow
      // Exit with error code to prevent server from starting with invalid config
      process.exit(1);
    }
  }
}
