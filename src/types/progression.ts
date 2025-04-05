// Define the ProgressionTemplate interface - Represents a progression template
export interface ProgressionTemplate {
  id: string;
  name: string;
  type: string;
  metric: string;
  duration: number;
  description: string;
  pattern: number[];
  workoutType?: string;
  progress?: number;
  status?: string;
}

// Define the Step interface - Represents a step in a progression
export interface Step {
  id: number;
  week: number;
  value: string;
  unit: string;
  description: string;
}

// Define the Workout interface - Represents a workout
export interface Workout {
  id: number;
  reps: string;
  distance: string;
  pace: string;
  recovery: string;
  description: string;
}

// Define the Week interface - Represents a week in a progression
export interface Week {
  id: number;
  workouts: Workout[];
}

// Define the ProgressionType type - Represents the type of progression
export type ProgressionType = "linear" | "wave" | "step" | "pyramid" | "custom";

// Define the WorkoutMetric type - Represents the metric of a workout
export type WorkoutMetric = "intensity" | "volume" | "distance";

// Define the WorkoutType type - Represents the type of workout
export type WorkoutType =
  | "tempo"
  | "interval"
  | "long_run"
  | "fartlek"
  | "recovery_run"
  | "custom";

// Define the WorkoutFormat type - Represents the format of a workout
export type WorkoutFormat = "distance" | "time" | "reps";
