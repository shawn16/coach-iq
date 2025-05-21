export type PlanFormat = "xc" | "track" | "road" | "trail" | "general";

export interface WorkoutType {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface WorkoutLibrary {
  id: string;
  name: string;
  type: string;
  description: string | null;
  duration: string;
  distance?: number;
  effort?: number;
  terrain?: string;
  notes?: string;
  category: string;
  icon: string | null;
}

export interface PhaseData {
  name: string;
  color?: string;
}

/**
 * Represents workouts for a single week, keyed by workout type ID
 */
interface WeekWorkouts {
  [key: string]: string | undefined;
}

export interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: WeekWorkouts;
}

export interface PlanDetails {
  name: string;
  format: PlanFormat;
  description: string;
  startDate: Date;
  endDate: Date;
}
