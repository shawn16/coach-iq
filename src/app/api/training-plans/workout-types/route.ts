// This file contains API route handlers for workout types
// Used for fetching available workout types for training plans

import { NextRequest, NextResponse } from 'next/server';
import { getWorkoutTypes } from '@/lib/training-plans';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Updated import path

/**
 * GET handler for fetching all workout types available in the system
 * Used to populate dropdown menus and color coding in the training plan UI
 */
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