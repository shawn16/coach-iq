// This file contains functions for managing workout library items.

import prisma from "@/lib/prisma";
import { workoutTypeToIconMap } from "./utils";

/**
 * Creates a new workout library item for a specific user.
 *
 * @param params - Object containing all workout library item details.
 * @returns The newly created workout library item.
 */
export async function createWorkoutLibraryItem({ 
  name,
  type, // workout type string e.g. "Tempo Run", "Intervals"
  category,
  duration,
  description,
  userId,
}: {
  name: string;
  type: string;
  category: string;
  duration: string;
  description?: string;
  userId: string;
}) {
  try {
    // Determine the icon based on the workout type
    const determinedIcon = workoutTypeToIconMap[type] || "Activity"; // Default to "Activity" if type not in map

    const workoutLibraryItem = await prisma.workoutLibraryItem.create({
      data: {
        name,
        type,
        category,
        duration,
        description,
        icon: determinedIcon, // Use the determined icon
        userId,
      },
    });
    return workoutLibraryItem;
  } catch (error) {
    console.error('Error in createWorkoutLibraryItem:', error);
    if (error instanceof Error) {
      throw new Error(`Prisma error: ${error.message}`);
    }
    throw new Error('Failed to create workout library item in DB');
  }
}

/**
 * Retrieves all workout library items for a specific user.
 *
 * @param userId - The ID of the user whose workout library items to retrieve.
 * @returns Array of workout library items.
 */
export async function getWorkoutLibraryItems(userId: string) {
  try {
    const items = await prisma.workoutLibraryItem.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc', // Or any other preferred order, e.g., createdAt
      },
    });
    return items;
  } catch (error) {
    console.error('Error fetching workout library items from DB:', error);
    // Ensure a structured error is thrown or a specific error response is prepared
    if (error instanceof Error) {
      throw new Error(`Database error when fetching workout library items: ${error.message}`);
    }
    throw new Error('An unknown database error occurred while fetching workout library items');
  }
}
