import { NextResponse } from 'next/server';
import { withRateLimit } from '../utils/rateLimit';

export const GET = withRateLimit(async (req: Request) => {
  return NextResponse.json({ 
    message: 'This is a rate-limited endpoint',
    timestamp: new Date().toISOString()
  });
});
