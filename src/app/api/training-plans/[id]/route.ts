// This file contains API route handlers for operations on specific training plans
// Handles GET, PUT, and DELETE operations for individual training plans

import { NextRequest, NextResponse } from 'next/server';
import { getTrainingPlanById, updateTrainingPlan, deleteTrainingPlan } from '@/lib/training-plans';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Updated import path

/**
 * GET handler for fetching a specific training plan by ID
 * Returns detailed plan information including all weeks and workouts
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    const plan = await getTrainingPlanById(id);
    
    if (!plan) {
      return NextResponse.json({ error: 'Training plan not found' }, { status: 404 });
    }
    
    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error fetching training plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training plan' },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a specific training plan
 * Can modify plan details, dates, duration, and athlete assignments
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse request body
    const body = await req.json();
    const { 
      title, 
      description, 
      progress, 
      isCompleted,
      athleteIds,
      startDate,
      durationWeeks,
      planType
    } = body;
    
    // Update the plan
    const updatedPlan = await updateTrainingPlan(params.id, {
      title,
      description,
      progress,
      isCompleted,
      athleteIds,
      startDate: startDate ? new Date(startDate) : undefined,
      durationWeeks,
      planType
    });
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('Error updating training plan:', error);
    return NextResponse.json(
      { error: 'Failed to update training plan' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for removing a specific training plan
 * Deletes the plan and all associated data (weeks, workouts)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await deleteTrainingPlan(params.id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting training plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete training plan' },
      { status: 500 }
    );
  }
}