"use client";

/**
 * Team Leaderboard Page Component
 *
 * A comprehensive dashboard that displays athlete performance rankings and metrics.
 * Features include:
 * - Filtering by athlete group, metric type, and date range
 * - Search functionality for finding specific athletes
 * - Sortable columns for different performance metrics
 * - Visual indicators for top performers and areas needing attention
 * - Responsive layout with dark mode support
 *
 * The page uses several sub-components to maintain a clean and modular structure:
 * - LeaderboardFilters: Handles all filtering and search controls
 * - LeaderboardTableHeader: Manages column headers and sorting
 * - LeaderboardTableRow: Renders individual athlete data rows
 * - LeaderboardLegend: Explains the visual indicators used
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { LeaderboardFilters } from "@/features/team-leaderboard/components/LeaderboardFilters";
import { LeaderboardLegend } from "@/features/team-leaderboard/components/LeaderboardLegend";
import { LeaderboardTableHeader } from "@/features/team-leaderboard/components/LeaderboardTableHeader";
import { LeaderboardTableRow } from "@/features/team-leaderboard/components/LeaderboardTableRow";
import { useLeaderboard } from "@/features/team-leaderboard/hooks/useLeaderboard";
import { mockAthletes } from "@/features/team-leaderboard/mockData";
import { Trophy } from "lucide-react";

export default function TeamLeaderboardPage() {
  // Initialize leaderboard state and functionality using custom hook
  // This includes filtering, sorting, and row styling logic
  const {
    // Filter state
    athleteGroup,
    setAthleteGroup,
    metric,
    setMetric,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    // Sorting state
    sortColumn,
    sortDirection,
    handleSort,
    // Computed data
    filteredAthletes,
    // Utility functions
    getRowClassName,
  } = useLeaderboard({ athletes: mockAthletes });

  return (
    <div className="container py-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl">
          Track and compare athlete performance across different metrics and
          groups. Use the filters below to customize your view of the
          leaderboard.
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Card Header with Title and Filters */}
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Performance Rankings
          </CardTitle>
          {/* Filter Controls */}
          <LeaderboardFilters
            athleteGroup={athleteGroup}
            setAthleteGroup={setAthleteGroup}
            metric={metric}
            setMetric={setMetric}
            dateRange={dateRange}
            setDateRange={setDateRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </CardHeader>

        {/* Card Content with Table and Legend */}
        <CardContent>
          {/* Scrollable Table Container */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              {/* Table Header with Sort Controls */}
              <LeaderboardTableHeader
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              {/* Table Body with Athlete Rows */}
              <TableBody>
                {filteredAthletes.map((athlete, index) => (
                  <LeaderboardTableRow
                    key={athlete.id}
                    athlete={athlete}
                    index={index}
                    className={getRowClassName(athlete)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Legend explaining visual indicators */}
          <LeaderboardLegend />
        </CardContent>
      </Card>
    </div>
  );
}
