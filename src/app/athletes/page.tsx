"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, UserPlus } from "lucide-react";
import { differenceInYears } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AthleteProfileDialog } from "@/components/athlete-profile-dialog";
import { AddAthleteDialog } from "@/components/add-athlete-dialog";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { EditAthleteDialog } from "@/components/edit-athlete-dialog";
import { AthleteTable } from "@/components/athletes/athlete-table";
import { AthleteDisplay, ProjectedTimes, AthleteInput } from "@/types/athlete";
import {
  msToTimeString,
  timeStringToMs,
  calculateProjectedTimes as calculateProjectedTimesFromMs,
} from "@/lib/time-utils";
import {
  addAthleteAction,
  deleteAthleteAction,
  updateAthleteAction,
} from "./actions";
import { createClient } from "@/utils/supabase/client";

export default function AthletesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof AthleteDisplay | null>(
    "last_name"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  // State for athlete data (initially empty)
  const [athletes, setAthletes] = useState<AthleteDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for athlete profile dialog
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteDisplay | null>(
    null
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedAthleteTimes, setSelectedAthleteTimes] =
    useState<ProjectedTimes | null>(null);

  // State for add athlete dialog
  const [isAddAthleteOpen, setIsAddAthleteOpen] = useState(false);

  // State for delete confirmation dialog
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<AthleteDisplay | null>(
    null
  );

  // State for edit athlete dialog
  const [isEditAthleteOpen, setIsEditAthleteOpen] = useState(false);
  const [athleteToEdit, setAthleteToEdit] = useState<AthleteDisplay | null>(
    null
  );

  // Fetch athletes from Supabase
  useEffect(() => {
    async function fetchAthletes() {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("athletes")
          .select("*")
          .order("last_name", { ascending: true });

        if (error) {
          throw error;
        }

        // Convert database format to display format
        const displayAthletes: AthleteDisplay[] = data.map((athlete) => ({
          id: athlete.id,
          first_name: athlete.first_name,
          last_name: athlete.last_name,
          birthday: athlete.birthday,
          grade: athlete.grade,
          time1600m: msToTimeString(athlete.time_1600m),
          created_at: athlete.created_at,
          updated_at: athlete.updated_at,
        }));

        setAthletes(displayAthletes);
      } catch (error) {
        console.error("Error fetching athletes:", error);
        setError(
          typeof error === "object" && error !== null && "message" in error
            ? (error.message as string)
            : "Failed to load athletes"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchAthletes();
  }, []);

  // --- Utility Functions ---

  const calculateAge = (birthday: string | Date): number | null => {
    try {
      const birthDate =
        typeof birthday === "string" ? new Date(birthday) : birthday;
      return differenceInYears(new Date(), birthDate);
    } catch {
      return null;
    }
  };

  // Function to calculate projected times from display format
  const calculateProjectedTimes = (time1600m: string): ProjectedTimes => {
    // Convert display format to milliseconds first
    const timeInMs = timeStringToMs(time1600m);
    return calculateProjectedTimesFromMs(timeInMs);
  };

  // --- Event Handlers ---

  const handleSort = (column: keyof AthleteDisplay) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleOpenProfile = (athlete: AthleteDisplay) => {
    setSelectedAthlete(athlete);
    setSelectedAthleteTimes(calculateProjectedTimes(athlete.time1600m));
    setIsProfileOpen(true);
  };

  const handleAddAthlete = async (newAthleteInput: AthleteInput) => {
    try {
      // Create a FormData object to pass to the server action
      const formData = new FormData();
      formData.append("firstName", newAthleteInput.first_name);
      formData.append("lastName", newAthleteInput.last_name);
      formData.append("birthday", newAthleteInput.birthday);
      formData.append("grade", newAthleteInput.grade.toString());
      formData.append("time1600m", msToTimeString(newAthleteInput.time_1600m));

      // Call the server action
      const result = await addAthleteAction(formData);

      if (!result.success) {
        console.error("Failed to add athlete:", result.error);
        return;
      }

      // Refresh the athlete list
      const supabase = createClient();
      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .order("last_name", { ascending: true });

      if (error) {
        throw error;
      }

      // Convert database format to display format
      const displayAthletes: AthleteDisplay[] = data.map((athlete) => ({
        id: athlete.id,
        first_name: athlete.first_name,
        last_name: athlete.last_name,
        birthday: athlete.birthday,
        grade: athlete.grade,
        time1600m: msToTimeString(athlete.time_1600m),
        created_at: athlete.created_at,
        updated_at: athlete.updated_at,
      }));

      setAthletes(displayAthletes);
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  const handleDeleteClick = (athlete: AthleteDisplay, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click/profile opening
    setAthleteToDelete(athlete);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!athleteToDelete) return;

    try {
      // Call the server action to delete the athlete
      const result = await deleteAthleteAction(athleteToDelete.id);

      if (!result.success) {
        console.error("Failed to delete athlete:", result.error);
        return;
      }

      // Refresh the athlete list
      const supabase = createClient();
      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .order("last_name", { ascending: true });

      if (error) {
        throw error;
      }

      // Convert database format to display format
      const displayAthletes: AthleteDisplay[] = data.map((athlete) => ({
        id: athlete.id,
        first_name: athlete.first_name,
        last_name: athlete.last_name,
        birthday: athlete.birthday,
        grade: athlete.grade,
        time1600m: msToTimeString(athlete.time_1600m),
        created_at: athlete.created_at,
        updated_at: athlete.updated_at,
      }));

      setAthletes(displayAthletes);
      setIsDeleteConfirmOpen(false);
      setAthleteToDelete(null);
    } catch (error) {
      console.error("Error deleting athlete:", error);
    }
  };

  // Handle edit click in the table
  const handleEditClick = (athlete: AthleteDisplay, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click/profile opening
    setAthleteToEdit(athlete);
    setIsEditAthleteOpen(true);
  };

  // Handle update athlete
  const handleUpdateAthlete = async (
    id: number,
    updatedAthleteInput: AthleteInput
  ) => {
    try {
      // Create a FormData object to pass to the server action
      const formData = new FormData();
      formData.append("firstName", updatedAthleteInput.first_name);
      formData.append("lastName", updatedAthleteInput.last_name);
      formData.append("birthday", updatedAthleteInput.birthday);
      formData.append("grade", updatedAthleteInput.grade.toString());
      formData.append(
        "time1600m",
        msToTimeString(updatedAthleteInput.time_1600m)
      );

      // Call the server action
      const result = await updateAthleteAction(id, formData);

      if (!result.success) {
        console.error("Failed to update athlete:", result.error);
        return;
      }

      // Refresh the athlete list
      const supabase = createClient();
      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .order("last_name", { ascending: true });

      if (error) {
        throw error;
      }

      // Convert database format to display format
      const displayAthletes: AthleteDisplay[] = data.map((athlete) => ({
        id: athlete.id,
        first_name: athlete.first_name,
        last_name: athlete.last_name,
        birthday: athlete.birthday,
        grade: athlete.grade,
        time1600m: msToTimeString(athlete.time_1600m),
        created_at: athlete.created_at,
        updated_at: athlete.updated_at,
      }));

      setAthletes(displayAthletes);
    } catch (error) {
      console.error("Error updating athlete:", error);
    }
  };

  // --- Memoized Data Processing ---

  const filteredAndSortedAthletes = useMemo(() => {
    let filtered = athletes.filter((athlete) => {
      const fullName =
        `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      return fullName.includes(searchLower);
    });

    if (gradeFilter !== "all") {
      filtered = filtered.filter(
        (athlete) => athlete.grade.toString() === gradeFilter
      );
    }

    if (sortColumn) {
      filtered.sort((a, b) => {
        if (sortColumn === "id") return 0;
        let compareResult = 0;
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortColumn === "time1600m") {
          const timeA = timeStringToMs(valueA as string);
          const timeB = timeStringToMs(valueB as string);
          compareResult = timeA - timeB;
        } else if (sortColumn === "birthday") {
          try {
            const dateA = new Date(valueA as string);
            const dateB = new Date(valueB as string);
            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              compareResult = dateA.getTime() - dateB.getTime();
            }
          } catch {
            compareResult = 0;
          }
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          compareResult = valueA.localeCompare(valueB);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          compareResult = valueA - valueB;
        }
        return sortDirection === "asc" ? compareResult : -compareResult;
      });
    }

    return filtered;
  }, [athletes, searchQuery, sortColumn, sortDirection, gradeFilter]);

  // --- Render Content Based on State ---

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6 flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400">
          Loading athletes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="bg-red-50 dark:bg-red-900/10 text-red-500 p-4 rounded-lg">
          Error: {error}. Please try refreshing the page.
        </div>
      </div>
    );
  }

  // --- Render Logic ---

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Athletes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view athlete information and projected race times
        </p>
      </div>

      {/* Table Card */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Card Header with Filters/Actions */}
        <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[200px] sm:min-w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search athletes..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  aria-label="Search athletes"
                />
              </div>
              <div className="flex-shrink-0">
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger
                    className="w-full sm:w-[130px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    aria-label="Filter by grade"
                  >
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                // TODO: Implement Export functionality
                disabled // Disable for now
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 py-2"
                onClick={() => setIsAddAthleteOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add Athlete
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Card Content: Render AthleteTable Component */}
        <CardContent className="p-0">
          <AthleteTable
            athletes={filteredAndSortedAthletes}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            calculateAge={calculateAge}
            calculateProjectedTimes={calculateProjectedTimes}
            onSort={handleSort}
            onOpenProfile={handleOpenProfile}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
          {/* Table Footer Info (Moved inside CardContent, after table) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredAndSortedAthletes.length} of {athletes.length}{" "}
            athletes
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AthleteProfileDialog
        athlete={selectedAthlete}
        projectedTimes={selectedAthleteTimes}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <AddAthleteDialog
        isOpen={isAddAthleteOpen}
        onClose={() => setIsAddAthleteOpen(false)}
        onAddAthlete={handleAddAthlete}
      />
      <EditAthleteDialog
        athlete={athleteToEdit}
        isOpen={isEditAthleteOpen}
        onClose={() => {
          setIsEditAthleteOpen(false);
          setAthleteToEdit(null);
        }}
        onUpdateAthlete={handleUpdateAthlete}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setAthleteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        athleteName={
          athleteToDelete
            ? `${athleteToDelete.first_name} ${athleteToDelete.last_name}`
            : ""
        }
      />
    </div>
  );
}
