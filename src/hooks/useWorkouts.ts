import { useState, useEffect } from "react";
import { Workout } from "@/types/workout";

// Define the STORAGE_KEY constant
const STORAGE_KEY = "workouts";

// Define the useWorkouts hook
export function useWorkouts() {
  // Define the state for the workouts
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Define the useEffect hook to save the workouts to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  // Define the addWorkout function
  const addWorkout = (workout: Omit<Workout, "id">) => {
    const newWorkout = {
      ...workout,
      id: crypto.randomUUID(),
    };
    setWorkouts([...workouts, newWorkout]);
    return newWorkout;
  };

  // Define the updateWorkout function
  const updateWorkout = (id: string, workout: Partial<Workout>) => {
    setWorkouts(workouts.map((w) => (w.id === id ? { ...w, ...workout } : w)));
  };

  // Define the deleteWorkout function
  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  // Define the getWorkout function
  const getWorkout = (id: string) => {
    return workouts.find((w) => w.id === id);
  };

  // Define the getWorkoutsByType function
  const getWorkoutsByType = (type: string) => {
    return workouts.filter((w) => w.type === type);
  };

  // Define the getWorkoutsByDuration function
  const getWorkoutsByDuration = (duration: number) => {
    return workouts.filter((w) => w.duration === duration);
  };

  // Define the main return function
  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getWorkoutsByType,
    getWorkoutsByDuration,
  };
}
