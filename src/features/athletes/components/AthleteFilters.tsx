/**
 * AthleteFilters Component
 *
 * Filter controls for the athletes list:
 * - Search by name
 * - Filter by grade level
 * - Filter by active status
 */

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the props for the AthleteFilters component
interface AthleteFiltersProps {
  searchQuery: string;
  gradeFilter: string;
  activeFilter: string;
  onSearchChange: (value: string) => void;
  onGradeFilterChange: (value: string) => void;
  onActiveFilterChange: (value: string) => void;
}

// Define the AthleteFilters component
export function AthleteFilters({
  searchQuery,
  gradeFilter,
  activeFilter,
  onSearchChange,
  onGradeFilterChange,
  onActiveFilterChange,
}: AthleteFiltersProps) {
  return (
    // Container for the filters
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:w-80">
          {/* Search input */}
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex-shrink-0">
          {/* Grade filter select */}
          <Select value={gradeFilter} onValueChange={onGradeFilterChange}>
            <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
      <div className="flex-shrink-0">
        {/* Active filter select */}
        <Select value={activeFilter} onValueChange={onActiveFilterChange}>
          <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
