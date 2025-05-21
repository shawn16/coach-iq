// This file defines a custom React hook, `useAthleteFilters`, which provides functionality for filtering and sorting a list of athletes.
// It allows users to filter athletes by name and grade, and sort them by attributes such as last name, grade, or 1600m time.
// The hook manages state for search queries, grade selection, and sorting preferences, making it reusable and easy to integrate into components.
// It also includes logic to handle edge cases, such as missing or invalid data, ensuring robust and predictable behavior.
// This hook is particularly useful for building user interfaces that require dynamic filtering and sorting of athlete data.

import { useState, useEffect } from "react"; // Importing React's useState and useEffect hooks to manage component state and side effects.
import { Athlete } from "./useAthletes"; // Importing the Athlete type definition for type safety and consistency.
import { AthleteDisplay } from "@/types/athlete";
import { msToTimeString } from "@/lib/time-utils";

// Custom hook to manage filtering and sorting of athletes
// Hooks are reusable functions that encapsulate logic and state management in React.
// Function to convert Athlete to AthleteDisplay
const toAthleteDisplay = (athlete: Athlete): AthleteDisplay => {
  return {
    ...athlete,
    id: parseInt(athlete.id, 10), // Convert string ID to number for AthleteDisplay
    time1600m: msToTimeString(athlete.time_1600m) // Use time_1600m from Athlete and convert to formatted string
  };
};

export function useAthleteFilters(athletes: Athlete[]) {
  // Convert athletes to AthleteDisplay format when they are loaded
  const [athleteDisplays, setAthleteDisplays] = useState<AthleteDisplay[]>([]);

  useEffect(() => {
    if (athletes && athletes.length > 0) {
      setAthleteDisplays(athletes.map(toAthleteDisplay));
    } else {
      setAthleteDisplays([]);
    }
  }, [athletes]);
  // State for search query, which allows users to filter athletes by name.
  const [searchQuery, setSearchQuery] = useState(""); // Starts as an empty string since no search is applied initially.

  // State for grade filter, which allows users to filter athletes by their grade level.
  const [selectedGrade, setSelectedGrade] = useState<string>("All Grades"); // Default is "All Grades" to show all athletes.

  // State for sorting field, which determines the attribute used for sorting athletes.
  const [sortField, setSortField] = useState<"last_name" | "grade" | "time1600m">("last_name"); // Default is "last_name" for alphabetical sorting.

  // State for sorting direction, which determines whether sorting is ascending or descending.
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Default is ascending order.

  // Filter athletes based on search query and selected grade
  // This ensures that only athletes matching the search and grade criteria are displayed.
  const filteredAthletes = Array.isArray(athleteDisplays) // Check if athletes is an array to avoid runtime errors.
    ? athleteDisplays.filter((athlete) => {
        // Check if the athlete's name matches the search query (case-insensitive).
        const nameMatch =
          athlete.first_name && athlete.last_name // Ensure both first and last names exist to avoid errors.
            ? `${athlete.first_name} ${athlete.last_name}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) // Convert both to lowercase for case-insensitive comparison.
            : false; // If names are missing, return false.

        // Check if the athlete's grade matches the selected grade.
        const gradeMatch =
          selectedGrade === "All Grades" || // If "All Grades" is selected, include all athletes.
          (athlete.grade !== null &&
            athlete.grade !== undefined && // Ensure grade is not null or undefined to avoid errors.
            athlete.grade.toString() === selectedGrade.replace(/\D/g, "")); // Remove non-numeric characters for comparison.

        return nameMatch && gradeMatch; // Include the athlete only if both conditions are true.
      })
    : []; // If athletes is not an array, return an empty array.

  // Sort the filtered athletes
  // Sorting ensures that the displayed athletes are ordered based on the selected field and direction.
  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // Convert time1600m to number for proper comparison
    if (sortField === 'time1600m') {
      // For time strings like "4:30.00", we need to convert them to milliseconds for proper comparison
      if (typeof valA === 'string') {
        const [minutes, seconds] = valA.split(':').map(Number);
        valA = minutes * 60 + seconds;
      }
      if (typeof valB === 'string') {
        const [minutes, seconds] = valB.split(':').map(Number);
        valB = minutes * 60 + seconds;
      }
    }

    // Handle null/undefined values
    if (valA == null) return sortDirection === "asc" ? -1 : 1;
    if (valB == null) return sortDirection === "asc" ? 1 : -1;

    // Compare values based on type
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortDirection === "asc" 
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });

  // Handle column sort
  // This function updates the sorting field and direction based on user interaction.
  const handleSort = (field: "last_name" | "grade" | "time1600m") => {
    if (field === sortField) {
      // If the same field is clicked, toggle the sorting direction.
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a new field is clicked, set it as the sorting field and reset direction to ascending.
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle grade filter selection
  // This function updates the selected grade based on user input.
  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade); // Update the selected grade state.
  };

  // Return the state and functions so they can be used in components.
  return {
    searchQuery, // Current search query.
    setSearchQuery, // Function to update the search query.
    selectedGrade, // Currently selected grade.
    handleGradeSelect, // Function to update the selected grade.
    sortField, // Current sorting field.
    sortDirection, // Current sorting direction.
    handleSort, // Function to update sorting field and direction.
    sortedAthletes, // Final list of athletes after filtering and sorting.
  };

  // Next Step Suggestion: Add memoization to optimize filtering and sorting for large datasets.
  // Memoization can prevent unnecessary recalculations and improve performance.
}

// Common Beginner Mistake: Forgetting to handle cases where athlete data is null or undefined.
// Always validate data before using it to avoid runtime errors.