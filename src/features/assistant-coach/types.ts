/**
 * Type Definitions for Assistant Coach Feature
 *
 * Contains interfaces and types used throughout the assistant coach feature.
 * These types define the structure of data used for training plans, workout results,
 * coaching philosophy, and chat messages.
 */

/**
 * Represents a training plan with upcoming races and workouts
 *
 * @property nextRace - Information about the next scheduled race
 *   @property name - Name of the race
 *   @property date - Scheduled date of the race
 *   @property daysUntil - Number of days until the race
 *   @property type - Type of race (e.g., "track", "cross country")
 *   @property distance - Race distance
 * @property upcomingWorkouts - List of planned workouts
 *   @property id - Unique identifier for the workout
 *   @property name - Name/description of the workout
 *   @property date - Scheduled date of the workout
 *   @property type - Type of workout (e.g., "interval", "long run")
 *   @property description - Detailed workout description
 * @property seasonPhase - Current phase of the training season
 * @property focusAreas - Key areas of focus for the current training period
 */
export interface TrainingPlan {
  nextRace: {
    name: string;
    date: string;
    daysUntil: number;
    type: string;
    distance: string;
  };
  upcomingWorkouts: Array<{
    id: string;
    name: string;
    date: string;
    type: string;
    description: string;
  }>;
  seasonPhase: string;
  focusAreas: string[];
}

/**
 * Represents workout results and team performance data
 *
 * @property recentWorkouts - List of recently completed workouts
 *   @property id - Unique identifier for the workout
 *   @property name - Name/description of the workout
 *   @property date - Date the workout was completed
 *   @property completion - Percentage of athletes who completed the workout
 *   @property performance - Overall performance rating
 *   @property notes - Additional notes about the workout
 * @property teamPerformance - Summary of team's overall performance
 *   @property trend - Current performance trend
 *   @property strengths - Areas where the team excels
 *   @property weaknesses - Areas needing improvement
 *   @property topPerformers - List of athletes performing exceptionally well
 *   @property strugglingAthletes - List of athletes needing additional support
 * @property individualHighlights - Notable achievements by individual athletes
 *   @property athleteName - Name of the athlete
 *   @property highlight - Description of the achievement
 */
export interface WorkoutResult {
  recentWorkouts: Array<{
    id: string;
    name: string;
    date: string;
    completion: number;
    performance: "above_expected" | "as_expected" | "below_expected";
    notes: string;
  }>;
  teamPerformance: {
    trend: "improving" | "stable" | "declining";
    strengths: string[];
    weaknesses: string[];
    topPerformers: string[];
    strugglingAthletes: string[];
  };
  individualHighlights: Array<{
    athleteName: string;
    highlight: string;
  }>;
}

/**
 * Represents the coaching philosophy and team values
 *
 * @property corePrinciples - Fundamental principles guiding coaching decisions
 * @property teamValues - Core values that define team culture
 * @property nonNegotiables - Essential rules and expectations
 * @property developmentFocus - Key areas for athlete development
 * @property communicationStyle - Preferred approach to team communication
 */
export interface CoachingPhilosophy {
  corePrinciples: string[];
  teamValues: string[];
  nonNegotiables: string[];
  developmentFocus: string[];
  communicationStyle: string;
}

/**
 * Represents a message in the chat interface
 *
 * @property id - Unique identifier for the message
 * @property role - Sender of the message (user or assistant)
 * @property content - Text content of the message
 * @property timestamp - When the message was sent
 * @property referenced - Optional reference to related data
 *   @property type - Type of referenced data
 *   @property data - Reference data or identifier
 */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  referenced?: {
    type: "training_plan" | "workout_result" | "coaching_philosophy";
    data: string;
  };
}

/**
 * Types of insights that can be generated
 *
 * - training_plan: Insights about upcoming races and workouts
 * - workout_result: Insights about team performance and results
 * - coaching_philosophy: Insights about coaching approach and values
 */
export type InsightType =
  | "training_plan"
  | "workout_result"
  | "coaching_philosophy";
