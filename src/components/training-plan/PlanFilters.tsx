import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Importing components and libraries - Select component from shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the props interface for the PlanFilters component
interface PlanFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  durationFilter: string;
  onDurationChange: (value: string) => void;
  dateFilter: string;
  onDateChange: (value: string) => void;
}

// PlanFilters component - A reusable component for filtering training plans
export function PlanFilters({
  searchQuery,
  onSearchChange,
  durationFilter,
  onDurationChange,
  dateFilter,
  onDateChange,
}: PlanFiltersProps) {
  // Render the component
  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4 flex-col sm:flex-row">
        {/* Search input */}
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search plans..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex gap-2">
          {/* Duration filter */}
          <Select value={durationFilter} onValueChange={onDurationChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="short">Short (&lt;= 8 weeks)</SelectItem>
              <SelectItem value="medium">Medium (9-12 weeks)</SelectItem>
              <SelectItem value="long">Long (&gt; 12 weeks)</SelectItem>
            </SelectContent>
          </Select>

          {/* Date filter */}
          <Select value={dateFilter} onValueChange={onDateChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Start Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="recent">Recent (Jan-Feb)</SelectItem>
              <SelectItem value="upcoming">Upcoming (Jun)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
