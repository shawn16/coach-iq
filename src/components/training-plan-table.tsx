// This file contains the TrainingPlanTable component
// Displays a table of training plans with filtering and sorting capabilities

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { PhaseData } from "@/components/phase-editor-dialog";
import { PhaseEditorDialog } from "@/components/phase-editor-dialog";
import type { WeekData as WeekDataType, WorkoutLibrary } from "@/types/training-plans";

// --- Types ---
/**
 * Represents the workouts for a single week, keyed by workout type ID
 */
type WeekWorkouts = WeekDataType['workouts'];

/**
 * Data structure for a single training week
 */
type WeekData = WeekDataType;

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
    containers.forEach((container) => {
      // Cast the Element to HTMLElement to access style property
      const htmlContainer = container as HTMLElement;
      if (htmlContainer && htmlContainer.style) {
        htmlContainer.style.scrollBehavior = "smooth";
      }
    });
  }, []);

  /**
   * Get color class for season phase
   * @param phase - The phase data or name
   * @returns CSS class for the phase color
   */
  const getSeasonPhaseColor = (phaseInput: WeekData['phase'] | string | undefined): string => {
    if (!phaseInput) return "bg-muted/50 text-foreground/80";
    
    let phaseName: string;
    let color: string | undefined;

    if (typeof phaseInput === 'object' && phaseInput !== null && 'name' in phaseInput) {
      phaseName = phaseInput.name;
      color = phaseInput.color;
    } else if (typeof phaseInput === 'string') {
      phaseName = phaseInput;
      // Attempt to derive color if only name is given (legacy or simplified usage)
      // This part might need adjustment based on how string-only phases are intended to be colored
      if (phaseName.includes("Transition")) color = "blue";
      else if (phaseName.includes("Summer")) color = "green";
      else if (phaseName.includes("OFF")) color = "red";
      else if (phaseName.includes("Relays") || phaseName.includes("Inv")) color = "purple";
      else color = "gray";
    } else {
      // Should not happen if types are correct, but as a fallback:
      return "bg-muted/50 text-foreground/80";
    }

    const finalColor = color || 'gray';
    return `bg-${finalColor}-50 dark:bg-${finalColor}-900/20 text-${finalColor}-800 dark:text-${finalColor}-300`;
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
  const getPhaseColorValue = (phaseInput: WeekData['phase'] | string): string => {
    if (!phaseInput) return "gray";
    
    if (typeof phaseInput === 'object' && phaseInput !== null && 'name' in phaseInput) {
      return phaseInput.color || "gray";
    }
    if (typeof phaseInput === 'string'){
      if (phaseInput.includes("Transition")) return "blue";
      if (phaseInput.includes("Summer")) return "green";
      if (phaseInput.includes("OFF")) return "red";
      if (phaseInput.includes("Relays") || phaseInput.includes("Inv")) return "purple";
    }
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
      <div className="flex border border-border rounded-lg overflow-hidden">
        {/* Fixed left columns */}
        <div className="flex flex-col border-r border-border">
          {/* Header */}
          <div className="flex bg-muted border-b border-border">
            <div className="w-12 p-3 text-xs font-medium text-foreground/80 uppercase text-center">
              Wk
            </div>
            <div className="w-28 p-3 text-xs font-medium text-foreground/80 uppercase text-center">
              Date Range
            </div>
            <div className="w-32 p-3 text-xs font-medium text-foreground/80 uppercase text-center">
              Phase
            </div>
          </div>
          {/* Body */}
          {planData.map((week) => (
            <div
              key={week.id}
              className="flex h-[57px] border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="w-12 p-3 text-sm text-foreground/80 flex items-center justify-center">
                {week.weekNumber}
              </div>
              <div className="w-28 p-3 text-sm text-foreground/80 flex items-center justify-center">
                {week.dateRange}
              </div>
              <div 
                className={`w-32 p-3 text-sm font-medium cursor-pointer flex items-center justify-center ${getSeasonPhaseColor(week.phase)}`}
                onDoubleClick={() => handlePhaseDoubleClick(week.id, week.phase?.name || "Base")}
              >
                {week.phase?.name || "Base"}
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable right columns */}
        <div className="flex-grow overflow-x-auto table-scroll-container">
          <div className="flex flex-col min-w-max">
            {/* Header */}
            <div className="flex bg-muted border-b border-border sticky top-0 z-10">
              {workoutTypes.map((type) => (
                <div
                  key={type.id}
                  className={`w-40 p-3 text-xs font-medium text-foreground/80 uppercase whitespace-nowrap text-center ${type.color}`}
                >
                  {type.name}
                </div>
              ))}
              {!readOnly && (
                <div className="w-20 p-3 text-xs font-medium text-foreground/80 uppercase text-center bg-background">
                  Actions
                </div>
              )}
            </div>
            {/* Body */}
            {planData.map((week, i) => (
              <div
                key={week.id}
                className="flex h-[57px] border-b border-border last:border-b-0"
              >
                {workoutTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`w-40 p-3 flex items-center justify-center ${
                      i % 2 === 0 ? 'bg-background' : 'bg-muted/50'
                    }`}
                    onClick={() => !readOnly && onCellClick && onCellClick(week.id, type.id)}
                    onKeyDown={(e) =>
                      !readOnly && onKeyDown && onKeyDown(e, week.id, type.id)
                    }
                    tabIndex={!readOnly ? 0 : -1}
                    role="gridcell"
                  >
                    <span className="text-sm text-muted-foreground">
                      {(week.workouts[type.id]?.length ?? 0) > 0 
                        ? week.workouts[type.id]?.[0]?.name 
                        : "Click to add workout"}
                    </span>
                  </div>
                ))}
                {!readOnly && (
                  <div className={`w-20 p-3 flex items-center justify-center space-x-1 ${
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/50'
                  }`}>
                    {onMoveWeek && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMoveWeek(week.id, "up")}
                          disabled={week.id === 1}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMoveWeek(week.id, "down")}
                          disabled={week.id === planData.length}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {removeWeek && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWeek(week.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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
