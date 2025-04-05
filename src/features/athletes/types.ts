export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  grade: number;
  time1600m: string; // Format: "MM:SS.ss"
}

export interface ProjectedTimes {
  time5k: string;
  time3200m: string;
  time800m: string;
}

export interface SortConfig {
  column: "lastName" | "grade" | "time1600m";
  direction: "asc" | "desc";
}

export interface AthleteFilters {
  searchQuery: string;
  gradeFilter: string;
} 