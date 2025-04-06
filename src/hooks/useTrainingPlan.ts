"use client";

import { useState, useEffect, useCallback } from "react";
import { Workout } from "@/types/workout";

// Define the STORAGE_KEY constant
const STORAGE_KEY = "trainingPlans";

// Define the TrainingPlan interface
interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  weeks: Workout[][];
}

// Define the useTrainingPlan hook
export function useTrainingPlan() {
  // Define the state for the training plans
  const [plans, setPlans] = useState<TrainingPlan[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Define the useEffect hook to save the training plans to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  // Define the addPlan function
  const addPlan = useCallback((plan: Omit<TrainingPlan, "id">) => {
    const newPlan = {
      ...plan,
      id: crypto.randomUUID(),
    };
    setPlans((prevPlans) => [...prevPlans, newPlan]);
    return newPlan;
  }, []);

  // Define the updatePlan function
  const updatePlan = useCallback((id: string, plan: Partial<TrainingPlan>) => {
    setPlans((prevPlans) =>
      prevPlans.map((p) => (p.id === id ? { ...p, ...plan } : p))
    );
  }, []);

  // Define the deletePlan function
  const deletePlan = useCallback((id: string) => {
    setPlans((prevPlans) => prevPlans.filter((p) => p.id !== id));
  }, []);

  // Define the getPlan function
  const getPlan = useCallback(
    (id: string) => {
      return plans.find((p) => p.id === id);
    },
    [plans]
  );

  // Define the getPlansByDuration function
  const getPlansByDuration = useCallback(
    (duration: number) => {
      return plans.filter((p) => p.duration === duration);
    },
    [plans]
  );

  // Define the main return function
  return {
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    getPlan,
    getPlansByDuration,
  };
}
