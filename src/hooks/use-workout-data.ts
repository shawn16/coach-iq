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
            // Define a type that can accommodate expected error shapes or a generic message/details structure
            let errorPayload: { error?: string; details?: string; message?: string } = {};
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
              try {
                errorPayload = await response.json();
              } catch (jsonError) {
                console.error("Failed to parse JSON error response:", jsonError);
                // Fallback if JSON parsing fails despite content type header
                errorPayload = { message: "Failed to parse JSON error", details: await response.text().catch(() => "Could not read error text") };
              }
            } else {
              const textError = await response.text();
              console.error("Non-JSON API error response:", textError);
              errorPayload = { message: "Received non-JSON error from server", details: textError };
            }
            console.error("API error fetching workout library:", errorPayload);
            throw new Error(`Failed to fetch workout library from API: ${response.statusText}`);
          }
          const libraryItems = await response.json();
          setWorkouts(libraryItems);
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            return;
          }
          // Log the caught error, which might be the one thrown above or a different network error
          console.error("Error in loadWorkoutLibrary catch block:", error);
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
