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
  description: string;
  duration: string;
  distance?: number;
  effort?: number;
  terrain?: string;
  notes?: string;
  category: string;
  icon: string;
}

export interface PhaseData {
  name: string;
  color?: string;
}

export interface WeekData {
  id: number;
  weekNumber: string;
  dateRange: string;
  phase?: PhaseData;
  workouts: {
    [key: string]: WorkoutLibrary[];
  };
}

export interface PlanDetails {
  name: string;
  format: PlanFormat;
  description: string;
  startDate: Date;
  endDate: Date;
}
