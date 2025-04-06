"use client";

import { memo } from "react";
import { WorkoutCell } from "./WorkoutCell";
import { PhaseIndicator } from "./PhaseIndicator";
import { DateRangeCell } from "./DateRangeCell";
import type { WorkoutType } from "../types";

/**
 * Props for the WeekRow component
 * @interface WeekRowProps
 * @property {number} index - The zero-based index of the week
 * @property {string} weekDates - The date range for this week (e.g., "5/24-5/30")
 * @property {string} phase - The training phase name for this week
 * @property {WorkoutType[]} workoutTypes - Array of workout type definitions
 * @property {(weekId: number, workoutType: string, value: string) => void} onWorkoutUpdate - Callback function to handle workout updates
 */
interface WeekRowProps {
  index: number;
  weekDates: string;
  phase: string;
  workoutTypes: WorkoutType[];
  onWorkoutUpdate: (weekId: number, workoutType: string, value: string) => void;
}

/**
 * WeekRow Component
 *
 * A memoized component that renders a single row in the training schedule table.
 * Each row represents a week and contains:
 * - Week number
 * - Date range
 * - Training phase indicator
 * - Workout cells for each workout type
 *
 * The component uses sticky positioning for the first three columns to keep them
 * visible while scrolling horizontally through workout types.
 *
 * @component
 * @param {WeekRowProps} props - The props for the WeekRow component
 * @returns {JSX.Element} A table row with week information and workout cells
 */
export const WeekRow = memo(function WeekRow({
  index,
  weekDates,
  phase,
  workoutTypes,
  onWorkoutUpdate,
}: WeekRowProps) {
  // Determine the phase color based on the week index
  // - Weeks 0-1: indigo (Transition weeks)
  // - Weeks 2-8: green (Summer weeks)
  // - Weeks 9+: amber (Cypress XC)
  const phaseColor = index < 2 ? "indigo" : index < 9 ? "green" : "amber";

  return (
    <tr className="hover:bg-muted/50">
      {/* Week Number Column - Sticky positioned */}
      <td className="sticky left-0 bg-background z-10 border-b p-2 font-medium">
        {index + 1}
      </td>

      {/* Date Range Column - Sticky positioned */}
      <td className="sticky left-[100px] bg-background z-10 border-b p-2">
        <DateRangeCell dates={weekDates} />
      </td>

      {/* Phase Indicator Column - Sticky positioned */}
      <td className="sticky left-[200px] bg-background z-10 border-b p-2">
        <PhaseIndicator phase={phase} color={phaseColor} />
      </td>

      {/* Workout Type Columns - One for each workout type */}
      {workoutTypes.map((type) => (
        <td key={type.id} className="border-b p-2">
          <WorkoutCell
            value=""
            bgColor={type.color}
            textColor={type.textColor}
            onClick={() => onWorkoutUpdate(index + 1, type.id, "")}
          />
        </td>
      ))}
    </tr>
  );
});
