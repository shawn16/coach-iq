import { useState, useMemo } from "react";
import { Athlete, SortConfig, AthleteFilters } from "../types";
import { timeToSeconds } from "../utils/timeCalculations";

// Custom hook for filtering and sorting athletes
export function useAthleteFilters(athletes: Athlete[]) {
  const [filters, setFilters] = useState<AthleteFilters>({
    searchQuery: "",
    gradeFilter: "all",
  });

  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "lastName",
    direction: "asc",
  });

  // Function to handle sorting
  const handleSort = (column: SortConfig["column"]) => {
    setSortConfig((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Function to set the search query
  const setSearchQuery = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const setGradeFilter = (gradeFilter: string) => {
    setFilters((prev) => ({ ...prev, gradeFilter }));
  };

  // Function to filter and sort athletes
  const filteredAthletes = useMemo(() => {
    let filtered = athletes;

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        return fullName.includes(query);
      });
    }

    // Apply grade filter
    if (filters.gradeFilter !== "all") {
      filtered = filtered.filter(
        (athlete) => athlete.grade.toString() === filters.gradeFilter
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortConfig.column === "lastName") {
        return sortConfig.direction === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      }

      // Sort by grade
      if (sortConfig.column === "grade") {
        return sortConfig.direction === "asc"
          ? a.grade - b.grade
          : b.grade - a.grade;
      }

      // Sort by time1600m
      if (sortConfig.column === "time1600m") {
        const timeA = timeToSeconds(a.time1600m);
        const timeB = timeToSeconds(b.time1600m);
        return sortConfig.direction === "asc"
          ? timeA - timeB
          : timeB - timeA;
      }

      // Return 0 if no sorting is needed
      return 0;
    });
  }, [athletes, filters, sortConfig]);

  // Return the filtered athletes and functions for filtering and sorting
  return {
    filteredAthletes,
    searchQuery: filters.searchQuery,
    gradeFilter: filters.gradeFilter,
    sortConfig,
    setSearchQuery,
    setGradeFilter,
    handleSort,
  };
} 