/**
 * Athlete Type Definitions
 *
 * Defines the structure and types for athlete-related data:
 * - Athlete: Core athlete information
 * - SortConfig: Configuration for sorting athlete lists
 */

export interface Athlete {
  id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  grade: number | null;
  active: boolean;
  gender: string;
  coach_id: number;
  created_at: string;
  updated_at: string;
  time1600m: string | null;
  projected_times: ProjectedTimes | null;
}

export interface AthleteTeam {
  id: number;
  athlete_id: number;
  team_id: number;
  created_at: Date;
  team?: Team;
}

export interface Team {
  id: number;
  name: string;
  coach_id: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface ProjectedTimes {
  time5k: string;
  time3200m: string;
  time800m: string;
}

export interface SortConfig {
  column:
    | "last_name"
    | "first_name"
    | "grade"
    | "active"
    | "time1600m"
    | "projected_times";
  direction: "asc" | "desc";
}

export interface AthleteFilters {
  searchQuery: string;
  gradeFilter: string;
  activeFilter: string;
}
