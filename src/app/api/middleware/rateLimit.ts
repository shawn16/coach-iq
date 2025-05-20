import { NextRequest } from 'next/server';

// In-memory store for development
const devRateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Mock rate limiter for development
async function mockRateLimit(ip: string) {
  const WINDOW_MS = 10 * 1000; // 10 seconds
  const MAX_REQUESTS = 10;
  const now = Date.now();
  
  // Get or create rate limit entry
  const entry = devRateLimitStore.get(ip) || { count: 0, resetTime: now + WINDOW_MS };
  
  // Reset counter if window has passed
  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + WINDOW_MS;
  }

  // Check if rate limit exceeded
  entry.count++;
  devRateLimitStore.set(ip, entry);
  
  return {
    success: entry.count <= MAX_REQUESTS,
    limit: MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    reset: Math.ceil(entry.resetTime / 1000),
  };
}

// Production rate limiter using Upstash
async function productionRateLimit(ip: string) {
  const { Ratelimit } = await import('@upstash/ratelimit');
  const { Redis } = await import('@upstash/redis');

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: '@upstash/ratelimit',
  });

  return ratelimit.limit(ip);
}

// Use mock in development, Upstash in production
export async function rateLimitRequest(req: Request) {
  // Skip rate limiting in test environment
  if (process.env.NODE_ENV === 'test') {
    return { success: true, limit: 10, remaining: 9, reset: 0 };
  }

  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  
  try {
    const result = process.env.NODE_ENV === 'production'
      ? await productionRateLimit(ip)
      : await mockRateLimit(ip);

    if (!result.success) {
      return {
        success: false,
        message: 'Too many requests',
        retryAfter: Math.ceil((result.reset * 1000 - Date.now()) / 1000),
      };
    }


    return { 
      success: true,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Allow the request to proceed if there's an error with rate limiting
    return { success: true, limit: 10, remaining: 9, reset: 0 };
  }
}
