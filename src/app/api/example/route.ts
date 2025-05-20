import { NextResponse } from 'next/server';
import { withRateLimit } from '../utils/rateLimit';

// This is an example of a rate-limited API endpoint
export const GET = withRateLimit(async (req: Request) => {
  return NextResponse.json({ 
    message: 'This is a rate-limited endpoint',
    timestamp: new Date().toISOString(),
    rateLimitInfo: {
      note: 'This endpoint is limited to 10 requests per 10 seconds',
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '9', // This will be updated by the rate limiter
        'X-RateLimit-Reset': Math.floor(Date.now() / 1000) + 10 // 10 seconds from now
      }
    }
  });
});

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering
