"use client";

import { memo } from "react";

interface PhaseIndicatorProps {
  phase: string;
  color: "indigo" | "green" | "amber";
}

export const PhaseIndicator = memo(function PhaseIndicator({
  phase,
  color,
}: PhaseIndicatorProps) {
  return (
    <div
      className={`bg-${color}-100 dark:bg-${color}-900/30 text-${color}-800 dark:text-${color}-300 text-xs font-medium px-3 py-1 rounded-full w-fit border border-${color}-200 dark:border-${color}-800`}
    >
      {phase}
    </div>
  );
});
