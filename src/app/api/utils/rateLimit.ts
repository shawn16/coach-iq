import { NextResponse } from 'next/server';
import { rateLimitRequest } from '../middleware/rateLimit';

export async function withRateLimit(handler: (req: Request) => Promise<Response>) {
  return async function (req: Request) {
    const rateLimitResult = await rateLimitRequest(req);
    
    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: rateLimitResult.retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter),
          },
        }
      );
    }

    return handler(req);
  };
}
