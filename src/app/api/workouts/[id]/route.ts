import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuthenticatedSession } from '@/lib/api-utils';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuthenticatedSession(req, async (request, session) => {
    const userId = session.user.id;
    const workoutId = params.id;

    // Verify the workout exists and belongs to the user
    const existingWorkout = await prisma.workoutLibraryItem.findFirst({
      where: {
        id: workoutId,
        userId: userId,
      },
    });

    if (!existingWorkout) {
      return NextResponse.json(
        { error: 'Workout not found or access denied' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, type, category, duration, description } = body;

    if (!name || !type || !category || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, category, and duration are required.' },
        { status: 400 }
      );
    }

    // Import the utility to determine the icon
    const { workoutTypeToIconMap } = await import('@/lib/training/utils');
    
    // Determine the icon based on the workout type
    const determinedIcon = workoutTypeToIconMap[type] || "Activity"; // Default to "Activity" if type not in map
    
    // Update the workout
    const updatedWorkout = await prisma.workoutLibraryItem.update({
      where: {
        id: workoutId,
      },
      data: {
        name,
        type,
        category,
        duration,
        description,
        // Always update the icon based on the type to ensure consistency
        icon: determinedIcon,
      },
    });

    return NextResponse.json(updatedWorkout);
  }, {
    actionDescription: 'update workout library item'
  });
}
