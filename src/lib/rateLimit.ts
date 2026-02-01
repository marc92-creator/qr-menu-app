/**
 * Simple in-memory rate limiter
 *
 * For production with multiple instances, consider using:
 * - Upstash Redis (@upstash/ratelimit)
 * - Vercel KV
 * - Redis
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  max: number;      // Maximum requests
  window: number;   // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if request is within rate limit
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  // Get or create entry
  let entry = store[key];

  if (!entry || entry.resetAt < now) {
    // Create new entry
    entry = {
      count: 0,
      resetAt: now + config.window,
    };
    store[key] = entry;
  }

  // Increment counter
  entry.count++;

  const success = entry.count <= config.max;
  const remaining = Math.max(0, config.max - entry.count);

  return {
    success,
    limit: config.max,
    remaining,
    reset: entry.resetAt,
  };
}

/**
 * Get identifier from request (IP address or user ID)
 */
export function getIdentifier(request: Request, userId?: string): string {
  if (userId) {
    return `user:${userId}`;
  }

  // Try to get real IP from headers (for proxies/load balancers)
  const headers = request.headers;
  const forwarded = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');

  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';
  return `ip:${ip}`;
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: 'Zu viele Anfragen. Bitte versuche es später erneut.',
      limit: result.limit,
      remaining: result.remaining,
      reset: new Date(result.reset).toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.reset.toString(),
        'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
      },
    }
  );
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  // Very strict - for expensive operations (AI API calls)
  AI_API: { max: 10, window: 60 * 1000 },        // 10 req/min

  // Strict - for authenticated operations
  AUTH_STRICT: { max: 20, window: 60 * 1000 },   // 20 req/min

  // Moderate - for general API endpoints
  API_MODERATE: { max: 60, window: 60 * 1000 },  // 60 req/min

  // Relaxed - for public read operations
  PUBLIC_RELAXED: { max: 100, window: 60 * 1000 }, // 100 req/min

  // Analytics tracking - allow bursts
  TRACKING: { max: 30, window: 60 * 1000 },      // 30 req/min
} as const;
