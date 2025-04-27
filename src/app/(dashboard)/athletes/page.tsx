// This file defines the main component for the Athletes page in the application.
// It provides a user interface for managing and viewing athlete data, including features for searching, filtering, sorting, and deleting athletes.
// The component integrates various custom hooks and UI components to handle data fetching, state management, and user interactions.
// It also includes error handling and loading states to ensure a smooth user experience.
// This page is a key part of the dashboard, enabling users to efficiently manage athlete information.

// "use client" directive is required for client-side rendering in Next.js.
// This ensures that the component is rendered on the client side, which is necessary for interactive features like state management and event handling.
"use client";

import React, { useState } from "react"; // Import React and useState
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddAthleteDialog } from "@/components/dialogs/add-athlete-dialog";
import { useAthletes } from "./useAthletes";
import { useAthleteFilters } from "./useAthleteFilters";
import { AthleteTable } from "@/components/athletes/athlete-table"; 
import { DeleteAthleteDialog } from "./DeleteAthleteDialog";
import { calculateProjectedTimes, timeStringToMs } from "@/lib/time-utils";
import { calculateAge } from "@/lib/utils";
import { EditAthleteDialog } from "@/components/dialogs/edit-athlete-dialog";
import { AthleteDisplay } from "@/types/athlete"; // Import the AthleteDisplay type

// Main component for the Athletes page.
// This component provides a user interface for managing and viewing athlete data.
export default function AthletesPage() {
  // Destructure state and functions from the useAthletes hook.
  // This hook handles fetching athlete data and managing loading/error states.
  const { athletes, isLoading, error, fetchAthletes } = useAthletes();

  // Destructure state and functions from the useAthleteFilters hook.
  // This hook handles filtering and sorting of athlete data based on user input.
  const {
    searchQuery,
    setSearchQuery,
    selectedGrade,
    handleGradeSelect,
    sortField,
    sortDirection,
    handleSort,
    sortedAthletes,
  } = useAthleteFilters(athletes);

  // State for managing the visibility of the delete confirmation dialog.
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // State for storing the athlete to be deleted.
  const [athleteToDelete, setAthleteToDelete] = useState<AthleteDisplay | null>(null);

  // State for storing the athlete to be edited and dialog visibility
  const [athleteToEdit, setAthleteToEdit] = useState<AthleteDisplay | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // State for tracking the deletion process.
  const [isDeleting, setIsDeleting] = useState(false);

  // Handles the delete button click for an athlete.
  // This function sets the athlete to be deleted and opens the delete confirmation dialog.
  const handleDeleteClick = (athlete: AthleteDisplay, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the row click event from triggering.
    setAthleteToDelete(athlete);
    setIsDeleteDialogOpen(true);
  };

  // Handles the edit button click for an athlete.
  // This function sets the athlete to be edited.
  const handleEditClick = (athlete: AthleteDisplay, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the row click event from triggering.
    setAthleteToEdit(athlete);
    setIsEditDialogOpen(true);
  };

  // Confirms the deletion of an athlete.
  // This function sends a DELETE request to the API and refreshes the athlete list on success.
  const confirmDelete = async () => {
    if (!athleteToDelete) return; // Exit if no athlete is selected for deletion.

    setIsDeleting(true); // Indicate that the deletion process is in progress.

    try {
      // Send a DELETE request to the API endpoint for the selected athlete.
      const response = await fetch(`/api/athletes/${athleteToDelete.id}`, {
        method: "DELETE",
      });

      // Check if the response indicates a failure.
      if (!response.ok) {
        throw new Error(`Failed to delete athlete (HTTP ${response.status})`);
      }

      // Close the delete dialog and refresh the athlete list.
      setIsDeleteDialogOpen(false);
      setAthleteToDelete(null);
      fetchAthletes(); // Refresh the list of athletes.
    } catch (err) {
      // Log any errors that occur during the deletion process.
      console.error("Failed to delete athlete:", err);
    } finally {
      setIsDeleting(false); // Indicate that the deletion process is complete.
    }
  };

  // Create adapter functions to fix TypeScript errors

  // Adapter for onSort
  const handleSortAdapter = (column: keyof AthleteDisplay) => {
    // Map from AthleteDisplay keys to useAthleteFilters sort field
    if (column === "time1600m") {
      handleSort("time_1600m");
    } else if (column === "last_name" || column === "grade") {
      handleSort(column);
    }
  };

  // Adapter for calculateProjectedTimes
  const calculateProjectedTimesAdapter = (time1600m: string) => {
    // Convert string time to milliseconds before calling calculateProjectedTimes
    const timeMs = timeStringToMs(time1600m);
    return calculateProjectedTimes(timeMs);
  };

  // Adapter for calculateAge
  const calculateAgeAdapter = (birthday: string | Date) => {
    // Ensure we can handle both string and Date objects
    if (typeof birthday === "string") {
      return calculateAge(new Date(birthday));
    }
    return calculateAge(birthday);
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header section with title and description */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Athletes</h1>
        <p className="text-muted-foreground">
          Manage and view athlete information and projected race times
        </p>
      </div>

      {/* Card section containing search, filters, and actions */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
          {/* Search input for filtering athletes by name */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search athletes..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Dropdown menu for grade selection and action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[150px] justify-between"
                >
                  {selectedGrade}
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                {[
                  "All Grades",
                  "9th",
                  "10th",
                  "11th",
                  "12th",
                ].map((grade) => (
                  <DropdownMenuItem
                    key={grade}
                    onClick={() => handleGradeSelect(grade)}
                  >
                    {grade}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export button (currently non-functional) */}
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>

            {/* Dialog for adding a new athlete */}
            <AddAthleteDialog onAthleteAdded={fetchAthletes} />
          </div>
        </div>

        {/* Table section for displaying athlete data */}
        <div className="relative overflow-auto">
          {isLoading ? (
            // Loading spinner displayed while data is being fetched
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            // Error message displayed if data fetching fails
            <div className="text-center py-16 text-red-600 dark:text-red-400">
              <p className="mb-2 font-medium">Failed to load athletes</p>
              <p className="text-sm mb-4">Error: {error}</p>
              <Button variant="outline" size="sm" onClick={fetchAthletes}>
                Retry
              </Button>
            </div>
          ) : (
            // Athlete table displayed when data is successfully fetched
            <AthleteTable
              athletes={sortedAthletes}
              sortColumn={sortField === "time_1600m" ? "time1600m" as keyof AthleteDisplay : sortField as keyof AthleteDisplay}
              sortDirection={sortDirection}
              onSort={handleSortAdapter}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
              onRowClick={() => {}} // Add empty function for row click
              calculateProjectedTimes={calculateProjectedTimesAdapter}
              calculateAge={calculateAgeAdapter}
            />
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <DeleteAthleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        error={null}
        athleteName={
          athleteToDelete
            ? `${athleteToDelete.first_name} ${athleteToDelete.last_name}`
            : null
        }
      />

      {/* Edit athlete dialog */}
      {athleteToEdit && (
        <EditAthleteDialog
          athlete={{
            id: athleteToEdit.id,
            first_name: athleteToEdit.first_name,
            last_name: athleteToEdit.last_name,
            birthday: athleteToEdit.birthday,
            grade: athleteToEdit.grade,
            time_1600m: timeStringToMs(athleteToEdit.time1600m)
          }}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setAthleteToEdit(null);
          }}
          onAthleteUpdated={() => {
            fetchAthletes();
            setIsEditDialogOpen(false);
            setAthleteToEdit(null);
          }}
        />
      )}
    </div>
  );

  // Next Step Suggestion: Add error handling for failed API requests to improve user experience.
}

// Common Beginner Mistake: Forgetting to handle null or undefined values for athlete data.
// Always validate data before using it to avoid runtime errors.
