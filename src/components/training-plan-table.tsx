// This file contains the TrainingPlanTable component
// Displays a table of training plans with filtering and sorting capabilities

"use client";

import React, { useState, useMemo, useCallback, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2, Pencil } from "lucide-react";
import { PhaseEditorDialog } from "@/components/phase-editor-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { WeekData as WeekDataType } from "@/types/training-plans";

// --- Types ---
export interface PhaseData {
  name: string;
  color: string;
}

export interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

export interface TrainingPlanTableProps {
  planData: ExtendedWeekData[];
  workoutTypes: WorkoutType[];
  removeWeek?: (weekId: number) => void;
  onMoveWeek?: (weekId: number, direction: "up" | "down") => void;
  readOnly?: boolean;
  onCellClick?: (weekId: number, workoutType: string) => void;
  onPhaseChange?: (weekId: number, phaseData: string | PhaseData) => void;
  onKeyDown?: (e: React.KeyboardEvent, weekId: number, workoutType: string) => void;
}

// Define the workouts type to handle both string and undefined values
type WorkoutsType = Record<string, string | undefined>;

export interface ExtendedWeekData extends Omit<WeekDataType, 'phase' | 'workouts'> {
  id: number;
  phase?: string | PhaseData;
  workouts: WorkoutsType;
  weekNumber: number;
  dateRange: string;
}

const TrainingPlanTable: React.FC<TrainingPlanTableProps> = ({
  planData = [],
  workoutTypes = [],
  removeWeek,
  onMoveWeek,
  readOnly = false,
  onCellClick,
  onPhaseChange,
  onKeyDown,
}) => {
  const [isPhaseEditorOpen, setIsPhaseEditorOpen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<{
    weekId: number;
    phase: string | PhaseData;
  } | null>(null);

  // Sort weeks by weekNumber
  const sortedWeeks = useMemo(() => {
    return [...planData].sort((a, b) => a.weekNumber - b.weekNumber);
  }, [planData]);

  // Get phase name from phase data (handles both string and PhaseData types)
  const getPhaseName = useCallback((phase: string | PhaseData | undefined): string => {
    if (!phase) return '';
    return typeof phase === 'string' ? phase : phase.name;
  }, []);

  // Get phase color from phase data (handles both string and PhaseData types)
  const getPhaseColor = useCallback((phase: string | PhaseData | undefined): string => {
    if (!phase) return 'bg-gray-100';
    return typeof phase === 'string' ? 'bg-blue-100' : phase.color || 'bg-gray-100';
  }, []);

  // Handle phase save from the dialog
  const handlePhaseSave = useCallback((phaseData: { name: string; color: string }) => {
    if (!currentPhase) return;
    
    onPhaseChange?.(currentPhase.weekId, phaseData);
    setIsPhaseEditorOpen(false);
    setCurrentPhase(null);
  }, [currentPhase, onPhaseChange]);

  // Handle phase cell click
  const handlePhaseClick = useCallback((weekId: number, currentPhase: string | PhaseData | undefined) => {
    if (readOnly || !onPhaseChange) return;
    
    setCurrentPhase({
      weekId,
      phase: currentPhase || { name: '', color: 'bg-blue-100' }
    });
    setIsPhaseEditorOpen(true);
  }, [readOnly, onPhaseChange]);

  // Get color class for phase display
  const getPhaseColorClass = useCallback((phase: string | PhaseData | undefined): string => {
    const color = getPhaseColor(phase);
    return cn(
      'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
      color,
      'text-foreground/80',
      { 'cursor-pointer hover:opacity-80 transition-opacity': !readOnly && onPhaseChange }
    );
  }, [getPhaseColor, readOnly, onPhaseChange]);

  // Handle workout cell click
  const handleWorkoutClick = useCallback((weekId: number, workoutType: string) => {
    if (!readOnly && onCellClick) {
      onCellClick(weekId, workoutType);
    }
  }, [onCellClick, readOnly]);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Phase</TableHead>
            {workoutTypes.map((type) => (
              <TableHead key={type.id}>{type.name}</TableHead>
            ))}
            {!readOnly && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedWeeks.map((week) => (
            <TableRow key={week.id}>
              <TableCell className="font-medium">{week.weekNumber}</TableCell>
              <TableCell>{week.dateRange}</TableCell>
              <TableCell>
                <div 
                  className={getPhaseColorClass(week.phase)}
                  onClick={() => handlePhaseClick(week.id, week.phase)}
                >
                  <div className="flex items-center gap-1">
                    {getPhaseName(week.phase) || 'Set Phase'}
                    {!readOnly && onPhaseChange && (
                      <Pencil className="h-3 w-3 opacity-70" />
                    )}
                  </div>
                </div>
              </TableCell>
              {workoutTypes.map((type) => (
                <TableCell 
                  key={type.id}
                  className={cn(
                    'cursor-pointer hover:bg-muted/50 transition-colors',
                    { 'cursor-default': readOnly }
                  )}
                  onClick={() => handleWorkoutClick(week.id, type.id)}
                  onKeyDown={(e) => onKeyDown?.(e, week.id, type.id)}
                  tabIndex={readOnly ? -1 : 0}
                >
                  {week.workouts[type.id] || '-'}
                </TableCell>
              ))}
              {!readOnly && (
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveWeek?.(week.id, 'up');
                      }}
                      disabled={week.weekNumber === 1}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveWeek?.(week.id, 'down');
                      }}
                      disabled={week.weekNumber === sortedWeeks.length}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWeek?.(week.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Phase Editor Dialog */}
      {currentPhase && (
        <PhaseEditorDialog
          isOpen={isPhaseEditorOpen}
          onClose={() => setIsPhaseEditorOpen(false)}
          initialPhase={typeof currentPhase.phase === 'string' ? currentPhase.phase : currentPhase.phase?.name || ''}
          initialColor={typeof currentPhase.phase === 'object' ? 
            currentPhase.phase.color.split(' ')[0].replace('bg-', '') : 'blue'}
          onSave={handlePhaseSave}
        />
      )}
    </div>
  );
};


// Export the component
export { TrainingPlanTable };
