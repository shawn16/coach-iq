import { NextRequest, NextResponse } from 'next/server';
import { updateWeekWorkouts } from '@/lib/training-plans';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Updated import path

// Update workouts for a specific week
export async function PUT(
  req: NextRequest,
  { params }: { params: { weekId: string } }
) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse request body
    const body = await req.json();
    const { workouts } = body;
    
    if (!workouts) {
      return NextResponse.json(
        { error: 'No workout data provided' },
        { status: 400 }
      );
    }
    
    const result = await updateWeekWorkouts(params.weekId, workouts);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating week workouts:', error);
    return NextResponse.json(
      { error: 'Failed to update workouts' },
      { status: 500 }
    );
  }
}