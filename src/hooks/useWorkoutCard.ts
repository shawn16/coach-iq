import { useState } from "react";
import { Workout } from "@/types/workout";

// Define the WorkoutCardState type
interface WorkoutCardState {
  isEditing: boolean;
  workout: Workout;
}

// Define the useWorkoutCard hook
export function useWorkoutCard(initialWorkout: Workout) {
  // Define the state for the workout card
  const [state, setState] = useState<WorkoutCardState>({
    isEditing: false,
    workout: initialWorkout,
  });

  // Define the startEditing function
  const startEditing = () => {
    setState((prev) => ({ ...prev, isEditing: true }));
  };

  // Define the stopEditing function
  const stopEditing = () => {
    setState((prev) => ({ ...prev, isEditing: false }));
  };

  // Define the updateWorkout function
  const updateWorkout = (workout: Partial<Workout>) => {
    setState((prev) => ({
      ...prev,
      workout: { ...prev.workout, ...workout },
    }));
  };

  // Define the main return function
  return {
    state,
    startEditing,
    stopEditing,
    updateWorkout,
  };
}
