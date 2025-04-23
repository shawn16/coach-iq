"use server";

import { revalidatePath } from "next/cache";
import {
  addAthlete,
  deleteAthlete,
  prepareAthleteForDb,
  updateAthlete,
} from "@/lib/athletes";

// Server action to add a new athlete
export async function addAthleteAction(formData: FormData) {
  try {
    const newAthlete = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      birthday: formData.get("birthday") as string,
      grade: parseInt(formData.get("grade") as string, 10),
      time1600m: formData.get("time1600m") as string,
    };

    // Validate the data
    if (
      !newAthlete.firstName ||
      !newAthlete.lastName ||
      !newAthlete.birthday ||
      isNaN(newAthlete.grade)
    ) {
      return { success: false, error: "All fields are required" };
    }

    // Convert to database format
    const athleteForDb = prepareAthleteForDb(newAthlete);

    // Add to database
    const result = await addAthlete(athleteForDb);

    if (!result) {
      return { success: false, error: "Failed to add athlete" };
    }

    revalidatePath("/athletes");
    return { success: true, athlete: result };
  } catch (error) {
    console.error("Error adding athlete:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Server action to delete an athlete
export async function deleteAthleteAction(id: number) {
  try {
    const success = await deleteAthlete(id);

    if (!success) {
      return { success: false, error: "Failed to delete athlete" };
    }

    revalidatePath("/athletes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting athlete:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Server action to update an athlete
export async function updateAthleteAction(id: number, formData: FormData) {
  try {
    const athleteData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      birthday: formData.get("birthday") as string,
      grade: parseInt(formData.get("grade") as string, 10),
      time1600m: formData.get("time1600m") as string,
    };

    // Validate the data
    if (
      !athleteData.firstName ||
      !athleteData.lastName ||
      !athleteData.birthday ||
      isNaN(athleteData.grade)
    ) {
      return { success: false, error: "All fields are required" };
    }

    // Convert to database format
    const athleteForDb = prepareAthleteForDb(athleteData);

    // Update in database
    const result = await updateAthlete(id, athleteForDb);

    if (!result) {
      return { success: false, error: "Failed to update athlete" };
    }

    revalidatePath("/athletes");
    return { success: true, athlete: result };
  } catch (error) {
    console.error("Error updating athlete:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
