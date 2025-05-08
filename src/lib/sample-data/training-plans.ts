// This file contains sample data for training plans
// Used for development, testing, and demonstrations
// Provides realistic mock data for the app's training plan features

import type { TrainingPlan } from "@/components/training-plan-card"; // Import the shared interface
import { parseISO } from "date-fns";

// --- Type Definitions ---

/**
 * Re-export the basic TrainingPlan type from the card component
 */
export type { TrainingPlan } from "@/components/training-plan-card";

/**
 * Represents workouts for a single week, keyed by workout type ID
 */
export interface WeekWorkouts {
  [key: string]: string | undefined;
}

/**
 * Represents a single week in a training plan
 */
export interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: WeekWorkouts;
}

/**
 * Represents a type of workout with display settings
 */
export interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

/**
 * Possible subtypes of training plans
 */
export type PlanSubType =
  | "endurance"
  | "speed"
  | "strength"
  | "marathon"
  | "standard"
  | undefined;

/**
 * Extended training plan type with detailed information
 * Used for the plan details view
 */
export interface TrainingPlanDetail extends Omit<TrainingPlan, 'type' | 'startDate'> {
  startDate: Date; // Use Date object
  endDate: Date; // Use Date object
  type?: PlanSubType; // Override type with PlanSubType
  planType: string; // e.g., 'xc'
  totalWorkouts: number;
  planData: WeekData[];
}

// --- Sample Data Arrays ---

/**
 * Sample active training plans
 * Used for demonstrations and development
 */
export const activePlans: TrainingPlan[] = [
    {
        id: "1",
        title: "Spring Season Preparation",
        description:
            "Endurance and strength training for the upcoming spring season",
        duration: "12 weeks",
        athletes: 24,
        startDate: "Jan 15, 2023",
        progress: 65,
        type: "endurance",
    },
    {
        id: "2",
        title: "Marathon Training Block",
        description: "Progressive training plan for marathon preparation",
        duration: "16 weeks",
        athletes: 18,
        startDate: "Feb 1, 2023",
        progress: 30,
        type: "marathon",
    },
    {
        id: "6",
        title: "Track Season Buildup",
        description:
            "Specialized training for track athletes focusing on speed and technique",
        duration: "10 weeks",
        athletes: 15,
        startDate: "Jan 20, 2023",
        progress: 50,
        type: "speed",
    },
    {
        id: "7",
        title: "Recovery Block",
        description:
            "Low intensity training focused on recovery and technique refinement",
        duration: "4 weeks",
        athletes: 8,
        startDate: "Feb 15, 2023",
        progress: 25,
        type: "endurance",
    },
    {
        id: "8",
        title: "Elite Athlete Program",
        description:
            "Specialized high-intensity program for top performing athletes",
        duration: "8 weeks",
        athletes: 5,
        startDate: "Jan 10, 2023",
        progress: 75,
        type: "strength",
    },
    {
        id: "9",
        title: "Freshman Development",
        description: "Foundational training program for new team members",
        duration: "14 weeks",
        athletes: 12,
        startDate: "Feb 5, 2023",
        progress: 40,
        type: "endurance",
    },
];

/**
 * Sample completed training plans
 * Used for demonstrations and development
 */
export const completedPlans: TrainingPlan[] = [
    {
        id: "4",
        title: "Fall Cross Country",
        description: "Base building and race preparation for cross country season",
        duration: "14 weeks",
        athletes: 28,
        startDate: "Aug 5, 2022",
        progress: 100,
        type: "endurance",
    },
    {
        id: "5",
        title: "Winter Strength Block",
        description: "Off-season strength and conditioning program",
        duration: "8 weeks",
        athletes: 22,
        startDate: "Dec 1, 2022",
        progress: 100,
        type: "strength",
    },
    {
        id: "12",
        title: "Holiday Maintenance",
        description: "Light training to maintain fitness during holiday break",
        duration: "3 weeks",
        athletes: 30,
        startDate: "Dec 15, 2022",
        progress: 100,
        type: "endurance",
    },
    {
        id: "13",
        title: "Fall Speed Development",
        description: "Short-term focus on improving sprint mechanics",
        duration: "4 weeks",
        athletes: 15,
        startDate: "Oct 10, 2022",
        progress: 100,
        type: "speed",
    },
    {
        id: "14",
        title: "Championship Preparation",
        description: "Final preparation phase for championship meets",
        duration: "6 weeks",
        athletes: 25,
        startDate: "Oct 1, 2022",
        progress: 100,
        type: "endurance",
    },
];

// --- Sample Data Constants ---

/**
 * Sample workout types with display colors
 * Used for demonstrations and UI development
 */
export const workoutTypes: WorkoutType[] = [
  {
    id: "green_vol",
    name: "Green Vol",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  },
  // ... (rest of workoutTypes array) ...
  {
    id: "1600_pace",
    name: "1600 Pace",
    color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  },
];


// --- Sample Data Generation Functions ---

/**
 * Generates sample week-by-week data for a training plan
 * Creates realistic progressive training patterns with dates and workouts
 * 
 * @param startDate - Optional start date for the training plan, defaults to May 24, 2023
 * @returns Array of week data objects ready for display
 */
export const generatePlanData = (startDate?: Date): WeekData[] => {
  const data: WeekData[] = [];
  const weeks = 12; // Example weeks for demo

  // Sample data to match the screenshot
  const seasonPhases = [
    { weeks: 2, name: "Transition Week" },
    { weeks: 7, name: "Summer Week" },
    { weeks: 1, name: "Cypress XC Relays" },
    { weeks: 1, name: "Cy Woods Inv mile" },
    { weeks: 1, name: "Friday Night Lights" },
  ];

  // Generate dates for each week
  const startDateObj = startDate || parseISO("2023-05-24"); // Use passed start date or default
  const currentDate = new Date(startDateObj);
  let weekCounter = 1;
  let phaseIndex = 0;
  let phaseWeekCounter = 1;

  for (let i = 0; i < weeks; i++) {
    const weekStartDate = new Date(currentDate);
    const weekEndDate = new Date(currentDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    // Format dates as MM/DD
    const formatDate = (date: Date): string =>
      `${date.getMonth() + 1}/${date.getDate()}`;
    const dateRange = `${formatDate(weekStartDate)}-${formatDate(weekEndDate)}`;

    // Determine season phase
    let seasonPhase = "";
    let seasonWeek = "";

    if (phaseIndex < seasonPhases.length) {
      seasonPhase = seasonPhases[phaseIndex].name;
      if (seasonPhase.includes("Week")) {
        seasonWeek = seasonPhase.split(" ")[0] + " Week " + phaseWeekCounter;
      } else {
        seasonWeek = seasonPhase;
      }

      phaseWeekCounter++;
      if (phaseWeekCounter > seasonPhases[phaseIndex].weeks) {
        phaseIndex++;
        phaseWeekCounter = 1;
      }
    }

    // Create week data
    const weekData: WeekData = {
      id: i + 1,
      weekNumber: weekCounter,
      dateRange,
      seasonPhase: seasonWeek,
      workouts: {},
    };

    // Add sample workout data
    if (i < 12) {
      if (i >= 2 && i <= 8) {
        // Summer weeks
        const intensity = 70 + Math.min(i - 2, 5) * 5; // Increase intensity each week
        weekData.workouts = {
          green_vol: i >= 2 ? `10m@${intensity}%` : "",
          white_vol: i >= 2 ? `5m@${intensity}%` : "",
          gold_vol: i >= 2 ? `7m@${intensity}%` : "",
          acceleration: i >= 2 ? `${3 + Math.min(i - 2, 2)}m AR` : "",
          tempo:
            i >= 2
              ? `${2 + Math.min(i - 2, 2)}m@${81 + Math.min(i - 2, 4)}% w/1'`
              : "",
          fartlek_new:
            i >= 2 ? `1-2-1-2-1 w/1'30 H, last 1' (${7 + i} total)` : "",
          fartlek_varsity:
            i >= 2 ? `1-2-1-2-1-2 w/1'30 H, last 1' (${9 + i} total)` : "",
          "5k_pace": i >= 7 ? "Time Trial" : "",
        };
      }
    }

    data.push(weekData);

    // Move to next week
    currentDate.setDate(currentDate.getDate() + 7);
    weekCounter++;
  }

  return data;
};

/**
 * Retrieves detailed information for a sample training plan by ID
 * Simulates an API call to fetch plan details
 *
 * @param id - The ID of the training plan to retrieve
 * @returns Detailed training plan data or null if not found
 */
export const getTrainingPlanById = (id: string): TrainingPlanDetail | null => {
  // Find the plan in active or completed plans
  const basicPlan = [...activePlans, ...completedPlans].find(
    (p) => p.id === id
  );
  if (!basicPlan) return null;

  // Add additional plan details (adjust based on actual data source)
  return {
    ...basicPlan,
    startDate: parseISO("2023-05-24"), // Example date for demo
    endDate: parseISO("2023-08-15"), // Example date for demo
    planType: "xc", // Cross Country
    totalWorkouts: 36, // Example
    planData: generatePlanData(parseISO("2023-05-24")), // Pass start date
    // Ensure all fields from TrainingPlanDetail are present
    description: basicPlan.description || "", // Add fallback
    type: (basicPlan.type as PlanSubType) || undefined, // Add type assertion/fallback
  };
};