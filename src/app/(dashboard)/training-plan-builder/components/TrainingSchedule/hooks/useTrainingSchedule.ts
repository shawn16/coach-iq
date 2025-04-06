"use client";

import { useMemo, useCallback } from "react";

/**
 * Custom hook for managing training schedule data and calculations
 *
 * This hook provides:
 * - Week date ranges
 * - Training phase determination
 * - Memoized calculations to prevent unnecessary recalculations
 *
 * @param {number} weeks - The total number of weeks in the training schedule
 * @returns {Object} An object containing:
 *   - weekDates: Record of week indices to date ranges
 *   - getPhase: Function to determine the training phase for a given week
 */
export function useTrainingSchedule(weeks: number) {
  /**
   * Memoized calculation of week date ranges
   *
   * Currently returns placeholder dates. In a production environment,
   * this should be replaced with actual date calculations based on:
   * - Start date of the training plan
   * - Week duration (typically 7 days)
   * - Any schedule adjustments or holidays
   *
   * @type {Record<number, string>}
   */
  const weekDates = useMemo(() => {
    const dates: Record<number, string> = {};
    for (let i = 0; i < weeks; i++) {
      dates[i] = "5/24-5/30"; // TODO: Replace with actual date calculations
    }
    return dates;
  }, [weeks]);

  /**
   * Determines the training phase for a given week index
   *
   * The training phases are:
   * - Weeks 0-1: Transition weeks
   * - Weeks 2-8: Summer weeks
   * - Weeks 9+: Cypress XC
   *
   * @param {number} weekIndex - The zero-based index of the week
   * @returns {string} The name of the training phase
   */
  const getPhase = useCallback((weekIndex: number) => {
    if (weekIndex < 2) return `Transition Week ${weekIndex + 1}`;
    if (weekIndex >= 2 && weekIndex <= 8) return `Summer Week ${weekIndex - 1}`;
    return "Cypress XC";
  }, []);

  return {
    weekDates,
    getPhase,
  };
}
