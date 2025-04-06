export interface WorkoutType {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

export interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  phase: string;
  workouts: Record<string, string>;
}
