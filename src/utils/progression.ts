// Importing components and libraries - Step, Workout, ProgressionTemplate types from @/types/progression
import { Step, Workout, ProgressionTemplate } from "@/types/progression";

// Define the calculateProgressionPattern function
export function calculateProgressionPattern(steps: Step[]): number[] {
  return steps.map((step) => parseFloat(step.value));
}

// Define the validateProgression function
export function validateProgression(template: ProgressionTemplate): string[] {
  const errors: string[] = [];

  // Check if the name is required
  if (!template.name) {
    errors.push("Name is required");
  }

  // Check if the type is required
  if (!template.type) {
    errors.push("Type is required");
  }

  // Check if the metric is required
  if (!template.metric) {
    errors.push("Metric is required");
  }

  // Check if the duration is required and greater than 0
  if (template.duration <= 0) {
    errors.push("Duration must be greater than 0");
  }

  // Check if the description is required
  if (!template.description) {
    errors.push("Description is required");
  }

  return errors;
}

// Define the generateWorkoutSchedule function
export function generateWorkoutSchedule(
  template: ProgressionTemplate,
  workouts: Workout[]
): Workout[] {
  const schedule: Workout[] = [];
  const weeks = template.duration;

  for (let week = 1; week <= weeks; week++) {
    const weekWorkouts = workouts.map((workout) => ({
      ...workout,
      week,
    }));
    schedule.push(...weekWorkouts);
  }

  return schedule;
}

// Define the calculateProgress function
export function calculateProgress(
  template: ProgressionTemplate,
  completedWorkouts: number
): number {
  const totalWorkouts = template.duration * 7; // Assuming 7 workouts per week
  return Math.round((completedWorkouts / totalWorkouts) * 100);
}

// Define the getProgressionStatus function
export function getProgressionStatus(progress: number): string {
  if (progress === 0) {
    return "Not Started";
  } else if (progress < 100) {
    return "In Progress";
  } else {
    return "Completed";
  }
}
