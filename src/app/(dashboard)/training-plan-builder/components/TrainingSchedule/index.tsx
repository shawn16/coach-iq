"use client";

import { WeekRow } from "./components/WeekRow";
import { WorkoutTypeHeader } from "./components/WorkoutTypeHeader";
import { useTrainingSchedule } from "./hooks/useTrainingSchedule";
import type { WorkoutType } from "./types";

/**
 * Props for the TrainingSchedule component
 * @interface TrainingScheduleProps
 * @property {number} weeks - The total number of weeks in the training schedule
 * @property {WorkoutType[]} workoutTypes - Array of workout type definitions
 * @property {(weekId: number, workoutType: string, value: string) => void} onWorkoutUpdate - Callback function to handle workout updates
 */
interface TrainingScheduleProps {
  weeks: number;
  workoutTypes: WorkoutType[];
  onWorkoutUpdate: (weekId: number, workoutType: string, value: string) => void;
}

/**
 * TrainingSchedule Component
 *
 * The main component for displaying the training schedule table.
 * Features:
 * - Sticky header and first three columns for better navigation
 * - Dynamic week rows based on the number of weeks
 * - Workout type columns for each defined workout type
 * - Responsive design with horizontal scrolling
 *
 * The table structure:
 * 1. Fixed columns (sticky):
 *    - Week number
 *    - Date range
 *    - Training phase
 * 2. Dynamic columns:
 *    - One column per workout type
 *
 * @component
 * @param {TrainingScheduleProps} props - The props for the TrainingSchedule component
 * @returns {JSX.Element} A responsive table displaying the training schedule
 */
export function TrainingSchedule({
  weeks,
  workoutTypes,
  onWorkoutUpdate,
}: TrainingScheduleProps) {
  // Get week dates and phase information from the custom hook
  const { weekDates, getPhase } = useTrainingSchedule(weeks);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {/* Week Number Column Header */}
            <th className="sticky left-0 bg-background z-10 border-b p-2 text-left">
              Week
            </th>

            {/* Date Range Column Header */}
            <th className="sticky left-[100px] bg-background z-10 border-b p-2 text-left">
              Dates
            </th>

            {/* Phase Column Header */}
            <th className="sticky left-[200px] bg-background z-10 border-b p-2 text-left">
              Phase
            </th>

            {/* Workout Type Column Headers */}
            {workoutTypes.map((type) => (
              <WorkoutTypeHeader key={type.id} type={type} />
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Generate a row for each week */}
          {Array.from({ length: weeks }).map((_, index) => (
            <WeekRow
              key={index}
              index={index}
              weekDates={weekDates[index]}
              phase={getPhase(index)}
              workoutTypes={workoutTypes}
              onWorkoutUpdate={onWorkoutUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
