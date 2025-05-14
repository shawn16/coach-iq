// This file contains functions for managing workouts within training plans.

import prisma from "@/lib/prisma";

/**
 * Updates the workouts within a specific week of a training plan
 * Handles creating, updating, and deleting workouts
 *
 * @param weekId - The ID of the week to update
 * @param workouts - Object mapping workout type IDs to workout details
 * @returns Success status
 */
export async function updateWeekWorkouts(
  weekId: string,
  workouts: Record<string, string | null>
) {
  try {
    // Process each workout type and update/create/delete as needed
    for (const [workoutTypeId, details] of Object.entries(workouts)) {
      if (details === null) {
        // Delete this workout
        await prisma.planWorkout.deleteMany({
          where: {
            weekId,
            workoutTypeId,
          },
        });
      } else {
        // Upsert (create or update) the workout
        await prisma.planWorkout.upsert({
          where: {
            weekId_workoutTypeId: {
              weekId,
              workoutTypeId,
            },
          },
          update: {
            details,
          },
          create: {
            weekId,
            workoutTypeId,
            details,
          },
        });
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating week workouts:', error);
    throw new Error('Failed to update workouts');
  }
}

/**
 * Creates a new workout in a specific week
 */
export async function createWorkout({
  weekId,
  workoutTypeId,
  details,
}: {
  weekId: string;
  workoutTypeId: string;
  details: string;
}) {
  try {
    return await prisma.planWorkout.create({
      data: {
        weekId,
        workoutTypeId,
        details,
      },
      include: {
        workoutType: true,
      },
    });
  } catch (error) {
    console.error('Error creating workout:', error);
    throw new Error('Failed to create workout');
  }
}

/**
 * Updates an existing workout
 */
export async function updateWorkout({
  id,
  details,
}: {
  id: string;
  details: string;
}) {
  try {
    return await prisma.planWorkout.update({
      where: { id },
      data: { details },
      include: {
        workoutType: true,
      },
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    throw new Error('Failed to update workout');
  }
}

/**
 * Deletes a workout
 */
export async function deleteWorkout(id: string) {
  try {
    await prisma.planWorkout.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw new Error('Failed to delete workout');
  }
}
