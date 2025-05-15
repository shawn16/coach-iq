import { useState, useEffect } from "react";
import { WorkoutType, WorkoutLibrary } from "@/types/training";

// Custom hook to manage workout types and library data
export function useWorkoutData(selectedTab: string) {
  // State for workout types and library items
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutLibrary[]>([]);

  // Load workout types on component mount
  useEffect(() => {
    const abortController = new AbortController();

    const loadWorkoutTypes = async () => {
      try {
        const response = await fetch('/api/workout-types', {
          signal: abortController.signal
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error fetching workout types:", errorData);
          throw new Error(`Failed to fetch workout types from API: ${response.statusText}`);
        }
        const types = await response.json();
        setWorkoutTypes(types);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error("Error loading workout types:", error);
      }
    };

    loadWorkoutTypes();

    return () => {
      abortController.abort();
    };
  }, []);

  // Load workout library items when the workoutBuilder tab is selected
  useEffect(() => {
    const abortController = new AbortController();

    const loadWorkoutLibrary = async () => {
      if (selectedTab === 'workoutBuilder' && workouts.length === 0) { 
        try {
          const response = await fetch('/api/workout-library', {
            signal: abortController.signal
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error("API error fetching workout library:", errorData);
            throw new Error(`Failed to fetch workout library from API: ${response.statusText}`);
          }
          const libraryItems = await response.json();
          setWorkouts(libraryItems);
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            return;
          }
          console.error("Error loading workout library:", error);
        }
      }
    };

    loadWorkoutLibrary();

    return () => {
      abortController.abort();
    };
  }, [selectedTab, workouts.length]);

  return {
    workoutTypes,
    workouts,
    setWorkouts,
  };
}
