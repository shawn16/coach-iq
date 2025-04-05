// Importing components and libraries - Workout and WorkoutType types from @/types/progression
import { Workout, WorkoutType } from "@/types/progression";

// Define the getWorkoutTypeIcon function
export function getWorkoutTypeIcon(type: WorkoutType): string {
  switch (type) {
    case "tempo":
      return "🏃";
    case "interval":
      return "⚡";
    case "long_run":
      return "🏃‍♂️";
    case "fartlek":
      return "🎯";
    case "recovery_run":
      return "🔄";
    case "custom":
      return "📝";
    default:
      return "🏃";
  }
}

// Define the getWorkoutTypeColor function
export function getWorkoutTypeColor(type: WorkoutType): string {
  switch (type) {
    case "tempo":
      return "bg-blue-100 text-blue-800";
    case "interval":
      return "bg-red-100 text-red-800";
    case "long_run":
      return "bg-green-100 text-green-800";
    case "fartlek":
      return "bg-purple-100 text-purple-800";
    case "recovery_run":
      return "bg-yellow-100 text-yellow-800";
    case "custom":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Define the formatWorkoutValue function
export function formatWorkoutValue(workout: Workout): string {
  const { value, unit, format } = workout;

  switch (format) {
    case "time":
      return `${value} ${unit}`;
    case "distance":
      return `${value} ${unit}`;
    case "reps":
      return `${value} reps`;
    default:
      return value;
  }
}

// Define the validateWorkout function
export function validateWorkout(workout: Workout): string[] {
  const errors: string[] = [];

  if (!workout.name) {
    errors.push("Name is required");
  }

  if (!workout.type) {
    errors.push("Type is required");
  }

  if (!workout.format) {
    errors.push("Format is required");
  }

  if (!workout.value) {
    errors.push("Value is required");
  }

  if (!workout.unit) {
    errors.push("Unit is required");
  }

  return errors;
}

// Define the calculateWorkoutIntensity function
export function calculateWorkoutIntensity(workout: Workout): number {
  // This is a simple example - you might want to implement a more sophisticated calculation
  switch (workout.type) {
    case "interval":
      return 90;
    case "tempo":
      return 80;
    case "long_run":
      return 70;
    case "fartlek":
      return 85;
    case "recovery_run":
      return 60;
    default:
      return 50;
  }
}

// Define the getWorkoutDescription function
export function getWorkoutDescription(workout: Workout): string {
  const intensity = calculateWorkoutIntensity(workout);
  const formattedValue = formatWorkoutValue(workout);

  // Return the formatted workout description
  return `${workout.name}: ${formattedValue} at ${intensity}% intensity`;
}
