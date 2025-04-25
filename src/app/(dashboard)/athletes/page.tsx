"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Trash,
  Pencil,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToMMDDYYYY, calculateAge, cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddAthleteDialog } from "@/components/dialogs/add-athlete-dialog";
import { EditAthleteDialog } from "@/components/dialogs/edit-athlete-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  grade: number;
  time_1600m: number;
  projected_5k?: string;
  projected_3200m?: string;
  projected_800m?: string;
}

type SortField = "last_name" | "grade" | "time_1600m";
type SortDirection = "asc" | "desc";

export default function AthletesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("All Grades");
  const [sortField, setSortField] = useState<SortField>("last_name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<Athlete | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Available grades for filtering
  const gradeOptions = ["All Grades", "9th", "10th", "11th", "12th"];

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/athletes");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setAthletes(data);
        setError(null);
      } else {
        console.error("API did not return an array:", data);
        setError("Received invalid data format from server.");
        setAthletes([]);
      }
    } catch (err) {
      console.error("Failed to fetch athletes:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setAthletes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle adding or updating an athlete
  const handleAthleteChange = () => {
    fetchAthletes();
  };

  // Format time from milliseconds to readable format (MM:SS.MS)
  const formatTime = (milliseconds: number | null | undefined): string => {
    if (
      milliseconds === null ||
      milliseconds === undefined ||
      isNaN(milliseconds) ||
      milliseconds === 0
    )
      return "-";

    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const millisecs = Math.floor((milliseconds % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, "0")}.${millisecs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle column sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle grade filter selection
  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
  };

  // Filter athletes based on search query and selected grade
  const filteredAthletes = Array.isArray(athletes)
    ? athletes.filter((athlete) => {
        const nameMatch =
          athlete.first_name && athlete.last_name
            ? `${athlete.first_name} ${athlete.last_name}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            : false;

        const gradeMatch =
          selectedGrade === "All Grades" ||
          (athlete.grade !== null &&
            athlete.grade !== undefined &&
            athlete.grade.toString() === selectedGrade.replace(/\D/g, ""));

        return nameMatch && gradeMatch;
      })
    : [];

  // Sort the filtered athletes
  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    if (sortField === "last_name") {
      return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    } else if (sortField === "grade" || sortField === "time_1600m") {
      const numA = Number(valA);
      const numB = Number(valB);
      return sortDirection === "asc" ? numA - numB : numB - numA;
    }
    return 0;
  });

  // Get the sort icon for a given field
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown className="ml-1 h-4 w-4 inline opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4 inline text-indigo-600" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 inline text-indigo-600" />
    );
  };

  // --- Delete Logic Start ---
  const handleDeleteClick = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setAthleteToDelete(athlete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!athleteToDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/athletes/${athleteToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to delete athlete (HTTP ${response.status})`
        );
      }

      // Success
      toast.success(
        `Athlete "${athleteToDelete.first_name} ${athleteToDelete.last_name}" deleted successfully!`
      );
      setIsDeleteDialogOpen(false);
      setAthleteToDelete(null);
      fetchAthletes(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete athlete:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown delete error occurred";
      setError(errorMessage); // Keep showing error in dialog
      toast.error(`Failed to delete athlete: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
  };
  // --- Delete Logic End ---

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Athletes</h1>
        <p className="text-muted-foreground">
          Manage and view athlete information and projected race times
        </p>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
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

          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[150px] justify-between"
                >
                  {selectedGrade}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                {gradeOptions.map((grade) => (
                  <DropdownMenuItem
                    key={grade}
                    onClick={() => handleGradeSelect(grade)}
                    className={cn(
                      "cursor-pointer",
                      selectedGrade === grade ? "bg-muted font-medium" : ""
                    )}
                  >
                    {grade}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>

            <AddAthleteDialog onAthleteAdded={handleAthleteChange} />
          </div>
        </div>

        <div className="relative overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600 dark:text-red-400">
              <p className="mb-2 font-medium">Failed to load athletes</p>
              <p className="text-sm mb-4">Error: {error}</p>
              <Button variant="outline" size="sm" onClick={fetchAthletes}>
                Retry
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/60">
                  <TableHead
                    className="whitespace-nowrap cursor-pointer font-medium px-4 py-3"
                    onClick={() => handleSort("last_name")}
                  >
                    Last Name {getSortIcon("last_name")}
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    First Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    Birthday
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    Age
                  </TableHead>
                  <TableHead
                    className="whitespace-nowrap cursor-pointer font-medium px-4 py-3"
                    onClick={() => handleSort("grade")}
                  >
                    Grade {getSortIcon("grade")}
                  </TableHead>
                  <TableHead
                    className="whitespace-nowrap cursor-pointer font-medium px-4 py-3"
                    onClick={() => handleSort("time_1600m")}
                  >
                    1600m Time {getSortIcon("time_1600m")}
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    Projected 5K
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    Projected 3200m
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3">
                    Projected 800m
                  </TableHead>
                  <TableHead className="whitespace-nowrap font-medium px-4 py-3 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAthletes.length > 0 ? (
                  sortedAthletes.map((athlete) => {
                    const birthDate = athlete.birthday
                      ? new Date(athlete.birthday)
                      : null;
                    const age =
                      birthDate && !isNaN(birthDate.getTime())
                        ? calculateAge(birthDate)
                        : "-";
                    const formattedBirthday =
                      birthDate && !isNaN(birthDate.getTime())
                        ? formatDateToMMDDYYYY(birthDate)
                        : "-";
                    const time1600m = formatTime(athlete.time_1600m);

                    const projected5k = athlete.projected_5k ?? "-";
                    const projected3200m = athlete.projected_3200m ?? "-";
                    const projected800m = athlete.projected_800m ?? "-";

                    return (
                      <TableRow key={athlete.id} className="hover:bg-muted/5">
                        <TableCell className="font-medium px-4 py-3">
                          {athlete.last_name}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {athlete.first_name}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {formattedBirthday}
                        </TableCell>
                        <TableCell className="px-4 py-3">{age}</TableCell>
                        <TableCell className="px-4 py-3">
                          {athlete.grade ? (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {athlete.grade}th
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-mono">
                          {time1600m}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-mono">
                          {projected5k}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-mono">
                          {projected3200m}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-mono">
                          {projected800m}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <EditAthleteDialog
                              athlete={athlete}
                              onAthleteUpdated={handleAthleteChange}
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  aria-label={`Edit ${athlete.first_name} ${athlete.last_name}`}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDeleteClick(athlete, e)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              aria-label={`Delete ${athlete.first_name} ${athlete.last_name}`}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-16 text-muted-foreground"
                    >
                      {searchQuery || selectedGrade !== "All Grades"
                        ? "No athletes found matching your criteria."
                        : "No athletes added yet."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              athlete{" "}
              {athleteToDelete &&
                `"${athleteToDelete.first_name} ${athleteToDelete.last_name}"`}
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <p className="text-sm text-red-600 text-center">Error: {error}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Yes, delete athlete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
