/**
 * LeaderboardTableHeader Component
 *
 * Renders the header row of the Team Leaderboard table with interactive sorting functionality.
 * Each sortable column displays a sort indicator and responds to click events.
 *
 * Features:
 * - Interactive column headers with sort indicators
 * - Visual feedback on hover (background color change)
 * - Responsive alignment (left/right/center based on data type)
 * - Accessible click targets
 * - Smooth transitions for hover states
 *
 * Column Layout:
 * 1. Rank (fixed width, non-sortable)
 * 2. Athlete Name (sortable)
 * 3. Group (sortable)
 * 4. Volume in miles (sortable, right-aligned)
 * 5. Completion % (sortable, right-aligned)
 * 6. Pace Accuracy (sortable, right-aligned)
 * 7. Trend (fixed width, non-sortable)
 * 8. Coach's Notes (min-width, non-sortable)
 */

import { ArrowDown, ArrowUp, ArrowUpDown, FileText } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortColumn, SortDirection } from "../types";

interface LeaderboardTableHeaderProps {
  sortColumn: SortColumn; // Currently active sort column
  sortDirection: SortDirection; // Current sort direction ('asc' or 'desc')
  handleSort: (column: SortColumn) => void; // Callback to handle sort column changes
}

export function LeaderboardTableHeader({
  sortColumn,
  sortDirection,
  handleSort,
}: LeaderboardTableHeaderProps) {
  /**
   * Renders the appropriate sort indicator icon based on column and sort state
   * - Up arrow: Column is sorted ascending
   * - Down arrow: Column is sorted descending
   * - Up/Down arrow (faded): Column is sortable but not currently sorted
   *
   * @param column - The column to render the indicator for
   * @returns JSX element with the appropriate sort icon
   */
  const renderSortIndicator = (column: SortColumn) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <ArrowUp className="h-4 w-4 ml-1" />
      ) : (
        <ArrowDown className="h-4 w-4 ml-1" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
  };

  return (
    <TableHeader>
      <TableRow>
        {/* Fixed-width rank column - no sorting */}
        <TableHead className="w-[80px]">Rank</TableHead>

        {/* Athlete name column - sortable */}
        <TableHead
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSort("name")}
        >
          <div className="flex items-center">
            Athlete
            {renderSortIndicator("name")}
          </div>
        </TableHead>

        {/* Group/team column - sortable */}
        <TableHead
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSort("group")}
        >
          <div className="flex items-center">
            Group
            {renderSortIndicator("group")}
          </div>
        </TableHead>

        {/* Training volume column - sortable, right-aligned */}
        <TableHead
          className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSort("volume")}
        >
          <div className="flex items-center justify-end">
            Volume (mi)
            {renderSortIndicator("volume")}
          </div>
        </TableHead>

        {/* Training completion column - sortable, right-aligned */}
        <TableHead
          className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSort("completion")}
        >
          <div className="flex items-center justify-end">
            Completion %{renderSortIndicator("completion")}
          </div>
        </TableHead>

        {/* Pace accuracy column - sortable, right-aligned */}
        <TableHead
          className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSort("accuracy")}
        >
          <div className="flex items-center justify-end">
            Pace Accuracy
            {renderSortIndicator("accuracy")}
          </div>
        </TableHead>

        {/* Fixed-width trend column - no sorting */}
        <TableHead className="text-center w-[80px]">Trend</TableHead>

        {/* Coach's notes column with icon - no sorting, minimum width */}
        <TableHead className="min-w-[200px]">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Coach&apos;s Notes
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
