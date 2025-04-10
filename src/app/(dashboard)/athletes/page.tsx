/**
 * Athletes Page Component
 *
 * Main page for managing and viewing athlete information.
 * Features:
 * - Display athlete list in a sortable table
 * - Search and filter athletes by name, grade, and active status
 * - Add new athletes via modal dialog
 * - View and delete athlete details
 *
 * Recent Changes:
 * - Replaced page navigation to /athletes/new with an inline modal dialog
 * - Added state management for dialog visibility
 * - Added handleAddAthlete function for API integration
 * - Improved UI consistency with the rest of the application
 *
 * State Management:
 * - athletes: List of all athletes from API
 * - loading: Tracks data fetching state
 * - error: Stores any error messages
 * - isAddDialogOpen: Controls visibility of the add athlete dialog
 */

"use client"; // Marks this as a client-side component in Next.js 13+

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import { Button } from "@/components/ui/button"; // Reusable button component
import { AthleteTable } from "@/features/athletes/components/AthleteTable";
import { AthleteFilters } from "@/features/athletes/components/AthleteFilters";
import { Athlete, SortConfig } from "@/features/athletes/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// Import the dialog component for adding athletes
import { AddAthleteDialog } from "@/components/add-athlete-dialog";

export default function AthletesPage() {
  // Initialize Next.js router for programmatic navigation
  const router = useRouter();

  // State management using React hooks
  const [athletes, setAthletes] = useState<Athlete[]>([]); // Store athlete data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Store error messages
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "last_name",
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  // State for controlling the visibility of the add athlete dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  /**
   * Effect hook to fetch athletes when component mounts
   * Empty dependency array means this runs once on mount
   */
  useEffect(() => {
    fetchAthletes();
  }, []);

  /**
   * Fetches athlete data from the API
   * Updates state based on the response
   * Handles errors and loading states
   */
  const fetchAthletes = async () => {
    try {
      console.log("Fetching athletes...");
      const response = await fetch("/api/athletes");

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error("Error data:", errorData);
        throw new Error(`Failed to fetch athletes: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Athletes fetched successfully:", data);
      setAthletes(data);
    } catch (err) {
      console.error("Error in fetchAthletes:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch athletes");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: SortConfig["column"]) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleAthleteClick = (athlete: Athlete) => {
    router.push(`/athletes/${athlete.id}`);
  };

  const handleDeleteClick = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement delete functionality
    console.log("Delete athlete:", athlete.id);
  };

  /**
   * Handles adding a new athlete via the dialog form
   *
   * @param newAthlete - The athlete data from the dialog form
   */
  const handleAddAthlete = async (newAthlete: {
    firstName: string;
    lastName: string;
    birthday: string;
    grade: number;
    time1600m: string;
  }) => {
    try {
      // Convert the dialog form data format to match the API expectations
      const response = await fetch("/api/athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: newAthlete.firstName,
          last_name: newAthlete.lastName,
          birthday: newAthlete.birthday,
          grade: newAthlete.grade.toString(),
          gender: "MALE", // Default value
          time1600m: newAthlete.time1600m,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create athlete");
      }

      // Refresh athletes list after successful addition
      fetchAthletes();
    } catch (err) {
      console.error("Error adding athlete:", err);
    }
  };

  const filteredAthletes = athletes
    .filter((athlete) => {
      const matchesSearch = searchQuery
        ? `${athlete.first_name} ${athlete.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      const matchesGrade =
        gradeFilter === "all" || athlete.grade?.toString() === gradeFilter;
      const matchesActive =
        activeFilter === "all" || athlete.active.toString() === activeFilter;
      return matchesSearch && matchesGrade && matchesActive;
    })
    .sort((a, b) => {
      if (sortConfig.column === "last_name") {
        return sortConfig.direction === "asc"
          ? a.last_name.localeCompare(b.last_name)
          : b.last_name.localeCompare(a.last_name);
      }
      if (sortConfig.column === "first_name") {
        return sortConfig.direction === "asc"
          ? a.first_name.localeCompare(b.first_name)
          : b.first_name.localeCompare(a.first_name);
      }
      if (sortConfig.column === "grade") {
        const gradeA = a.grade ?? 0;
        const gradeB = b.grade ?? 0;
        return sortConfig.direction === "asc"
          ? gradeA - gradeB
          : gradeB - gradeA;
      }
      if (sortConfig.column === "time1600m") {
        const timeA = a.time1600m ?? "99:99";
        const timeB = b.time1600m ?? "99:99";
        return sortConfig.direction === "asc"
          ? timeA.localeCompare(timeB)
          : timeB.localeCompare(timeA);
      }
      if (sortConfig.column === "projected_times") {
        const timeA = a.projected_times?.time5k ?? "99:99";
        const timeB = b.projected_times?.time5k ?? "99:99";
        return sortConfig.direction === "asc"
          ? timeA.localeCompare(timeB)
          : timeB.localeCompare(timeA);
      }
      return 0;
    });

  /**
   * Show loading spinner while data is being fetched
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p>Loading athletes...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error message if data fetching failed
   */
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-2">Error Loading Athletes</h2>
          <p>{error}</p>
          <Button
            className="mt-4"
            onClick={() => {
              setLoading(true);
              setError("");
              fetchAthletes();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Main component render
   * Displays a card with athlete filters, table, and provides access to the add dialog
   */
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-amber-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <CardTitle>Athletes</CardTitle>
                <CardDescription>
                  Manage your team&apos;s athletes
                </CardDescription>
              </div>
            </div>
            {/* "Add Athlete" button now opens the dialog instead of navigating to a new page */}
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add Athlete
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AthleteFilters
                searchQuery={searchQuery}
                gradeFilter={gradeFilter}
                activeFilter={activeFilter}
                onSearchChange={setSearchQuery}
                onGradeFilterChange={setGradeFilter}
                onActiveFilterChange={setActiveFilter}
              />

              <AthleteTable
                athletes={filteredAthletes}
                sortConfig={sortConfig}
                onSort={handleSort}
                onAthleteClick={handleAthleteClick}
                onDeleteClick={handleDeleteClick}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Athlete Dialog Component */}
      <AddAthleteDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddAthlete={handleAddAthlete}
      />
    </>
  );
}
