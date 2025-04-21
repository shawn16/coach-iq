"use client";

import type React from "react";
import { useState, useMemo } from "react";
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
import { AthleteTable } from "@/components/athletes/athlete-table";
import { Athlete, ProjectedTimes, AthleteInput } from "@/types/athlete";

// Sample athlete data (temporary)
// TODO: Remove this when fetching data from API
const athletesData: Athlete[] = [
  {
    id: 1,
    firstName: "Alex",
    lastName: "Johnson",
    birthday: "2006-05-15",
    grade: 11,
    time1600m: "4:45.30",
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Smith",
    birthday: "2007-08-22",
    grade: 10,
    time1600m: "5:12.45",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    birthday: "2005-03-10",
    grade: 12,
    time1600m: "4:32.18",
  },
  // ... (keep the rest of sample data) ...
  {
    id: 4,
    firstName: "Sophia",
    lastName: "Davis",
    birthday: "2007-11-05",
    grade: 10,
    time1600m: "5:05.72",
  },
  {
    id: 5,
    firstName: "Ethan",
    lastName: "Wilson",
    birthday: "2006-07-30",
    grade: 11,
    time1600m: "4:58.91",
  },
  {
    id: 6,
    firstName: "Olivia",
    lastName: "Martinez",
    birthday: "2008-01-17",
    grade: 9,
    time1600m: "5:25.63",
  },
  {
    id: 7,
    firstName: "Noah",
    lastName: "Anderson",
    birthday: "2006-09-12",
    grade: 11,
    time1600m: "4:50.27",
  },
  {
    id: 8,
    firstName: "Ava",
    lastName: "Thompson",
    birthday: "2008-04-03",
    grade: 9,
    time1600m: "5:18.39",
  },
  {
    id: 9,
    firstName: "William",
    lastName: "Garcia",
    birthday: "2009-02-25",
    grade: 9,
    time1600m: "5:30.15",
  },
  {
    id: 10,
    firstName: "Isabella",
    lastName: "Rodriguez",
    birthday: "2008-06-08",
    grade: 9,
    time1600m: "5:22.84",
  },
  {
    id: 11,
    firstName: "James",
    lastName: "Lee",
    birthday: "2005-12-01",
    grade: 12,
    time1600m: "4:28.56",
  },
  {
    id: 12,
    firstName: "Charlotte",
    lastName: "Lewis",
    birthday: "2007-10-19",
    grade: 10,
    time1600m: "5:08.92",
  },
  {
    id: 13,
    firstName: "Benjamin",
    lastName: "Walker",
    birthday: "2005-08-07",
    grade: 12,
    time1600m: "4:38.75",
  },
  {
    id: 14,
    firstName: "Mia",
    lastName: "Hall",
    birthday: "2007-03-28",
    grade: 10,
    time1600m: "5:15.31",
  },
  {
    id: 15,
    firstName: "Lucas",
    lastName: "Allen",
    birthday: "2006-11-14",
    grade: 11,
    time1600m: "4:55.48",
  },
];

export default function AthletesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Athlete | null>(
    "lastName"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  // State for athlete data (starts with sample data)
  // TODO: Replace with state for fetched data (e.g., from react-query or useEffect)
  const [athletes, setAthletes] = useState<Athlete[]>(athletesData);

  // State for athlete profile dialog
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedAthleteTimes, setSelectedAthleteTimes] =
    useState<ProjectedTimes | null>(null);

  // State for add athlete dialog
  const [isAddAthleteOpen, setIsAddAthleteOpen] = useState(false);

  // State for delete confirmation dialog
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<Athlete | null>(null);

  // --- Utility Functions ---

  const timeToSeconds = (timeStr: string): number => {
    if (timeStr === "0:00.00") return Infinity;
    const parts = timeStr.match(/(\d+):(\d{2})\.(\d{2})/);
    if (!parts) return Infinity;
    const [, minutes, seconds, milliseconds] = parts;
    return (
      Number.parseInt(minutes) * 60 +
      Number.parseInt(seconds) +
      Number.parseInt(milliseconds) / 100
    );
  };

  const secondsToTime = (totalSeconds: number): string => {
    if (!isFinite(totalSeconds) || totalSeconds <= 0) return "N/A";
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const ms = Math.round((totalSeconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateProjectedTimes = (time1600m: string): ProjectedTimes => {
    const timeInSeconds = timeToSeconds(time1600m);
    if (!isFinite(timeInSeconds)) {
      return {
        time5k: "N/A",
        time3200m: "N/A",
        time800m: "N/A",
      };
    }
    // Simple projection factors (can be refined)
    const projected5kTime = timeInSeconds * 3.49;
    const projected3200mTime = timeInSeconds * 2.14;
    const projected800mTime = timeInSeconds * 0.45;

    return {
      time5k: secondsToTime(projected5kTime),
      time3200m: secondsToTime(projected3200mTime),
      time800m: secondsToTime(projected800mTime),
    };
  };

  const calculateAge = (birthday: string | Date): number | null => {
    try {
      const birthDate =
        typeof birthday === "string" ? new Date(birthday) : birthday;
      return differenceInYears(new Date(), birthDate);
    } catch {
      return null;
    }
  };

  // --- Event Handlers ---

  const handleSort = (column: keyof Athlete) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleOpenProfile = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setSelectedAthleteTimes(calculateProjectedTimes(athlete.time1600m));
    setIsProfileOpen(true);
  };

  const handleAddAthlete = (newAthleteInput: AthleteInput) => {
    // TODO: Replace with API call to add athlete
    console.log("Adding athlete (client-side):", newAthleteInput);
    const newId = Date.now(); // Temporary ID generation
    const newAthlete: Athlete = {
      ...newAthleteInput,
      id: newId,
    };
    setAthletes((prev) => [...prev, newAthlete]);
    // Optionally refetch data here if using client-side cache
  };

  const handleDeleteClick = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click/profile opening
    setAthleteToDelete(athlete);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!athleteToDelete) return;
    // TODO: Replace with API call to delete athlete
    console.log("Deleting athlete (client-side):", athleteToDelete.id);
    setAthletes((prev) => prev.filter((a) => a.id !== athleteToDelete.id));
    setIsDeleteConfirmOpen(false);
    setAthleteToDelete(null);
    // Optionally refetch data here
  };

  // --- Memoized Data Processing ---

  const filteredAndSortedAthletes = useMemo(() => {
    let filtered = athletes.filter((athlete) => {
      const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
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
          const timeA = timeToSeconds(valueA as string);
          const timeB = timeToSeconds(valueB as string);
          compareResult = timeA - timeB;
        } else if (sortColumn === "birthday") {
          try {
            const dateA =
              typeof valueA === "string" ? new Date(valueA) : (valueA as Date);
            const dateB =
              typeof valueB === "string" ? new Date(valueB) : (valueB as Date);
            if (
              dateA &&
              dateB &&
              !isNaN(dateA.getTime()) &&
              !isNaN(dateB.getTime())
            ) {
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
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setAthleteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        athleteName={
          athleteToDelete
            ? `${athleteToDelete.firstName} ${athleteToDelete.lastName}`
            : ""
        }
      />
    </div>
  );
}
