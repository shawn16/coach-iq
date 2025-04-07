/**
 * LeaderboardTableRow Component
 *
 * A component that renders a single row in the Team Leaderboard table.
 * Displays comprehensive athlete information with various visual indicators:
 *
 * Visual Elements:
 * - Rank medals (gold, silver, bronze) for top 3 positions
 * - Avatar with fallback initials
 * - Group badge
 * - Performance metrics with conditional formatting
 * - Trend indicators (up/down/stable arrows)
 * - Coach's notes
 *
 * Conditional Styling:
 * - Red text for completion < 70%
 * - Bold text + checkmark for accuracy > 90%
 * - Background colors inherited from parent (via className prop)
 *
 * Features:
 * - Responsive layout
 * - Dark mode support
 * - Accessible image alternatives
 * - Smooth color transitions
 */

import { ArrowDown, ArrowUp, Medal, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Athlete } from "../types";

interface LeaderboardTableRowProps {
  athlete: Athlete; // Athlete data to display
  index: number; // Zero-based index for ranking (adds 1 for display)
  className?: string; // Optional CSS classes for row styling (e.g., background colors)
}

export function LeaderboardTableRow({
  athlete,
  index,
  className = "",
}: LeaderboardTableRowProps) {
  /**
   * Renders a medal icon or rank number based on position
   * - Gold medal (🥇) for 1st place
   * - Silver medal (🥈) for 2nd place
   * - Bronze medal (🥉) for 3rd place
   * - Numeric rank for all other positions
   */
  const renderRankMedal = (rank: number) => {
    if (rank === 1) {
      return <Medal className="h-5 w-5 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    } else if (rank === 3) {
      return <Medal className="h-5 w-5 text-amber-700" />;
    } else {
      return <span className="font-medium">{rank}</span>;
    }
  };

  /**
   * Renders a trend indicator icon based on athlete's performance trend
   * - Up arrow (green) for improving performance
   * - Down arrow (red) for declining performance
   * - Horizontal line (gray) for stable performance
   */
  const renderTrendIcon = () => {
    switch (athlete.trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "same":
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <TableRow className={cn(className, "transition-colors")}>
      {/* Rank Column with Medal */}
      <TableCell className="font-medium text-center">
        {renderRankMedal(index + 1)}
      </TableCell>

      {/* Athlete Name and Avatar */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={athlete.avatar} alt={athlete.name} />
            <AvatarFallback>{athlete.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{athlete.name}</span>
        </div>
      </TableCell>

      {/* Team Group Badge */}
      <TableCell>
        <Badge variant="outline" className="font-normal">
          {athlete.group}
        </Badge>
      </TableCell>

      {/* Training Volume (miles) */}
      <TableCell className="text-right">{athlete.volume.toFixed(1)}</TableCell>

      {/* Completion Rate with Warning Color */}
      <TableCell
        className={cn(
          "text-right",
          athlete.completion < 70 && "text-red-600 dark:text-red-400"
        )}
      >
        {athlete.completion}%
      </TableCell>

      {/* Pace Accuracy with Achievement Indicator */}
      <TableCell className="text-right">
        <span className={cn(athlete.accuracy > 90 && "font-bold")}>
          {athlete.accuracy}%
          {athlete.accuracy > 90 && (
            <span className="ml-1 text-green-600 dark:text-green-400 inline-flex">
              ✅
            </span>
          )}
        </span>
      </TableCell>

      {/* Performance Trend Indicator */}
      <TableCell className="text-center">{renderTrendIcon()}</TableCell>

      {/* Coach's Notes */}
      <TableCell className="text-muted-foreground">
        Looking strong this week.
      </TableCell>
    </TableRow>
  );
}
