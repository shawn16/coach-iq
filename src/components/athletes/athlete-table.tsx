"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AthleteDisplay } from "@/types/athlete"; // Import AthleteDisplay type

interface AthleteTableProps {
  athletes: AthleteDisplay[];
  sortColumn: keyof AthleteDisplay | null;
  sortDirection: "asc" | "desc";
  calculateAge: (birthday: string | Date) => number | null; // Pass down calculation function
  calculateProjectedTimes: (time1600m: string) => {
    time5k: string;
    time3200m: string;
    time800m: string;
  }; // Pass down calculation
  onSort: (column: keyof AthleteDisplay) => void;
  onOpenProfile: (athlete: AthleteDisplay) => void;
  onDeleteClick: (athlete: AthleteDisplay, e: React.MouseEvent) => void;
  onEditClick: (athlete: AthleteDisplay, e: React.MouseEvent) => void;
}

export function AthleteTable({
  athletes,
  sortColumn,
  sortDirection,
  calculateAge,
  calculateProjectedTimes,
  onSort,
  onOpenProfile,
  onDeleteClick,
  onEditClick,
}: AthleteTableProps) {
  // Helper to render sortable table headers
  const renderSortableHeader = (
    columnKey: keyof AthleteDisplay,
    label: string
  ) => {
    const isSortable = ["last_name", "grade", "time1600m"].includes(
      columnKey as string
    );
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
          {athletes.map((athlete) => {
            const projectedTimes = calculateProjectedTimes(athlete.time1600m);
            const age = calculateAge(athlete.birthday);
            const birthDateForFormat =
              typeof athlete.birthday === "string"
                ? new Date(athlete.birthday)
                : athlete.birthday;
            const formattedBirthday =
              birthDateForFormat instanceof Date &&
              !isNaN(birthDateForFormat.getTime())
                ? format(birthDateForFormat, "MM/dd/yyyy")
                : "N/A";

            return (
              <tr
                key={athlete.id}
                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                onClick={() => onOpenProfile(athlete)} // Use prop
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onEditClick(athlete, e)} // Use new prop
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      aria-label={`Edit ${athlete.first_name} ${athlete.last_name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onDeleteClick(athlete, e)} // Use prop
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
          {/* Empty state row */}
          {athletes.length === 0 && (
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
}
