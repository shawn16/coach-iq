import { useState } from "react";
import { Workout } from "@/types/workout";

// Define the WeekViewState type
interface WeekViewState {
  workouts: Workout[];
  isDragging: boolean;
}

// Define the useWeekView hook
export function useWeekView(initialWorkouts: Workout[] = []) {
  // Define the state for the week view
  const [state, setState] = useState<WeekViewState>({
    workouts: initialWorkouts,
    isDragging: false,
  });

  // Define the addWorkout function
  const addWorkout = (workout: Workout) => {
    setState((prev) => ({
      ...prev,
      workouts: [...prev.workouts, workout],
    }));
  };

  // Define the removeWorkout function
  const removeWorkout = (workoutId: string) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((workout) => workout.id !== workoutId),
    }));
  };

  // Define the moveWorkout function
  const moveWorkout = (workoutId: string, direction: "up" | "down") => {
    setState((prev) => {
      const workoutIndex = prev.workouts.findIndex(
        (workout) => workout.id === workoutId
      );

      if (
        (direction === "up" && workoutIndex > 0) ||
        (direction === "down" && workoutIndex < prev.workouts.length - 1)
      ) {
        const newIndex =
          direction === "up" ? workoutIndex - 1 : workoutIndex + 1;
        const workout = prev.workouts[workoutIndex];
        const newWorkouts = [...prev.workouts];
        newWorkouts.splice(workoutIndex, 1);
        newWorkouts.splice(newIndex, 0, workout);
        return { ...prev, workouts: newWorkouts };
      }

      return prev;
    });
  };

  // Define the updateWorkout function
  const updateWorkout = (workoutId: string, workout: Partial<Workout>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((w) =>
        w.id === workoutId ? { ...w, ...workout } : w
      ),
    }));
  };

  // Define the setDragging function
  const setDragging = (isDragging: boolean) => {
    setState((prev) => ({ ...prev, isDragging }));
  };

  // Define the main return function
  return {
    state,
    addWorkout,
    removeWorkout,
    moveWorkout,
    updateWorkout,
    setDragging,
  };
}
