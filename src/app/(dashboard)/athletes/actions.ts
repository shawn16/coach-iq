// This file defines server-side actions for managing athlete data in a Next.js application.
// It includes functions for adding, deleting, and updating athletes, ensuring that these operations are performed securely on the server.
// The file also handles data validation, error handling, and revalidating the cache to keep the UI in sync with the database.
// These actions are essential for maintaining data integrity and providing a seamless user experience.

// "use server" directive is required for server-side actions in Next.js.
// This ensures that the functions in this file are executed on the server, not the client.
"use server";

import { revalidatePath } from "next/cache"; // Import function to revalidate cached pages in Next.js.
import {
  addAthlete, // Function to add a new athlete to the database.
  deleteAthlete, // Function to delete an athlete from the database.
  prepareAthleteForDb, // Utility function to format athlete data for the database.
  updateAthlete, // Function to update an athlete's information in the database.
} from "@/lib/athletes";

// Server action to add a new athlete
// This function handles the process of adding a new athlete to the database.
export async function addAthleteAction(formData: FormData) {
  try {
    // Extract athlete data from the form input
    const newAthlete = {
      firstName: formData.get("firstName") as string, // Athlete's first name
      lastName: formData.get("lastName") as string, // Athlete's last name
      birthday: formData.get("birthday") as string, // Athlete's date of birth
      grade: parseInt(formData.get("grade") as string, 10), // Athlete's grade level
      time1600m: formData.get("time1600m") as string, // Athlete's 1600m race time
    };

    // Validate the data to ensure all required fields are filled
    if (
      !newAthlete.firstName ||
      !newAthlete.lastName ||
      !newAthlete.birthday ||
      isNaN(newAthlete.grade)
    ) {
      // Common Beginner Mistake: Forgetting to validate user input can lead to unexpected errors.
      return { success: false, error: "All fields are required" };
    }

    // Convert the athlete data to a format suitable for the database
    const athleteForDb = prepareAthleteForDb(newAthlete);

    // Add the athlete to the database
    const result = await addAthlete(athleteForDb);

    if (!result) {
      return { success: false, error: "Failed to add athlete" };
    }

    // Revalidate the athletes page to reflect the new data
    revalidatePath("/athletes");
    return { success: true, athlete: result };
  } catch (error) {
    console.error("Error adding athlete:", error); // Log the error for debugging
    return { success: false, error: "An unexpected error occurred" };
  }
  // Next Step Suggestion: Add more detailed error messages for specific failure cases.
}

// Server action to delete an athlete
// This function handles the process of deleting an athlete from the database.
export async function deleteAthleteAction(id: number) {
  try {
    // Attempt to delete the athlete by their ID
    const success = await deleteAthlete(id);

    if (!success) {
      return { success: false, error: "Failed to delete athlete" };
    }

    // Revalidate the athletes page to reflect the deletion
    revalidatePath("/athletes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting athlete:", error); // Log the error for debugging
    return { success: false, error: "An unexpected error occurred" };
  }
  // Next Step Suggestion: Implement a confirmation dialog before deletion.
}

// Server action to update an athlete
// This function handles the process of updating an athlete's information in the database.
export async function updateAthleteAction(id: number, formData: FormData) {
  try {
    // Extract updated athlete data from the form input
    const athleteData = {
      firstName: formData.get("firstName") as string, // Athlete's updated first name
      lastName: formData.get("lastName") as string, // Athlete's updated last name
      birthday: formData.get("birthday") as string, // Athlete's updated date of birth
      grade: parseInt(formData.get("grade") as string, 10), // Athlete's updated grade level
      time1600m: formData.get("time1600m") as string, // Athlete's updated 1600m race time
    };

    // Validate the updated data
    if (
      !athleteData.firstName ||
      !athleteData.lastName ||
      !athleteData.birthday ||
      isNaN(athleteData.grade)
    ) {
      // Common Beginner Mistake: Not validating updated data can lead to database inconsistencies.
      return { success: false, error: "All fields are required" };
    }

    // Convert the updated athlete data to a format suitable for the database
    const athleteForDb = prepareAthleteForDb(athleteData);

    // Update the athlete in the database
    const result = await updateAthlete(id, athleteForDb);

    if (!result) {
      return { success: false, error: "Failed to update athlete" };
    }

    // Revalidate the athletes page to reflect the updated data
    revalidatePath("/athletes");
    return { success: true, athlete: result };
  } catch (error) {
    console.error("Error updating athlete:", error); // Log the error for debugging
    return { success: false, error: "An unexpected error occurred" };
  }
  // Next Step Suggestion: Add optimistic UI updates for a smoother user experience.
}
