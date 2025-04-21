"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { WorkoutInput, PlanType, PlanStatus } from "@/types/training";
import { AthleteDisplay } from "@/types/athlete";

// Server action to create a new training plan
export async function createTrainingPlanAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Extract plan data from formData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as PlanType;
    const startDate = formData.get("startDate") as string;
    const duration = formData.get("duration") as string;
    const workouts = JSON.parse((formData.get("workouts") as string) || "[]");
    const athletes = JSON.parse((formData.get("athletes") as string) || "[]");

    // Validate required fields
    if (!title || !type || !startDate || !duration) {
      return { success: false, error: "Missing required fields" };
    }

    // 1. Insert the plan into the database
    const { data: planData, error: planError } = await supabase
      .from("training_plans")
      .insert({
        title,
        description,
        type,
        start_date: startDate,
        duration,
        status: "draft" as PlanStatus,
      })
      .select()
      .single();

    if (planError || !planData) {
      console.error("Error creating training plan:", planError);
      return { success: false, error: "Failed to create training plan" };
    }

    const planId = planData.id;

    // 2. Add workouts if any
    if (workouts && workouts.length > 0) {
      const workoutsForDb = workouts.map((workout: WorkoutInput) => ({
        plan_id: planId,
        day: workout.day,
        title: workout.title,
        description: workout.description,
        type: workout.type,
        intensity: workout.intensity,
        duration: workout.duration,
        distance: workout.distance,
        notes: workout.notes,
        sets: workout.sets || [],
      }));

      const { error: workoutsError } = await supabase
        .from("workouts")
        .insert(workoutsForDb);

      if (workoutsError) {
        console.error("Error adding workouts:", workoutsError);
        // We don't fail the whole operation if workouts couldn't be added
      }
    }

    // 3. Assign athletes if any
    if (athletes && athletes.length > 0) {
      const assignmentsForDb = athletes.map((athlete: AthleteDisplay) => ({
        plan_id: planId,
        athlete_id: athlete.id,
        assigned_at: new Date().toISOString(),
      }));

      const { error: assignmentsError } = await supabase
        .from("plan_assignments")
        .insert(assignmentsForDb);

      if (assignmentsError) {
        console.error("Error assigning athletes:", assignmentsError);
        // We don't fail the whole operation if assignments couldn't be added
      }
    }

    revalidatePath("/planning/training-plan");
    return { success: true, planId };
  } catch (error) {
    console.error("Error in createTrainingPlanAction:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Server action to update an existing training plan
export async function updateTrainingPlanAction(
  planId: string,
  formData: FormData
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Extract plan data from formData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as PlanType;
    const startDate = formData.get("startDate") as string;
    const duration = formData.get("duration") as string;
    const workouts = JSON.parse((formData.get("workouts") as string) || "[]");
    const athletes = JSON.parse((formData.get("athletes") as string) || "[]");

    // Validate required fields
    if (!title || !type || !startDate || !duration) {
      return { success: false, error: "Missing required fields" };
    }

    // 1. Update the plan in the database
    const { data: planData, error: planError } = await supabase
      .from("training_plans")
      .update({
        title,
        description,
        type,
        start_date: startDate,
        duration,
      })
      .eq("id", planId)
      .select()
      .single();

    if (planError || !planData) {
      console.error("Error updating training plan:", planError);
      return { success: false, error: "Failed to update training plan" };
    }

    // 2. Delete existing workouts and add new ones
    // First, delete existing workouts
    const { error: deleteWorkoutsError } = await supabase
      .from("workouts")
      .delete()
      .eq("plan_id", planId);

    if (deleteWorkoutsError) {
      console.error("Error deleting existing workouts:", deleteWorkoutsError);
    }

    // Then add new workouts
    if (workouts && workouts.length > 0) {
      const workoutsForDb = workouts.map((workout: WorkoutInput) => ({
        plan_id: planId,
        day: workout.day,
        title: workout.title,
        description: workout.description,
        type: workout.type,
        intensity: workout.intensity,
        duration: workout.duration,
        distance: workout.distance,
        notes: workout.notes,
        sets: workout.sets || [],
      }));

      const { error: workoutsError } = await supabase
        .from("workouts")
        .insert(workoutsForDb);

      if (workoutsError) {
        console.error("Error adding workouts:", workoutsError);
      }
    }

    // 3. Update athlete assignments
    // First, delete existing assignments
    const { error: deleteAssignmentsError } = await supabase
      .from("plan_assignments")
      .delete()
      .eq("plan_id", planId);

    if (deleteAssignmentsError) {
      console.error(
        "Error deleting existing assignments:",
        deleteAssignmentsError
      );
    }

    // Then add new assignments
    if (athletes && athletes.length > 0) {
      const assignmentsForDb = athletes.map((athlete: AthleteDisplay) => ({
        plan_id: planId,
        athlete_id: athlete.id,
        assigned_at: new Date().toISOString(),
      }));

      const { error: assignmentsError } = await supabase
        .from("plan_assignments")
        .insert(assignmentsForDb);

      if (assignmentsError) {
        console.error("Error assigning athletes:", assignmentsError);
      }
    }

    revalidatePath("/planning/training-plan");
    return { success: true, planId };
  } catch (error) {
    console.error("Error in updateTrainingPlanAction:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Server action to get a training plan by ID
export async function getTrainingPlanAction(planId: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Get the plan
    const { data: plan, error: planError } = await supabase
      .from("training_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (planError || !plan) {
      console.error("Error fetching training plan:", planError);
      return { success: false, error: "Failed to fetch training plan" };
    }

    // 2. Get the workouts for this plan
    const { data: workouts, error: workoutsError } = await supabase
      .from("workouts")
      .select("*")
      .eq("plan_id", planId)
      .order("day", { ascending: true });

    if (workoutsError) {
      console.error("Error fetching workouts:", workoutsError);
      return { success: false, error: "Failed to fetch workouts" };
    }

    // 3. Get the athletes assigned to this plan
    const { data: assignments, error: assignmentsError } = await supabase
      .from("plan_assignments")
      .select(
        `
        athlete_id,
        athletes!inner(*)
      `
      )
      .eq("plan_id", planId);

    if (assignmentsError) {
      console.error("Error fetching assignments:", assignmentsError);
      return { success: false, error: "Failed to fetch assignments" };
    }

    // Format the data for the frontend
    const planData = {
      id: plan.id,
      title: plan.title,
      description: plan.description,
      type: plan.type,
      startDate: plan.start_date,
      duration: plan.duration,
      status: plan.status,
    };

    // Process workouts to match the frontend format
    const processedWorkouts = workouts.map((workout) => ({
      day: workout.day,
      title: workout.title,
      description: workout.description,
      type: workout.type,
      intensity: workout.intensity,
      duration: workout.duration,
      distance: workout.distance,
      notes: workout.notes,
      sets: workout.sets || [],
    }));

    // Extract athletes from assignments
    const assignedAthletes = assignments.map(
      (assignment) => assignment.athletes
    );

    return {
      success: true,
      plan: planData,
      workouts: processedWorkouts,
      athletes: assignedAthletes,
    };
  } catch (error) {
    console.error("Error in getTrainingPlanAction:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
