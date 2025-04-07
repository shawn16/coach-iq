/**
 * Assistant Coach Configuration
 *
 * Contains sample data and configuration for the Assistant Coach feature.
 * This data is used to demonstrate the AI assistant's capabilities and
 * provide context for generating insights.
 *
 * Data Structure:
 * - Training Plan: Upcoming races and workouts
 * - Workout Results: Recent performance data
 * - Coaching Philosophy: Core principles and values
 * - Insight Types: UI configuration for different insights
 */

import { TrainingPlan, WorkoutResult, CoachingPhilosophy } from "./types";

/**
 * Sample Training Plan Data
 *
 * Represents a typical training schedule leading up to a major race.
 * Includes:
 * - Next race details
 * - Upcoming workouts
 * - Season phase
 * - Training focus areas
 */
export const SAMPLE_TRAINING_PLAN: TrainingPlan = {
  nextRace: {
    name: "City Championships",
    date: "2023-05-15",
    daysUntil: 12,
    type: "Championship",
    distance: "5K",
  },
  upcomingWorkouts: [
    {
      id: "w1",
      name: "Threshold Tempo Run",
      date: "2023-05-04",
      type: "tempo",
      description: "25min continuous @ tempo pace",
    },
    {
      id: "w2",
      name: "Race Simulation",
      date: "2023-05-08",
      type: "interval",
      description: "2x1600m @ 5K pace + 4x400m @ 1600m pace",
    },
    {
      id: "w3",
      name: "Easy Recovery Run",
      date: "2023-05-11",
      type: "recovery",
      description: "40min easy + strides",
    },
  ],
  seasonPhase: "Competition Phase",
  focusAreas: [
    "Race-specific endurance",
    "Speed endurance",
    "Mental preparation",
  ],
};

/**
 * Sample Workout Results Data
 *
 * Represents recent team performance data and analysis.
 * Includes:
 * - Recent workout summaries
 * - Team performance trends
 * - Individual athlete highlights
 * - Performance metrics and notes
 */
export const SAMPLE_WORKOUT_RESULTS: WorkoutResult = {
  recentWorkouts: [
    {
      id: "r1",
      name: "Tuesday Interval Session",
      date: "2023-04-25",
      completion: 92,
      performance: "above_expected",
      notes:
        "Team performed well on the 400m repeats, showing good recovery between intervals.",
    },
    {
      id: "r2",
      name: "Hill Repeats",
      date: "2023-04-28",
      completion: 85,
      performance: "below_expected",
      notes:
        "Athletes struggled with maintaining form on the later repetitions.",
    },
    {
      id: "r3",
      name: "Long Run",
      date: "2023-04-30",
      completion: 90,
      performance: "as_expected",
      notes:
        "Good steady effort throughout, though some athletes reported fatigue.",
    },
  ],
  teamPerformance: {
    trend: "improving",
    strengths: ["Endurance base", "Team cohesion", "Recovery between workouts"],
    weaknesses: ["Hill running technique", "Race starts", "Finishing kick"],
    topPerformers: ["James Lee", "Alex Johnson", "Charlotte Lewis"],
    strugglingAthletes: [
      "Isabella Rodriguez",
      "William Garcia",
      "Ava Thompson",
    ],
  },
  individualHighlights: [
    {
      athleteName: "James Lee",
      highlight:
        "Consistent improvement in tempo runs, now 15 seconds faster per mile than last month.",
    },
    {
      athleteName: "Isabella Rodriguez",
      highlight:
        "Struggling with hill workouts, showing signs of potential iron deficiency.",
    },
    {
      athleteName: "Charlotte Lewis",
      highlight:
        "Excellent progress in speed workouts, ready for more challenging intervals.",
    },
  ],
};

/**
 * Sample Coaching Philosophy Data
 *
 * Defines the core principles and values of the coaching program.
 * Includes:
 * - Core training principles
 * - Team values
 * - Non-negotiable rules
 * - Development focus areas
 * - Communication style
 */
export const SAMPLE_COACHING_PHILOSOPHY: CoachingPhilosophy = {
  corePrinciples: [
    "Long-term athlete development",
    "Individualized training approach",
    "Science-based training methods",
    "Mental toughness development",
  ],
  teamValues: [
    "Excellence in academics and athletics",
    "Respect for self and others",
    "Commitment to team goals",
    "Continuous improvement",
  ],
  nonNegotiables: [
    "Attendance at practice",
    "Academic eligibility",
    "Sportsmanship",
    "Team communication",
  ],
  developmentFocus: [
    "Technical running form",
    "Race strategy",
    "Recovery and injury prevention",
    "Nutrition and hydration",
  ],
  communicationStyle:
    "Direct and supportive, with emphasis on constructive feedback",
};

/**
 * Insight Type Configuration
 *
 * Defines the UI configuration for different types of insights.
 * Each insight type has:
 * - Icon: Lucide icon name for visual representation
 * - Label: Display text for the insight type
 */
export const INSIGHT_TYPES = {
  training_plan: {
    icon: "Calendar",
    label: "Training Plan",
  },
  workout_result: {
    icon: "BarChart3",
    label: "Workout Results",
  },
  coaching_philosophy: {
    icon: "Brain",
    label: "Coaching Philosophy",
  },
};
