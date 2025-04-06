"use client";

import { useState } from "react";
import { Athlete, SortConfig } from "@/features/athletes/types";
import { AthleteFilters } from "@/features/athletes/components/AthleteFilters";
import { AthleteTable } from "@/features/athletes/components/AthleteTable";
import { Button } from "@/components/ui/button";

const sampleAthletes: Athlete[] = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    birthday: "2005-06-15",
    grade: 12,
    time1600m: "5:45",
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Chen",
    birthday: "2005-08-22",
    grade: 12,
    time1600m: "5:30",
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "Rodriguez",
    birthday: "2005-04-10",
    grade: 12,
    time1600m: "5:55",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Kim",
    birthday: "2006-02-28",
    grade: 11,
    time1600m: "6:10",
  },
  {
    id: 5,
    firstName: "Olivia",
    lastName: "Smith",
    birthday: "2006-07-15",
    grade: 11,
    time1600m: "6:15",
  },
  {
    id: 6,
    firstName: "James",
    lastName: "Wilson",
    birthday: "2006-09-03",
    grade: 11,
    time1600m: "6:20",
  },
  {
    id: 7,
    firstName: "Sophia",
    lastName: "Lee",
    birthday: "2007-01-20",
    grade: 9,
    time1600m: "6:45",
  },
  {
    id: 8,
    firstName: "Lucas",
    lastName: "Brown",
    birthday: "2007-03-12",
    grade: 9,
    time1600m: "6:50",
  },
];

export default function AthletesPage() {
  const [athletes] = useState<Athlete[]>(sampleAthletes);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "lastName",
    direction: "asc",
  });

  // Filter athletes based on search query and grade filter
  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade =
      gradeFilter === "all" || athlete.grade.toString() === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  // Sort athletes based on sort config
  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    if (sortConfig.column === "lastName") {
      return sortConfig.direction === "asc"
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName);
    }
    if (sortConfig.column === "grade") {
      return sortConfig.direction === "asc"
        ? a.grade - b.grade
        : b.grade - a.grade;
    }
    if (sortConfig.column === "time1600m") {
      const timeA = a.time1600m.split(":").map(Number);
      const timeB = b.time1600m.split(":").map(Number);
      const totalSecondsA = timeA[0] * 60 + timeA[1];
      const totalSecondsB = timeB[0] * 60 + timeB[1];
      return sortConfig.direction === "asc"
        ? totalSecondsA - totalSecondsB
        : totalSecondsB - totalSecondsA;
    }
    return 0;
  });

  const handleSort = (column: SortConfig["column"]) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDeleteClick = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement delete functionality when dialog is ready
    console.log("Delete athlete:", athlete);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Athletes</h1>
          <Button onClick={() => console.log("Add athlete clicked")}>
            Add Athlete
          </Button>
        </div>

        <AthleteFilters
          searchQuery={searchQuery}
          gradeFilter={gradeFilter}
          onSearchChange={setSearchQuery}
          onGradeFilterChange={setGradeFilter}
          onAddAthleteClick={() => console.log("Add athlete clicked")}
        />

        <AthleteTable
          athletes={sortedAthletes}
          sortConfig={sortConfig}
          onSort={handleSort}
          onAthleteClick={(athlete) => console.log("View athlete:", athlete)}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
