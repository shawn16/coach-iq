import { useState } from "react";
import { Workout } from "@/types/workout";

// Define the WorkoutSelectorState type
interface WorkoutSelectorState {
  search: string;
  type: string;
  filteredWorkouts: Workout[];
}

// Define the useWorkoutSelector hook
export function useWorkoutSelector(workouts: Workout[]) {
  // Define the state for the workout selector
  const [state, setState] = useState<WorkoutSelectorState>({
    search: "",
    type: "",
    filteredWorkouts: workouts,
  });

  // Define the updateSearch function
  const updateSearch = (search: string) => {
    setState((prev) => ({
      ...prev,
      search,
      filteredWorkouts: filterWorkouts(workouts, search, prev.type),
    }));
  };

  // Define the updateType function
  const updateType = (type: string) => {
    setState((prev) => ({
      ...prev,
      type,
      filteredWorkouts: filterWorkouts(workouts, prev.search, type),
    }));
  };

  // Define the filterWorkouts function
  const filterWorkouts = (
    workouts: Workout[],
    search: string,
    type: string
  ) => {
    return workouts.filter((workout) => {
      const matchesSearch = workout.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = !type || workout.type === type;
      return matchesSearch && matchesType;
    });
  };

  // Define the getWorkoutTypes function
  const getWorkoutTypes = () => {
    return Array.from(new Set(workouts.map((workout) => workout.type)));
  };

  // Define the main return function
  return {
    state,
    updateSearch,
    updateType,
    getWorkoutTypes,
  };
}
