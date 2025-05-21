import { NextRequest, NextResponse } from 'next/server';
import { createWorkoutLibraryItem } from '@/lib/training/workoutLibrary';
import { withAuthenticatedSession } from '@/lib/api-utils';
import { WorkoutLibrary } from '@/types/training-plans';

export async function POST(req: NextRequest) {
  return withAuthenticatedSession<WorkoutLibrary>(req, async (request, session) => {
    const userId = session.user.id;

    const body = await request.json();
    const { name, type, category, duration, description } = body;

    if (!name || !type || !category || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, category, and duration are required.' },
        { status: 400 }
      );
    }

    const workoutLibraryItem = await createWorkoutLibraryItem({
      name,
      type,
      category,
      duration,
      description,
      userId,
    });

    return NextResponse.json(workoutLibraryItem, { status: 201 });
  }, {
    actionDescription: 'create workout library item'
  });
}
