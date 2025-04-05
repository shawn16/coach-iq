import { useState } from "react";
import { Workout } from "@/types/progression";

// Define the useWorkouts hook
export function useWorkouts(initialWorkouts: Workout[] = []) {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

  // Define the addWorkout function
  const addWorkout = () => {
    const newWorkout: Workout = {
      id: workouts.length + 1,
      name: "",
      type: "interval",
      format: "time",
      value: "",
      unit: "",
      description: "",
    };
    setWorkouts([...workouts, newWorkout]);
  };

  // Define the removeWorkout function
  const removeWorkout = (id: number) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  // Define the updateWorkout function
  const updateWorkout = (id: number, field: string, value: string) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, [field]: value } : workout
      )
    );
  };

  // Define the moveWorkout function
  const moveWorkout = (id: number, direction: "up" | "down") => {
    const index = workouts.findIndex((workout) => workout.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === workouts.length - 1)
    ) {
      return;
    }

    // Define the new workouts array
    const newWorkouts = [...workouts];

    // Define the new index
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Swap the workouts
    [newWorkouts[index], newWorkouts[newIndex]] = [
      newWorkouts[newIndex],
      newWorkouts[index],
    ];

    // Update the workouts
    setWorkouts(newWorkouts);
  };

  // Define the main return function
  return {
    workouts,
    addWorkout,
    removeWorkout,
    updateWorkout,
    moveWorkout,
  };
}
