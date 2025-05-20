import { NextResponse } from 'next/server';
import { rateLimitRequest } from './app/api/middleware/rateLimit';

export const config = {
  matcher: '/api/:path*',
};

export async function middleware(request: Request) {
  // Skip rate limiting for certain paths if needed
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  const rateLimitResult = await rateLimitRequest(request);
  
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

  return NextResponse.next();
}
