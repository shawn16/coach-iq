/**
 * TrainingPlanTable Component
 *
 * A complex table component for managing and displaying training plans.
 * Features a split layout with fixed and scrollable sections for optimal UX.
 *
 * Key Features:
 * - Fixed left columns (Week, Dates, Phase)
 * - Horizontally scrollable workout columns
 * - Inline cell editing
 * - Week reordering
 * - Workout type management
 * - Season phase color coding
 *
 * Data Structure:
 * - WeekData: Represents a week in the training plan
 * - WorkoutType: Defines different types of workouts
 * - TrainingPlanTableProps: Component interface
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { AddWorkoutDialog } from "@/components/add-workout-dialog";

/**
 * Defines the structure of a workout type
 * @property id - Unique identifier
 * @property name - Display name
 * @property color - Color code for visual representation
 */
interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

/**
 * Represents a week in the training plan
 * @property id - Unique identifier
 * @property weekNumber - Week number in the plan
 * @property dateRange - Date range for the week
 * @property seasonPhase - Current training phase
 * @property workouts - Map of workout types to their descriptions
 */
interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: Record<string, string>;
}

/**
 * Props interface for the TrainingPlanTable component
 * @property planData - Array of week data
 * @property workoutTypes - Available workout types
 * @property updateWorkout - Callback for updating workout details
 * @property removeWeek - Callback for removing a week
 * @property moveWeek - Callback for reordering weeks
 */
interface TrainingPlanTableProps {
  planData: WeekData[];
  workoutTypes: WorkoutType[];
  updateWorkout: (weekId: number, workoutType: string, value: string) => void;
  removeWeek: (weekId: number) => void;
  moveWeek: (weekId: number, direction: "up" | "down") => void;
}

export function TrainingPlanTable({
  planData,
  workoutTypes,
  updateWorkout,
  removeWeek,
  moveWeek,
}: TrainingPlanTableProps) {
  // State for managing cell editing
  const [editingCell, setEditingCell] = useState<{
    weekId: number;
    workoutType: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAddWorkoutDialog, setShowAddWorkoutDialog] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    weekId: number;
    workoutType: string;
  } | null>(null);

  /**
   * Applies smooth scrolling behavior to all scrollable containers
   * Runs once on component mount
   */
  useEffect(() => {
    const scrollContainers = document.querySelectorAll(
      ".table-scroll-container"
    );
    scrollContainers.forEach((container) => {
      (container as HTMLElement).style.scrollBehavior = "smooth";
    });
  }, []);

  /**
   * Handles cell click for editing
   * @param weekId - ID of the week
   * @param workoutType - Type of workout
   * @param currentValue - Current cell value
   */
  const handleCellClick = (
    weekId: number,
    workoutType: string,
    currentValue: string
  ) => {
    setEditingCell({ weekId, workoutType });
    setEditValue(currentValue || "");
  };

  /**
   * Handles cell blur event
   * Saves changes and exits edit mode
   */
  const handleCellBlur = () => {
    if (editingCell) {
      updateWorkout(editingCell.weekId, editingCell.workoutType, editValue);
      setEditingCell(null);
    }
  };

  /**
   * Handles keyboard events during cell editing
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCellBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  /**
   * Opens the add workout dialog
   * @param weekId - ID of the week
   * @param workoutType - Type of workout
   */
  const openAddWorkoutDialog = (weekId: number, workoutType: string) => {
    setSelectedCell({ weekId, workoutType });
    setShowAddWorkoutDialog(true);
  };

  /**
   * Handles adding a new workout
   * @param workout - Workout description
   */
  const handleAddWorkout = (workout: string) => {
    if (selectedCell) {
      updateWorkout(selectedCell.weekId, selectedCell.workoutType, workout);
    }
    setShowAddWorkoutDialog(false);
  };

  /**
   * Returns appropriate color classes based on season phase
   * @param phase - Season phase name
   * @returns Tailwind CSS classes for styling
   */
  const getSeasonPhaseColor = (phase: string) => {
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
        {/* Fixed columns section - Week, Dates, Phase */}
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

        {/* Scrollable columns section - Workouts and Actions */}
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
                <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center whitespace-nowrap w-[120px]">
                  Actions
                </div>
              </div>
            </div>

            {/* Scrollable data rows */}
            {planData.map((week) => (
              <div
                key={`scroll-${week.id}`}
                className="flex bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
              >
                {workoutTypes.map((type) => (
                  <div
                    key={`${week.id}-${type.id}`}
                    className="px-4 py-3 flex items-center w-[150px] h-14 cursor-pointer"
                    onClick={() =>
                      handleCellClick(
                        week.id,
                        type.id,
                        week.workouts[type.id] || ""
                      )
                    }
                  >
                    {editingCell?.weekId === week.id &&
                    editingCell?.workoutType === type.id ? (
                      <div className="flex w-full">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm">
                          {week.workouts[type.id] || ""}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddWorkoutDialog(week.id, type.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 py-3 flex items-center gap-2 w-[120px] h-14">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => moveWeek(week.id, "up")}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => moveWeek(week.id, "down")}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => removeWeek(week.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Workout Dialog */}
      <AddWorkoutDialog
        open={showAddWorkoutDialog}
        onOpenChange={setShowAddWorkoutDialog}
        onAddWorkout={handleAddWorkout}
      />
    </div>
  );
}
