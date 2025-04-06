"use client";

import { useMemo } from "react";
import type { WorkoutType } from "../types";

export function useWorkoutTypes(): WorkoutType[] {
  return useMemo(
    () => [
      {
        id: "green_vol",
        name: "Green Vol",
        color: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-800 dark:text-green-300",
      },
      {
        id: "yellow_vol",
        name: "Yellow Vol",
        color: "bg-yellow-100 dark:bg-yellow-900/30",
        textColor: "text-yellow-800 dark:text-yellow-300",
      },
      {
        id: "red_vol",
        name: "Red Vol",
        color: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-800 dark:text-red-300",
      },
      {
        id: "blue_vol",
        name: "Blue Vol",
        color: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-800 dark:text-blue-300",
      },
      {
        id: "purple_vol",
        name: "Purple Vol",
        color: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-800 dark:text-purple-300",
      },
    ],
    []
  );
}
