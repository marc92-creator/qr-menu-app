import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * CSRF Protection Middleware
 *
 * Protects against Cross-Site Request Forgery attacks by:
 * 1. Checking Origin header for state-changing requests
 * 2. Verifying requests come from same origin
 * 3. Allowing safe methods (GET, HEAD, OPTIONS) without checks
 */

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

// Routes that should bypass CSRF checks (webhooks from external services)
const CSRF_BYPASS_ROUTES = [
  '/api/webhooks/stripe',
  '/api/webhooks/lemonsqueezy',
];

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const method = request.method;

  // Skip CSRF check for safe methods
  if (SAFE_METHODS.includes(method)) {
    return NextResponse.next();
  }

  // Skip CSRF check for webhook routes (they use signature verification instead)
  if (CSRF_BYPASS_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check Origin header for state-changing requests (POST, PUT, DELETE, PATCH)
  const requestOrigin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // For API routes, enforce origin checking
  if (pathname.startsWith('/api/')) {
    // Allow requests from same origin
    if (requestOrigin === origin) {
      return NextResponse.next();
    }

    // Check referer as fallback (less reliable but better than nothing)
    if (referer && referer.startsWith(origin)) {
      return NextResponse.next();
    }

    // Allow localhost/development origins
    if (process.env.NODE_ENV === 'development') {
      if (requestOrigin?.includes('localhost') || requestOrigin?.includes('127.0.0.1')) {
        return NextResponse.next();
      }
    }

    // Block request if origin check fails
    console.warn('[CSRF] Blocked request:', {
      method,
      pathname,
      origin: requestOrigin,
      referer,
      expectedOrigin: origin,
    });

    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Configure which routes should run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
