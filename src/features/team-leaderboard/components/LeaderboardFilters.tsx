/**
 * LeaderboardFilters Component
 *
 * A component that provides filtering and search controls for the Team Leaderboard.
 * Features three dropdown selects and a search input:
 * 1. Athlete Group filter - Filter by team division (Varsity/JV, Boys/Girls)
 * 2. Metric selector - Choose which performance metric to focus on
 * 3. Date Range selector - Select time period for performance data
 * 4. Search input - Filter athletes by name (case-insensitive)
 *
 * The component is responsive:
 * - Mobile: Filters stack vertically (single column)
 * - Desktop: Filters arrange in three columns
 *
 * All filter state is managed by the parent component through props
 */

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AthleteGroup, Metric, DateRangeType } from "../types";

/**
 * Props for the LeaderboardFilters component
 * Each filter has a value and setter pair to maintain controlled components
 */
interface LeaderboardFiltersProps {
  // Athlete group filter state
  athleteGroup: AthleteGroup;
  setAthleteGroup: (group: AthleteGroup) => void;

  // Performance metric selector state
  metric: Metric;
  setMetric: (metric: Metric) => void;

  // Date range filter state
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;

  // Search query state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function LeaderboardFilters({
  athleteGroup,
  setAthleteGroup,
  metric,
  setMetric,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
}: LeaderboardFiltersProps) {
  return (
    <div className="space-y-4 mt-4">
      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Athlete Group Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Athlete Group</label>
          <Select
            value={athleteGroup}
            onValueChange={(value) => setAthleteGroup(value as AthleteGroup)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="varsity boys">Varsity Boys</SelectItem>
              <SelectItem value="varsity girls">Varsity Girls</SelectItem>
              <SelectItem value="jv boys">JV Boys</SelectItem>
              <SelectItem value="jv girls">JV Girls</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Performance Metric Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Metric</label>
          <Select
            value={metric}
            onValueChange={(value) => setMetric(value as Metric)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="completion">Completion %</SelectItem>
              <SelectItem value="accuracy">Pace Accuracy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Select
            value={dateRange}
            onValueChange={(value) => setDateRange(value as DateRangeType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Input with Icon */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search athletes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10" // Padding to accommodate search icon
        />
      </div>
    </div>
  );
}
