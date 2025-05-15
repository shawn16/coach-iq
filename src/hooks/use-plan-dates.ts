import { useState, useEffect } from "react";
import { differenceInWeeks } from "date-fns";
import type { WeekData } from "@/types/training-plans";
import { generateInitialPlanData } from "@/lib/training/plan-utils";

// Custom hook to manage plan dates and week calculations
export function usePlanDates(initialStartDate: Date, initialEndDate: Date) {
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [weeks, setWeeks] = useState<number>(0);
  const [planData, setPlanData] = useState<WeekData[]>([]);

  // Calculate weeks when dates change
  useEffect(() => {
    const calculateWeeks = (start: Date, end: Date) => {
      if (start && end && start.getTime() < end.getTime()) {
        return differenceInWeeks(end, start);
      }
      return 0;
    };

    const calculatedWeeks = calculateWeeks(startDate, endDate);
    setWeeks(calculatedWeeks);
  }, [startDate, endDate]);

  // Update plan data when weeks or startDate changes
  useEffect(() => {
    setPlanData(generateInitialPlanData(weeks, startDate));
  }, [weeks, startDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    weeks,
    planData,
    setPlanData,
  };
}
