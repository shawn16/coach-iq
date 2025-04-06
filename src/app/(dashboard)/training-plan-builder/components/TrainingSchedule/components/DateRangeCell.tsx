"use client";

import { memo } from "react";

interface DateRangeCellProps {
  dates: string;
}

export const DateRangeCell = memo(function DateRangeCell({
  dates,
}: DateRangeCellProps) {
  return <div className="text-sm text-muted-foreground">{dates}</div>;
});
