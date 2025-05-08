// This file contains API route handlers for training plans
// Handles GET and POST operations for the /api/training-plans endpoint

import { NextRequest, NextResponse } from 'next/server';
import { getTrainingPlans, createTrainingPlan } from '@/lib/training-plans';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Updated import path

/**
 * GET handler for fetching all training plans for the current user
 * Returns both active and completed plans
 */
export async function GET(req: NextRequest) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Use the userId from the session
    const userId = session.user.id;
    const plans = await getTrainingPlans(userId);
    
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching training plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training plans' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new training plan
 * Validates required fields and creates a new plan with weeks
 */
export async function POST(req: NextRequest) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the userId from the session
    const userId = session.user.id;
    
    // Parse request body
    const body = await req.json();
    const { 
      title, 
      description, 
      durationWeeks, 
      startDate, 
      type, 
      planType,
      athleteIds = [] 
    } = body;
    
    // Validate required fields
    if (!title || !durationWeeks || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the training plan
    const plan = await createTrainingPlan({
      title,
      description: description || '',
      durationWeeks: parseInt(durationWeeks, 10),
      startDate: new Date(startDate),
      type,
      planType,
      userId,
      athleteIds,
    });
    
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error creating training plan:', error);
    return NextResponse.json(
      { error: 'Failed to create training plan' },
      { status: 500 }
    );
  }
}