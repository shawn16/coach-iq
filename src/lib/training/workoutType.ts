// This file contains functions for managing workout types.

import prisma from "@/lib/prisma";

/**
 * Retrieves all workout types available in the system
 * Used to populate workout type selections in the UI
 *
 * @returns Array of workout types
 */
export async function getWorkoutTypes() {
  try {
    const types = await prisma.workoutType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return types;
  } catch (error) {
    console.error('Error fetching workout types:', error);
    throw new Error('Failed to fetch workout types');
  }
}

/**
 * Creates a new workout type
 * @param name - The name of the workout type
 * @param color - The color scheme for the workout type (CSS classes)
 */
export async function createWorkoutType({ 
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  try {
    return await prisma.workoutType.create({
      data: {
        name,
        color,
      },
    });
  } catch (error) {
    console.error('Error creating workout type:', error);
    throw new Error('Failed to create workout type');
  }
}
