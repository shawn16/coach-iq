import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutLibraryItems } from '@/lib/training/workoutLibrary';
import { withAuthenticatedSession } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  return withAuthenticatedSession(req, async (_request, session) => {
    const userId = session.user.id;

    const items = await getWorkoutLibraryItems(userId);
    return NextResponse.json(items);
  }, {
    actionDescription: 'fetch workout library items'
  });
}
