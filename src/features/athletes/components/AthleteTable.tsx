/**
 * AthleteTable Component
 *
 * Displays a table of athletes with sorting and actions.
 * Features:
 * - Sortable columns
 * - View and delete actions
 * - Responsive design
 */

import { Athlete, SortConfig } from "../types";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AthleteTableProps {
  athletes: Athlete[];
  sortConfig: SortConfig;
  onSort: (column: SortConfig["column"]) => void;
  onAthleteClick: (athlete: Athlete) => void;
  onDeleteClick: (athlete: Athlete, e: React.MouseEvent) => void;
}

export function AthleteTable({
  athletes,
  sortConfig,
  onSort,
  onAthleteClick,
  onDeleteClick,
}: AthleteTableProps) {
  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("last_name")}
            >
              Last Name
              {sortConfig.column === "last_name" && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("first_name")}
            >
              First Name
              {sortConfig.column === "first_name" && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Age</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("grade")}
            >
              Grade
              {sortConfig.column === "grade" && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("time1600m")}
            >
              1600m Time
              {sortConfig.column === "time1600m" && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead>Projected 5k</TableHead>
            <TableHead>Projected 3200m</TableHead>
            <TableHead>Projected 800m</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow
              key={athlete.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onAthleteClick(athlete)}
            >
              <TableCell>{athlete.last_name}</TableCell>
              <TableCell>{athlete.first_name}</TableCell>
              <TableCell>
                {new Date(athlete.birthday).toLocaleDateString()}
              </TableCell>
              <TableCell>{calculateAge(athlete.birthday)}</TableCell>
              <TableCell>{athlete.grade ?? "-"}</TableCell>
              <TableCell>{athlete.time1600m ?? "-"}</TableCell>
              <TableCell>{athlete.projected_times?.time5k ?? "-"}</TableCell>
              <TableCell>{athlete.projected_times?.time3200m ?? "-"}</TableCell>
              <TableCell>{athlete.projected_times?.time800m ?? "-"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAthleteClick(athlete);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => onDeleteClick(athlete, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {athletes.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No athletes found matching your search criteria.
          </p>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        Showing {athletes.length} athletes
      </div>
    </div>
  );
}
