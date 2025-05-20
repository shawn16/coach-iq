import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutLibraryItems } from '@/lib/training/workoutLibrary';
import { withAuthenticatedSession } from '@/lib/api-utils';
import { Session } from 'next-auth';

export async function GET(req: NextRequest) {
  return withAuthenticatedSession(req, async (request: NextRequest, session: Session) => {
    try {
      const userId = session.user.id;
      const items = await getWorkoutLibraryItems(userId);
      return NextResponse.json(items);
    } catch (error) {
      console.error('API route /api/workout-library error within logic:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred during workout library fetch';
      return NextResponse.json({ error: 'Failed to fetch workout library items due to server error', details: message }, { status: 500 });
    }
  }, {
    actionDescription: 'fetch workout library items'
  });
}
