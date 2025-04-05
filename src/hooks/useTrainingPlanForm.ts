import { useState } from "react";

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing uuid - uuidv4 from uuid
import { v4 as uuidv4 } from "uuid";

// Define the TrainingPlanFormState type
interface TrainingPlanFormState {
  name: string;
  description: string;
  duration: string;
  weeks: Workout[][];
  errors: string[];
}

// Define the useTrainingPlanForm hook
export function useTrainingPlanForm(
  initialState?: Partial<TrainingPlanFormState>
) {
  // Define the state for the training plan form
  const [state, setState] = useState<TrainingPlanFormState>({
    name: initialState?.name || "",
    description: initialState?.description || "",
    duration: initialState?.duration || "",
    weeks: initialState?.weeks || [],
    errors: [],
  });

  // Define the validate function
  const validate = () => {
    const errors: string[] = [];

    if (!state.name) {
      errors.push("Name is required");
    }

    if (!state.duration) {
      errors.push("Duration is required");
    } else if (isNaN(parseInt(state.duration))) {
      errors.push("Duration must be a number");
    } else if (parseInt(state.duration) < 1) {
      errors.push("Duration must be at least 1 week");
    }

    if (state.weeks.length === 0) {
      errors.push("At least one week is required");
    }

    setState((prev) => ({ ...prev, errors }));
    return errors.length === 0;
  };

  // Define the addWeek function
  const addWeek = () => {
    setState((prev) => ({
      ...prev,
      weeks: [...prev.weeks, []],
    }));
  };

  // Define the addWorkout function
  const addWorkout = (weekIndex: number) => {
    const newWorkout: Workout = {
      id: uuidv4(),
      name: "New Workout",
      type: "tempo",
      description: "",
      duration: 30,
    };

    setState((prev) => {
      const newWeeks = [...prev.weeks];
      newWeeks[weekIndex] = [...newWeeks[weekIndex], newWorkout];
      return { ...prev, weeks: newWeeks };
    });
  };

  const removeWorkout = (weekIndex: number, workoutId: string) => {
    setState((prev) => {
      const newWeeks = [...prev.weeks];
      newWeeks[weekIndex] = newWeeks[weekIndex].filter(
        (workout) => workout.id !== workoutId
      );
      return { ...prev, weeks: newWeeks };
    });
  };

  // Define the moveWorkout function
  const moveWorkout = (
    weekIndex: number,
    workoutId: string,
    direction: "up" | "down"
  ) => {
    setState((prev) => {
      const newWeeks = [...prev.weeks];
      const workoutIndex = newWeeks[weekIndex].findIndex(
        (workout) => workout.id === workoutId
      );

      if (
        (direction === "up" && workoutIndex > 0) ||
        (direction === "down" && workoutIndex < newWeeks[weekIndex].length - 1)
      ) {
        const newIndex =
          direction === "up" ? workoutIndex - 1 : workoutIndex + 1;
        const workout = newWeeks[weekIndex][workoutIndex];
        newWeeks[weekIndex].splice(workoutIndex, 1);
        newWeeks[weekIndex].splice(newIndex, 0, workout);
      }

      return { ...prev, weeks: newWeeks };
    });
  };

  // Define the updateWorkout function
  const updateWorkout = (
    weekIndex: number,
    workoutId: string,
    workout: Partial<Workout>
  ) => {
    setState((prev) => {
      const newWeeks = [...prev.weeks];
      newWeeks[weekIndex] = newWeeks[weekIndex].map((w) =>
        w.id === workoutId ? { ...w, ...workout } : w
      );
      return { ...prev, weeks: newWeeks };
    });
  };

  // Define the getPlan function
  const getPlan = () => {
    return {
      name: state.name,
      description: state.description,
      duration: parseInt(state.duration),
      weeks: state.weeks,
    };
  };

  // Define the main return function
  return {
    state,
    setState,
    validate,
    addWeek,
    addWorkout,
    removeWorkout,
    moveWorkout,
    updateWorkout,
    getPlan,
  };
}
