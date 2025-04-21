// src/types/athlete.ts
// Defines TypeScript interfaces for my data
// Separates database models from UI display models

// Base Athlete structure (mirrors Supabase table structure)
// TODO: Consider replacing with auto-generated types from Supabase:
// npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts
export interface Athlete {
  id: number;
  first_name: string;
  last_name: string;
  birthday: string; // Date in ISO format
  grade: number;
  time_1600m: number; // Time in milliseconds
  created_at?: string;
  updated_at?: string;
}

// For the UI display in time format
export interface AthleteDisplay extends Omit<Athlete, "time_1600m"> {
  time1600m: string; // Format as "4:45.30"
}

// Data structure for the Add Athlete form/dialog
export interface AthleteInput {
  first_name: string;
  last_name: string;
  birthday: string; // Date in ISO format
  grade: number;
  time_1600m: number; // Time in milliseconds
}

// Data structure for calculated projected times
export interface ProjectedTimes {
  time5k: string;
  time3200m: string;
  time800m: string;
}
