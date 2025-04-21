// Training Plan type definitions

// Basic training plan information
export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "12 weeks"
  type: PlanType;
  startDate: string;
  endDate?: string;
  progress?: number; // 0-100 percentage
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

// Training plan types
export type PlanType =
  | "endurance"
  | "speed"
  | "strength"
  | "marathon"
  | "custom";

// Training plan status
export type PlanStatus = "active" | "completed" | "draft";

// Workout intensity levels
export type IntensityLevel = "recovery" | "easy" | "moderate" | "hard" | "race";

// Daily workout information
export interface Workout {
  id: string;
  planId: string;
  day: number; // Day in the plan (1-based)
  title: string;
  description: string;
  type: WorkoutType;
  intensity: IntensityLevel;
  duration?: number; // in minutes
  distance?: number; // in meters
  sets?: WorkoutSet[];
  notes?: string;
}

// Workout type
export type WorkoutType =
  | "long_run"
  | "easy_run"
  | "tempo_run"
  | "interval"
  | "hills"
  | "fartlek"
  | "recovery"
  | "race"
  | "cross_training"
  | "rest";

// Workout set (for interval workouts)
export interface WorkoutSet {
  id: string;
  workoutId: string;
  reps: number;
  distance?: number; // in meters
  duration?: number; // in seconds
  rest?: number; // in seconds
  pace?: string; // e.g., "4:30/km"
  notes?: string;
}

// Assignment of athletes to plans
export interface PlanAssignment {
  id: string;
  planId: string;
  athleteId: number;
  assignedAt: string;
  completedWorkouts?: number; // Count of completed workouts
}

// Input types for creating/updating
export interface TrainingPlanInput {
  title: string;
  description: string;
  type: PlanType;
  startDate: string;
  duration: string;
}

export interface WorkoutInput {
  day: number;
  title: string;
  description: string;
  type: WorkoutType;
  intensity: IntensityLevel;
  duration?: number;
  distance?: number;
  notes?: string;
  sets?: WorkoutSetInput[];
}

export interface WorkoutSetInput {
  reps: number;
  distance?: number;
  duration?: number;
  rest?: number;
  pace?: string;
  notes?: string;
}
