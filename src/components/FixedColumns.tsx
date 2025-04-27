// FixedColumns.tsx
import React from "react";

interface WeekData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: { [key: string]: string | undefined };
}

interface FixedColumnsProps {
  planData: WeekData[];
  getSeasonPhaseColor: (phase: string) => string;
}

export const FixedColumns: React.FC<FixedColumnsProps> = ({ planData, getSeasonPhaseColor }) => {
  return (
    <div className="fixed-columns">
      {planData.map((week) => (
        <div
          key={week.id}
          className={`week-column ${getSeasonPhaseColor(week.seasonPhase)}`}
        >
          <p>{week.weekNumber}</p>
          <p>{week.dateRange}</p>
        </div>
      ))}
    </div>
  );
};