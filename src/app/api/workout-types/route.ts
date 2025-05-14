import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutTypes } from '@/lib/training/workoutType';
// Note: This route does not require authentication currently.
// If it did, we would use withAuthenticatedSession here as well.

export async function GET(req: NextRequest) { // Added req parameter to match expected signature if we were to use the wrapper
  try {
    const workoutTypes = await getWorkoutTypes();
    return NextResponse.json(workoutTypes);
  } catch (error) {
    console.error('Error in API route /api/workout-types:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
        { error: 'Failed to fetch workout types', details: errorMessage }, 
        { status: 500 }
    );
  }
}
