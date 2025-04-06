import { useState } from "react";

/**
 * Workout Results Hook
 *
 * This custom hook manages the state and logic for workout results functionality.
 * It provides:
 * 1. Workout selection and date management
 * 2. Athlete filtering and search
 * 3. Results entry and updates
 * 4. AI analysis generation
 * 5. Sample data for development
 */

// Type Definitions
interface Athlete {
  id: string;
  name: string;
  group: string;
  results: Record<string, string>;
  notes?: string;
}

interface WorkoutStructure {
  type: string;
  description: string;
  intervals: number;
  rest: string;
  goalPace: string;
}

/**
 * Main hook function that returns all necessary state and functions
 * for managing workout results
 */
export function useWorkoutResults() {
  // State Management
  // - Workout selection and date
  const [selectedWorkout, setSelectedWorkout] = useState<string>("interval");
  const [workoutDate, setWorkoutDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [workoutCompleted, setWorkoutCompleted] = useState<boolean>(false);

  // - Athlete filtering and search
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // - AI analysis state
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  /**
   * Sample athlete data for development
   * - Includes basic athlete information
   * - Pre-populated results for testing
   */
  const [athleteResults, setAthleteResults] = useState<Athlete[]>([
    {
      id: "1",
      name: "John Smith",
      group: "Varsity Boys",
      results: {
        "interval-1": "3:15",
        "interval-2": "3:20",
        "interval-3": "3:18",
        "interval-4": "3:22",
        "interval-5": "3:19",
        "interval-6": "3:17",
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      group: "Varsity Girls",
      results: {
        "interval-1": "3:45",
        "interval-2": "3:50",
        "interval-3": "3:48",
        "interval-4": "3:52",
        "interval-5": "3:49",
        "interval-6": "3:47",
      },
    },
    {
      id: "3",
      name: "Mike Brown",
      group: "JV Boys",
      results: {
        "interval-1": "3:30",
        "interval-2": "3:35",
        "interval-3": "3:33",
        "interval-4": "3:37",
        "interval-5": "3:34",
        "interval-6": "3:32",
      },
    },
    {
      id: "4",
      name: "Emily Davis",
      group: "JV Girls",
      results: {
        "interval-1": "4:00",
        "interval-2": "4:05",
        "interval-3": "4:03",
        "interval-4": "4:07",
        "interval-5": "4:04",
        "interval-6": "4:02",
      },
    },
  ]);

  /**
   * Updates an athlete's result for a specific interval
   * @param athleteId - ID of the athlete to update
   * @param interval - Interval number or field to update
   * @param value - New value to set
   */
  const updateAthleteResult = (
    athleteId: string,
    interval: string,
    value: string
  ) => {
    setAthleteResults((prev) =>
      prev.map((athlete) =>
        athlete.id === athleteId
          ? {
              ...athlete,
              results: {
                ...athlete.results,
                [interval]: value,
              },
            }
          : athlete
      )
    );
  };

  /**
   * Generates AI analysis of workout results
   * - Simulates API call with loading state
   * - Returns sample insights after delay
   */
  const generateAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAiInsights(
      "Based on the workout results, the team showed consistent pacing across intervals. The varsity boys group demonstrated strong endurance with minimal pace drop-off. Consider focusing on speed work for the JV groups to improve their finishing times."
    );
    setIsAnalyzing(false);
  };

  /**
   * Parses workout structure based on selected workout type
   * @returns Workout structure details including intervals and goals
   */
  const parseWorkoutStructure = (): WorkoutStructure => {
    switch (selectedWorkout) {
      case "interval":
        return {
          type: "Interval Workout",
          description: "6x800m with 2:00 rest",
          intervals: 6,
          rest: "2:00",
          goalPace: "3:00",
        };
      case "tempo":
        return {
          type: "Tempo Run",
          description: "3x1600m with 3:00 rest",
          intervals: 3,
          rest: "3:00",
          goalPace: "6:00",
        };
      case "long":
        return {
          type: "Long Run",
          description: "8 miles at easy pace",
          intervals: 1,
          rest: "0",
          goalPace: "8:00",
        };
      case "recovery":
        return {
          type: "Recovery Run",
          description: "4 miles at recovery pace",
          intervals: 1,
          rest: "0",
          goalPace: "9:00",
        };
      default:
        return {
          type: "Interval Workout",
          description: "6x800m with 2:00 rest",
          intervals: 6,
          rest: "2:00",
          goalPace: "3:00",
        };
    }
  };

  // Return all state and functions for component use
  return {
    selectedWorkout,
    setSelectedWorkout,
    workoutDate,
    setWorkoutDate,
    workoutCompleted,
    setWorkoutCompleted,
    selectedGroup,
    setSelectedGroup,
    searchQuery,
    setSearchQuery,
    athleteResults,
    updateAthleteResult,
    aiInsights,
    isAnalyzing,
    generateAIAnalysis,
    parseWorkoutStructure,
  };
}
