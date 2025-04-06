"use client";

import { memo } from "react";
import type { WorkoutType } from "../types";

interface WorkoutTypeHeaderProps {
  type: WorkoutType;
}

export const WorkoutTypeHeader = memo(function WorkoutTypeHeader({
  type,
}: WorkoutTypeHeaderProps) {
  return (
    <th className="border-b p-2 text-left">
      <div
        className={`${type.color} ${type.textColor} text-xs font-medium px-3 py-1 rounded-full w-fit border border-${type.color}-200 dark:border-${type.color}-800`}
      >
        {type.name}
      </div>
    </th>
  );
});
