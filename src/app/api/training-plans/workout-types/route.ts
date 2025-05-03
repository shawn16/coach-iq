import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutTypes } from '@/lib/training-plans';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Updated import path

export async function GET(req: NextRequest) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const workoutTypes = await getWorkoutTypes();
    return NextResponse.json(workoutTypes);
  } catch (error) {
    console.error('Error fetching workout types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workout types' },
      { status: 500 }
    );
  }
}