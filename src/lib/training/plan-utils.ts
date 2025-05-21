import { addWeeks, format } from "date-fns";
import type { WeekData as BaseWeekData } from "@/types/training-plans";

type WeekData = BaseWeekData & {
  phase?: {
    name: string;
    color: string;
  } | string;
};

export function generateInitialPlanData(weeks: number, startDate: Date = new Date()): WeekData[] {
  const data: WeekData[] = [];
  for (let i = 0; i < weeks; i++) {
    const weekStartDate = addWeeks(startDate, i);
    const weekEndDate = addWeeks(weekStartDate, 1);
    weekEndDate.setDate(weekEndDate.getDate() - 1); // End date should be the last day of the week
    data.push({
      id: i + 1,
      weekNumber: i + 1, // Week number as a number
      dateRange: `${format(weekStartDate, "M/d")}-${format(weekEndDate, "M/d")}`, // Format with a hyphen between dates
      seasonPhase: "Base",
      phase: {
        name: "Base",
        color: "blue"
      },
      workouts: {},
    });
  }
  return data;
}
