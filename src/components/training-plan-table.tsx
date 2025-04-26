"use client";

// import { useState, useEffect } from "react"; // useState is no longer used
import { useEffect } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // No longer used
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"; // Removed Edit
// import { AddWorkoutDialog } from "@/components/add-workout-dialog"; // Dialog handled by parent

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
    // Apply smooth scrolling to all scrollable containers
    const scrollContainers = document.querySelectorAll<HTMLElement>(
      ".table-scroll-container"
    ); // Select as HTMLElements
    scrollContainers.forEach((container) => {
      container.style.scrollBehavior = "smooth"; // Access style safely
    });
  }, []);

  // Get color class for season phase
  const getSeasonPhaseColor = (phase: string): string => {
    // Add type and return type
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
        {/* Fixed columns section */}
        <div className="flex-none w-[350px]">
          {/* Fixed headers */}
          <div className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="grid grid-cols-[80px_120px_150px] h-12">
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center">
                Week
              </div>
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center">
                Dates
              </div>
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center border-r-2 border-r-gray-300 dark:border-r-gray-700">
                Phase
              </div>
            </div>
          </div>

          {/* Fixed data rows */}
          {planData.map((week) => (
            <div
              key={`fixed-${week.id}`}
              className="grid grid-cols-[80px_120px_150px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-3 flex items-center font-medium h-14">
                {week.weekNumber}
              </div>
              <div className="px-4 py-3 flex items-center h-14">
                {week.dateRange}
              </div>
              <div className="px-4 py-3 flex items-center h-14 border-r-2 border-r-gray-300 dark:border-r-gray-700">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getSeasonPhaseColor(
                    week.seasonPhase
                  )}`}
                >
                  {week.seasonPhase}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable columns section - single scroll container for all rows */}
        <div className="overflow-x-auto flex-grow table-scroll-container">
          <div className="min-w-max">
            {/* Scrollable headers */}
            <div className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex h-12">
                {workoutTypes.map((type) => (
                  <div
                    key={type.id}
                    className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center whitespace-nowrap w-[150px]"
                  >
                    {type.name}
                  </div>
                ))}
                {!readOnly && (
                  <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center whitespace-nowrap w-[120px]">
                    Actions
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable data rows */}
            {planData.map((week) => (
              <div
                key={`scroll-${week.id}`}
                className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-w-max"
              >
                {workoutTypes.map((type) => {
                  const workoutValue = week.workouts[type.id];
                  const isEditing = false; // editingCell?.weekId === week.id && editingCell?.workoutType === type.id; // Removed editing logic

                  return (
                    <div
                      key={type.id}
                      className={`px-4 py-3 flex items-center justify-center text-center font-medium h-14 w-[150px] border-r border-gray-200 dark:border-gray-700 ${
                        !readOnly
                          ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          : ""
                      } ${
                        workoutValue
                          ? type.color
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      onClick={() => {
                        if (!readOnly && onCellClick) {
                          onCellClick(week.id, type.id);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (!readOnly && onKeyDown) {
                          onKeyDown(e, week.id, type.id);
                        }
                      }}
                      tabIndex={!readOnly ? 0 : -1} // Make cell focusable if not read-only
                      role={!readOnly ? "button" : undefined} // Add role for accessibility
                      aria-label={`Week ${week.weekNumber}, ${type.name}, ${
                        workoutValue || "empty"
                      }`}
                    >
                      {isEditing ? (
                        // <Input
                        //   type="text"
                        //   value={editValue}
                        //   onChange={(e) => setEditValue(e.target.value)}
                        //   onBlur={handleCellBlur}
                        //   onKeyDown={handleKeyDown}
                        //   autoFocus
                        //   className="w-full h-full p-1 text-center bg-white dark:bg-gray-700 border-blue-500"
                        // />
                        <span>Editing...</span> // Placeholder, should not be reached
                      ) : (
                        <span className="text-xs truncate">
                          {workoutValue || "Click to add workout"}
                        </span>
                      )}
                    </div>
                  );
                })}
                {/* Actions Column */}
                {!readOnly && (
                  <div className="px-4 py-3 flex items-center justify-center space-x-2 w-[120px]">
                    {moveWeek && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveWeek(week.id, "up")}
                          aria-label={`Move week ${week.weekNumber} up`}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveWeek(week.id, "down")}
                          aria-label={`Move week ${week.weekNumber} down`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {removeWeek && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-600"
                        onClick={() => removeWeek(week.id)}
                        aria-label={`Remove week ${week.weekNumber}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {/* Maybe add Edit button here if needed */}
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-blue-500 hover:text-blue-600"
                      // onClick={() => openAddWorkoutDialog(week.id, ???)} // Need workout type?
                     >
                      <Edit className="h-4 w-4" />
                    </Button> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
