import slugify from 'slugify';

export function generateSlug(name: string): string {
  return slugify(name, {
    lower: true,
    strict: true,
    locale: 'de',
  });
}

/**
 * Get the app base URL - works on both server and client
 * Priority: ENV variable > window.location.origin > production fallback
 */
export function getAppUrl(): string {
  // First check for environment variable
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // On client-side, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Fallback to production URL (never localhost in production)
  return 'https://qr-menu-app-beta.vercel.app';
}

/**
 * Generate the full menu URL for a restaurant
 */
export function getMenuUrl(slug: string): string {
  return `${getAppUrl()}/m/${slug}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
