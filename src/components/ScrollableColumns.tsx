// ScrollableColumns.tsx
import React from "react";

interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: { [key: string]: string | undefined };
}

interface WorkoutType {
  id: string;
  name: string;
  color: string;
}

interface ScrollableColumnsProps {
  planData: WeekData[];
  workoutTypes: WorkoutType[];
  readOnly?: boolean;
  onCellClick?: (weekId: number, workoutType: string) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement>,
    weekId: number,
    workoutType: string
  ) => void;
  moveWeek?: (weekId: number, direction: "up" | "down") => void;
  removeWeek?: (weekId: number) => void;
}

export const ScrollableColumns: React.FC<ScrollableColumnsProps> = ({
  planData,
  workoutTypes,
  readOnly,
  onCellClick,
  onKeyDown,
  moveWeek,
  removeWeek,
}) => {
  return (
    <div className="scrollable-columns">
      {planData.map((week) => (
        <div key={week.id} className="week-row">
          {workoutTypes.map((workout) => (
            <div
              key={workout.id}
              className="workout-cell"
              onClick={() => onCellClick?.(week.id, workout.name)}
              onKeyDown={(event) => onKeyDown?.(event, week.id, workout.name)}
            >
              <p>{workout.name}</p>
            </div>
          ))}
          {!readOnly && (
            <div className="actions">
              <button onClick={() => moveWeek?.(week.id, "up")}>Move Up</button>
              <button onClick={() => moveWeek?.(week.id, "down")}>Move Down</button>
              <button onClick={() => removeWeek?.(week.id)}>Remove</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};