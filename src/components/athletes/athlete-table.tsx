// This file defines the AthleteTable component, which is responsible for displaying a list of athletes in a table format.
// It provides features like sorting, filtering by grade, and displaying calculated data such as age and projected race times.
// The component is interactive, allowing users to sort columns, filter data, and perform actions like editing or deleting athletes.
// It integrates utility functions for calculations and formatting, ensuring data is presented in a user-friendly way.

"use client"; // This directive ensures the component is rendered on the client side, enabling interactivity.

import type React from "react";
import { useState } from "react"; // React hook for managing component state.
import { Badge } from "@/components/ui/badge"; // Badge component for displaying grade labels.
import { Button } from "@/components/ui/button"; // Button component for interactive actions.
import { ArrowUpDown, Trash2, Pencil } from "lucide-react"; // Icons for sorting and action buttons.
import { format } from "date-fns"; // Utility for formatting dates.
import { cn } from "@/lib/utils"; // Utility for conditionally combining class names.
import { AthleteDisplay } from "@/types/athlete"; // Type definition for AthleteDisplay to ensure type safety.

interface AthleteTableProps {
  athletes: AthleteDisplay[]; // List of athletes to display in the table.
  sortColumn: keyof AthleteDisplay | null; // The column currently used for sorting.
  sortDirection: "asc" | "desc"; // The direction of sorting (ascending or descending).
  calculateAge: (birthday: string | Date) => number | null; // Function to calculate an athlete's age based on their birthday.
  calculateProjectedTimes: (time1600m: string) => {
    time5k: string;
    time3200m: string;
    time800m: string;
  }; // Function to calculate projected race times based on the 1600m time.
  onSort: (column: keyof AthleteDisplay) => void; // Callback for handling column sorting.
  onRowClick: (athlete: AthleteDisplay) => void; // Callback for handling row clicks.
  onDeleteClick: (athlete: AthleteDisplay, e: React.MouseEvent) => void; // Callback for handling delete button clicks.
  onEditClick: (athlete: AthleteDisplay, e: React.MouseEvent) => void; // Callback for handling edit button clicks.
}

export function AthleteTable({
  athletes,
  sortColumn,
  sortDirection,
  calculateAge,
  calculateProjectedTimes,
  onSort,
  onRowClick,
  onDeleteClick,
  onEditClick,
}: AthleteTableProps) {
  // State to manage the selected grade filter.
  // This allows users to filter the table by grade level.
  const [filterGrade, setFilterGrade] = useState<string | null>(null);

  // Filter the list of athletes based on the selected grade.
  // If no grade is selected, all athletes are displayed.
  const filteredAthletes = filterGrade
    ? athletes.filter((athlete) => athlete.grade === filterGrade)
    : athletes;

  // Helper function to render sortable table headers.
  // This function adds sorting functionality to specific columns.
  const renderSortableHeader = (
    columnKey: keyof AthleteDisplay,
    label: string
  ) => {
    // Determine if the column is sortable.
    const isSortable = ["last_name", "grade", "time1600m"].includes(
      columnKey as string
    );
    // Check if the column is currently sorted.
    const isSorted = sortColumn === columnKey;

    return (
      <th scope="col" className="px-4 py-3 whitespace-nowrap">
        {isSortable ? (
          <Button
            variant="ghost"
            onClick={() => onSort(columnKey)}
            className="p-0 h-auto"
          >
            {label}
            <ArrowUpDown
              className={cn(
                "ml-1 h-4 w-4 shrink-0 opacity-50 transition-transform",
                isSorted && "opacity-100",
                isSorted && sortDirection === "desc" && "rotate-180"
              )}
            />
          </Button>
        ) : (
          label
        )}
      </th>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Filter section for selecting a grade. */}
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="grade-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by Grade:
        </label>
        <select
          id="grade-filter"
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2"
          value={filterGrade || ""}
          onChange={(e) => setFilterGrade(e.target.value || null)}
        >
          <option value="">All Grades</option>
          {[...new Set(athletes.map((athlete) => athlete.grade))].map((grade) => (
            <option key={grade} value={grade}>
              {grade}th
            </option>
          ))}
        </select>
      </div>

      {/* Table displaying athlete data. */}
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            {renderSortableHeader("last_name", "Last Name")}
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              First Name
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Birthday
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Age
            </th>
            {renderSortableHeader("grade", "Grade")}
            {renderSortableHeader("time1600m", "1600m Time")}
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 5K
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 3200m
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 800m
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAthletes.map((athlete) => {
            // Calculate projected race times based on the athlete's 1600m time.
            const projectedTimes = calculateProjectedTimes(athlete.time1600m);
            // Calculate the athlete's age based on their birthday.
            // First ensure we have a proper Date object
            const birthDateObj = typeof athlete.birthday === "string" 
                ? new Date(athlete.birthday) 
                : athlete.birthday;
            
            const age = calculateAge(birthDateObj);

            // Format the athlete's birthday for display.
            const formattedBirthday =
              birthDateObj instanceof Date && !isNaN(birthDateObj.getTime())
                ? format(birthDateObj, "MM/dd/yyyy")
                : "N/A";

            console.log("Athlete time1600m:", athlete.time1600m); // Debug log to verify time1600m value

            return (
              <tr
                key={athlete.id}
                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                onClick={() => onRowClick(athlete)}
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {athlete.last_name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {athlete.first_name}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {formattedBirthday}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {age !== null ? age : "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <Badge variant="secondary" className="font-normal">
                    {athlete.grade}th
                  </Badge>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {athlete.time1600m === "0:00.00" ? "—" : athlete.time1600m}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {projectedTimes.time5k}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {projectedTimes.time3200m}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {projectedTimes.time800m}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-1">
                    {/* Edit button to trigger the onEditClick callback. */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onEditClick(athlete, e)}
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      aria-label={`Edit ${athlete.first_name} ${athlete.last_name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* Delete button to trigger the onDeleteClick callback. */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onDeleteClick(athlete, e)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label={`Delete ${athlete.first_name} ${athlete.last_name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
          {filteredAthletes.length === 0 && (
            <tr>
              <td
                colSpan={10}
                className="py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No athletes found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Next Step Suggestion: Add pagination or infinite scrolling to handle large datasets efficiently.
}

// Common Beginner Mistake: Forgetting to handle cases where athlete data is null or undefined.
// Always validate data before using it to avoid runtime errors.
