// This file contains type definitions for training plans, workouts, and related concepts
// Used throughout the application to ensure type consistency

/**
 * Types of training plans (focus area)
 */
export type PlanType = 'endurance' | 'speed' | 'strength' | 'marathon' | 'custom';

/**
 * Training plan format options (sport-specific types)
 */
export type PlanFormat = 'xc' | 'track' | 'road' | 'trail' | 'general';

/**
 * Status of a training plan 
 */
export type PlanStatus = 'active' | 'completed' | 'draft' | 'archived';

/**
 * Main training plan interface
 * Represents the core structure of a training plan
 */
export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  startDate: string | Date;
  endDate?: string | Date;
  durationWeeks: number;
  type: PlanType;
  planFormat: PlanFormat; // xc, track, etc.
  status: PlanStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  createdById?: string;
  phases?: Phase[];
  athleteCount?: number;
}

/**
 * Phase within a training plan
 * A training plan is divided into phases (e.g. base, build, peak)
 */
export interface Phase {
  id: string;
  name: string;
  description?: string;
  order: number;
  startDate: string | Date;
  endDate: string | Date;
  durationWeeks: number;
  trainingPlanId: string;
  weeks?: Week[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Week within a phase
 * Contains information about a specific training week
 */
export interface Week {
  id: string;
  weekNumber: number;
  startDate: string | Date;
  endDate: string | Date;
  phaseId: string;
  workouts?: Workout[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Workout intensity levels
 */
export type WorkoutIntensity = 'recovery' | 'easy' | 'moderate' | 'hard' | 'race';

/**
 * Workout within a training week
 * Represents a single training session
 */
export interface Workout {
  id: string;
  title: string;
  description: string;
  workoutDate: string | Date;
  duration: number; // in minutes
  distance?: number; // in meters/kilometers
  intensity: WorkoutIntensity;
  type: WorkoutType;
  weekId: string;
  phases?: WorkoutPhase[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Types of workouts 
 */
export type WorkoutType = 
  | 'easy_run' 
  | 'long_run' 
  | 'tempo_run' 
  | 'interval' 
  | 'hill_repeat' 
  | 'recovery' 
  | 'fartlek' 
  | 'race' 
  | 'cross_training'
  | 'rest';

/**
 * Phase within a workout (e.g. warmup, main set, cooldown)
 */
export interface WorkoutPhase {
  id: string;
  name: string; // e.g., "Warm-up", "Main set", "Cool-down"
  description?: string;
  duration: number; // in minutes
  distance?: number; // in meters/kilometers
  order: number;
  workoutId: string;
  sets?: WorkoutSet[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Set within a workout phase
 * Represents a repeated section of a workout
 */
export interface WorkoutSet {
  id: string;
  repetitions: number;
  distance?: number; // in meters
  duration?: number; // in minutes
  intensity?: string;
  restBetween?: number; // in seconds
  workoutPhaseId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Training plan assignment to an athlete
 * Links athletes to training plans
 */
export interface TrainingPlanAssignment {
  id: string;
  trainingPlanId: string;
  athleteId: number;
  assignedDate: string | Date;
  status: 'active' | 'completed' | 'cancelled';
  progressPercent: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Completed workout record
 * Tracks an athlete's completed workout
 */
export interface CompletedWorkout {
  id: string;
  workoutId: string;
  athleteId: number;
  completedDate: string | Date;
  actualDuration: number; // in minutes
  actualDistance?: number; // in meters/kilometers
  notes?: string;
  rating?: number; // 1-10 self-reported difficulty/feeling
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Training metric record
 * Tracks athlete performance metrics
 */
export interface TrainingMetric {
  id: string;
  athleteId: number;
  metricType: string; // e.g., "heartRate", "pace", "power", etc.
  date: string | Date;
  value: number;
  unit: string; // e.g., "bpm", "min/km", "watts", etc.
  notes?: string;
  workoutId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
