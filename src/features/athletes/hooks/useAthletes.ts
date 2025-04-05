import { useState } from "react";
import { Athlete } from "../types";

// Temporary mock data - will be replaced with API calls
const athletesData: Athlete[] = [];

// Custom hook for managing athletes
export function useAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>(athletesData);
  
  // Function to add a new athlete
  const addAthlete = (newAthlete: Omit<Athlete, "id">) => {
    const newId = Math.max(...athletes.map((a) => a.id), 0) + 1;
    setAthletes((prev) => [...prev, { ...newAthlete, id: newId }]);
  };
  
  // Function to delete an athlete
  const deleteAthlete = (id: number) => {
    setAthletes((prev) => prev.filter((athlete) => athlete.id !== id));
  };

  // Function to update an athlete
  const updateAthlete = (id: number, updates: Partial<Athlete>) => {
    setAthletes((prev) =>
      prev.map((athlete) =>
        athlete.id === id ? { ...athlete, ...updates } : athlete
      )
    );
  };

  // Return the athletes and functions for managing them
  return {
    athletes,
    addAthlete,
    deleteAthlete,
    updateAthlete,
  };
} 