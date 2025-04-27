"use client";

import { useEffect } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { FixedColumns } from "./FixedColumns";
import { ScrollableColumns } from "./ScrollableColumns";

// --- Type Definitions (reuse or import from shared location if possible) ---
interface WeekWorkouts {
  [key: string]: string | undefined;
}

interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: WeekWorkouts;
}

interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

// --- Component Interface ---
interface TrainingPlanTableProps {
  planData: WeekData[];
  workoutTypes: WorkoutType[];
  removeWeek?: (weekId: number) => void;
  moveWeek?: (weekId: number, direction: "up" | "down") => void;
  readOnly?: boolean;
  onCellClick?: (weekId: number, workoutType: string) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement>,
    weekId: number,
    workoutType: string
  ) => void;
}

// --- Component ---
export function TrainingPlanTable({
  planData,
  workoutTypes,
  removeWeek,
  moveWeek,
  readOnly = false,
  onCellClick,
  onKeyDown,
}: TrainingPlanTableProps) {
  useEffect(() => {
    const scrollContainers = document.querySelectorAll<HTMLElement>(".table-scroll-container");
    scrollContainers.forEach((container) => {
      container.style.scrollBehavior = "smooth";
    });
  }, []);

  const getSeasonPhaseColor = (phase: string): string => {
    if (phase.includes("Transition"))
      return "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
    if (phase.includes("Summer"))
      return "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
    if (phase.includes("OFF"))
      return "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
    if (phase.includes("Relays") || phase.includes("Inv"))
      return "bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
    return "bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-300";
  };

  return (
    <div className="relative shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex">
        <FixedColumns planData={planData} getSeasonPhaseColor={getSeasonPhaseColor} />
        <ScrollableColumns
          planData={planData}
          workoutTypes={workoutTypes}
          readOnly={readOnly}
          onCellClick={onCellClick}
          onKeyDown={onKeyDown}
          moveWeek={moveWeek}
          removeWeek={removeWeek}
        />
      </div>
    </div>
  );
}
