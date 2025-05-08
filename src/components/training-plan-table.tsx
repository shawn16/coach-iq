// This file contains the TrainingPlanTable component
// Displays a table of training plans with filtering and sorting capabilities

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { PhaseData } from "@/components/phase-editor-dialog";
import { PhaseEditorDialog } from "@/components/phase-editor-dialog";

// --- Types ---
/**
 * Represents the workouts for a single week, keyed by workout type ID
 */
interface WeekWorkouts {
  [key: string]: string | undefined;
}

/**
 * Data structure for a single training week
 */
interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: WeekWorkouts;
}

/**
 * Represents a type of workout with display settings
 */
interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

// --- Component Props ---
/**
 * Props for the TrainingPlanTable component
 */
interface TrainingPlanTableProps {
  /** Array of week data objects to display in the table */
  planData: WeekData[];
  /** Types of workouts that can be assigned to each day */
  workoutTypes: WorkoutType[];
  /** Callback to remove a week from the plan */
  removeWeek?: (weekId: number) => void;
  /** Callback to reorder weeks in the plan */
  onMoveWeek?: (weekId: number, direction: "up" | "down") => void;
  /** When true, the table will be in read-only mode with no editing capabilities */
  readOnly?: boolean;
  /** Callback when a workout cell is clicked */
  onCellClick?: (weekId: number, workoutType: string) => void;
  /** Keyboard event handler for workout cells */
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement>,
    weekId: number,
    workoutType: string
  ) => void;
  /** Callback when a phase is changed */
  onPhaseChange?: (weekId: number, phaseData: PhaseData) => void;
}

/**
 * TrainingPlanTable component
 * Displays a table of training plans with weeks and workouts
 */
export function TrainingPlanTable({
  planData,
  workoutTypes,
  removeWeek,
  onMoveWeek,
  readOnly = false,
  onCellClick,
  onKeyDown,
  onPhaseChange,
}: TrainingPlanTableProps) {
  // State for phase editor dialog
  const [isPhaseEditorOpen, setIsPhaseEditorOpen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<{
    weekId: number;
    phase: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    // Add scroll behavior for table containers
    const containers = document.querySelectorAll('.table-scroll-container');
    containers.forEach((container: any) => {
      if (container && container.style) {
        container.style.scrollBehavior = "smooth";
      }
    });
  }, []);

  /**
   * Get color class for season phase
   * @param phase - The season phase string
   * @returns CSS class for the phase color
   */
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

  /**
   * Handle phase cell double click
   * @param weekId - The ID of the week
   * @param phase - The phase string
   */
  const handlePhaseDoubleClick = (weekId: number, phase: string) => {
    if (readOnly || !onPhaseChange) return;
    
    console.log("Phase double-clicked:", { weekId, phase }); // Debug log
    
    setCurrentPhase({
      weekId,
      phase,
      color: getPhaseColorValue(phase),
    });
    setIsPhaseEditorOpen(true);
  };

  /**
   * Convert the phase color class to a simple color value for the editor
   * @param phase - The phase string
   * @returns Color value
   */
  const getPhaseColorValue = (phase: string): string => {
    if (phase.includes("Transition")) return "blue";
    if (phase.includes("Summer")) return "green";
    if (phase.includes("OFF")) return "red";
    if (phase.includes("Relays") || phase.includes("Inv")) return "purple";
    return "gray";
  };

  /**
   * Handle phase save
   * @param phaseData - The new phase data
   */
  const handlePhaseSave = (phaseData: PhaseData) => {
    if (currentPhase && onPhaseChange) {
      onPhaseChange(currentPhase.weekId, phaseData);
    }
  };

  return (
    <div className="relative">
      {/* Phase Editor Dialog */}
      {currentPhase && (
        <PhaseEditorDialog
          isOpen={isPhaseEditorOpen}
          onClose={() => setIsPhaseEditorOpen(false)}
          onSave={handlePhaseSave}
          initialPhase={currentPhase.phase}
          initialColor={currentPhase.color}
        />
      )}

      {/* Table Structure */}
      <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Fixed left columns */}
        <div className="flex flex-col border-r border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 p-3 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase text-center">
              Wk
            </div>
            <div className="w-28 p-3 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
              Date Range
            </div>
            <div className="w-32 p-3 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
              Phase
            </div>
          </div>

          {/* Weeks Data */}
          <div className="flex flex-col flex-1">
            {planData.map((week, index) => (
              <div
                key={week.id}
                className="flex border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="w-12 p-3 font-medium text-gray-900 dark:text-gray-100 text-center bg-white dark:bg-gray-900">
                  {week.weekNumber}
                </div>
                <div className="w-28 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
                  {week.dateRange}
                </div>
                <div 
                  className={`w-32 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 ${!readOnly && onPhaseChange ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" : ""}`} 
                  onDoubleClick={() => handlePhaseDoubleClick(week.id, week.seasonPhase)}
                  onClick={() => !readOnly && onPhaseChange && handlePhaseDoubleClick(week.id, week.seasonPhase)}
                  title={!readOnly && onPhaseChange ? "Double-click to edit phase" : ""}
                >
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeasonPhaseColor(week.seasonPhase)}`}>
                    {week.seasonPhase}
                  </span>
                </div>
              </div>
            ))}
            {planData.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No weeks added yet. Click "Add Week" to get started.
              </div>
            )}
          </div>
        </div>

        {/* Scrollable right columns */}
        <div className="overflow-x-auto flex-1 table-scroll-container">
          <div className="inline-block min-w-full">
            {/* Header */}
            <div className="flex bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              {workoutTypes.map((type) => (
                <div
                  key={type.id}
                  className="w-[160px] min-w-[160px] max-w-[160px] p-3 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase"
                >
                  {type.name}
                </div>
              ))}
              {!readOnly && (
                <div className="w-[100px] min-w-[100px] max-w-[100px] p-3 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase text-center">
                  Actions
                </div>
              )}
            </div>

            {/* Weeks Data */}
            <div>
              {planData.map((week, index) => (
                <div
                  key={week.id}
                  className="flex border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  {/* Workout cells */}
                  {workoutTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`w-[160px] min-w-[160px] max-w-[160px] p-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 ${
                        !readOnly
                          ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          : ""
                      }`}
                      tabIndex={!readOnly ? 0 : undefined}
                      onClick={() => !readOnly && onCellClick?.(week.id, type.id)}
                      onKeyDown={(e) => !readOnly && onKeyDown?.(e, week.id, type.id)}
                    >
                      {week.workouts[type.id] ? (
                        <span className={type.color + " px-2 py-1 rounded text-xs"}>
                          {week.workouts[type.id]}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          Click to add workout
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Actions */}
                  {!readOnly && (
                    <div className="w-[100px] min-w-[100px] max-w-[100px] p-2 bg-white dark:bg-gray-900 flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => onMoveWeek?.(week.id, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => onMoveWeek?.(week.id, "down")}
                        disabled={index === planData.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                        onClick={() => removeWeek?.(week.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
