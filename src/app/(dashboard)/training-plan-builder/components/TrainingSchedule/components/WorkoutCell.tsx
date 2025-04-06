"use client";

import { memo } from "react";

interface WorkoutCellProps {
  value: string;
  bgColor: string;
  textColor: string;
  onClick?: () => void;
}

export const WorkoutCell = memo(function WorkoutCell({
  value,
  bgColor,
  textColor,
  onClick,
}: WorkoutCellProps) {
  if (!value) {
    return (
      <div
        className="text-muted-foreground text-xs cursor-pointer hover:text-foreground"
        onClick={onClick}
      >
        Click to add workout
      </div>
    );
  }

  return (
    <div
      className={`${bgColor} ${textColor} text-xs font-medium px-3 py-1 rounded-full w-fit border border-${bgColor}-200 dark:border-${bgColor}-800`}
    >
      {value}
    </div>
  );
});
