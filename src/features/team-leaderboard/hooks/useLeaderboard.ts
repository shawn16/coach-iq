/**
 * useLeaderboard Custom Hook
 *
 * A comprehensive hook that manages the state and logic for the Team Leaderboard.
 * This hook handles:
 * - Filtering athletes by group and search query
 * - Sorting athletes by various metrics
 * - Tracking date ranges for performance periods
 * - Identifying top performers and areas of concern
 * - Managing UI state for visual indicators
 *
 * The hook is designed to be performant with memoized computations and
 * provides a clean interface for the leaderboard component to consume.
 */

import { useState, useMemo } from "react";
import {
  Athlete,
  SortColumn,
  SortDirection,
  AthleteGroup,
  Metric,
  DateRangeType,
} from "../types";
import { DateRange } from "react-day-picker";

interface UseLeaderboardProps {
  athletes: Athlete[]; // Array of athlete data to be displayed and managed
}

export function useLeaderboard({ athletes }: UseLeaderboardProps) {
  // Filter State
  const [athleteGroup, setAthleteGroup] = useState<AthleteGroup>("all");
  const [metric, setMetric] = useState<Metric>("volume");
  const [dateRange, setDateRange] = useState<DateRangeType>("this-week");
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");

  // Sort State
  const [sortColumn, setSortColumn] = useState<SortColumn>("volume");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  /**
   * Memoized computation of top 3 athletes by volume
   * This is independent of current filters to always highlight top performers
   * Used for visual indicators in the UI (green background)
   */
  const topVolumeAthletes = useMemo(() => {
    return [...athletes]
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 3)
      .map((athlete) => athlete.id);
  }, [athletes]);

  /**
   * Memoized computation of filtered and sorted athletes
   * Applies both filtering and sorting in a single pass for better performance
   *
   * Filtering:
   * - By group (if not "all")
   * - By name search (case-insensitive)
   *
   * Sorting:
   * - Handles all sortable columns
   * - Case-insensitive for text columns
   * - Numeric comparison for metric columns
   * - Maintains stable sort order
   */
  const filteredAthletes = useMemo(() => {
    return [...athletes]
      .filter((athlete) => {
        // Apply group and search filters
        const matchesGroup =
          athleteGroup === "all" ||
          athlete.group.toLowerCase().includes(athleteGroup.toLowerCase());
        const matchesSearch = athlete.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesGroup && matchesSearch;
      })
      .sort((a, b) => {
        let valueA, valueB;

        // Extract comparable values based on sort column
        switch (sortColumn) {
          case "name":
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          case "group":
            valueA = a.group.toLowerCase();
            valueB = b.group.toLowerCase();
            break;
          case "volume":
            valueA = a.volume;
            valueB = b.volume;
            break;
          case "completion":
            valueA = a.completion;
            valueB = b.completion;
            break;
          case "accuracy":
            valueA = a.accuracy;
            valueB = b.accuracy;
            break;
          default:
            valueA = a.volume;
            valueB = b.volume;
        }

        // Apply sort direction
        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
      });
  }, [athletes, athleteGroup, searchQuery, sortColumn, sortDirection]);

  /**
   * Handles column header clicks for sorting
   * - Toggles direction if clicking the same column
   * - Sets new column and appropriate default direction if clicking a different column
   * - Text columns (name, group) default to ascending
   * - Metric columns default to descending
   */
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      if (column === "name" || column === "group") {
        setSortDirection("asc");
      } else {
        setSortDirection("desc");
      }
    }
  };

  /**
   * Determines the CSS classes for row styling based on athlete performance
   * Priority order:
   * 1. Low completion (red background) - needs immediate attention
   * 2. Top volume (green background) - highlight high performers
   *
   * Classes include dark mode variants and hover states
   */
  const getRowClassName = (athlete: Athlete) => {
    if (athlete.completion < 70) {
      return "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30";
    }
    if (topVolumeAthletes.includes(athlete.id)) {
      return "bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30";
    }
    return "";
  };

  // Return all state, setters, and utility functions
  return {
    // Filter state and setters
    athleteGroup,
    setAthleteGroup,
    metric,
    setMetric,
    dateRange,
    setDateRange,
    customDateRange,
    setCustomDateRange,
    searchQuery,
    setSearchQuery,
    // Sort state and handlers
    sortColumn,
    sortDirection,
    handleSort,
    // Computed data
    filteredAthletes,
    // Utility functions
    getRowClassName,
    topVolumeAthletes,
  };
}
