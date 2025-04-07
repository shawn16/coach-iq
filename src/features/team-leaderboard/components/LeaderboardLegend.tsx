/**
 * LeaderboardLegend Component
 *
 * A component that explains the visual indicators used in the Team Leaderboard.
 * Displays three key performance indicators:
 * 1. Top performers (green background) - Athletes in the top 3 by volume
 * 2. At-risk athletes (red background) - Athletes with completion rate below 70%
 * 3. High accuracy (checkmark) - Athletes with pace accuracy above 90%
 *
 * Features:
 * - Responsive layout with flex-wrap for smaller screens
 * - Dark mode support with appropriate color variants
 * - Consistent spacing and alignment of indicators
 * - Small, unobtrusive design that complements the main table
 */

export function LeaderboardLegend() {
  return (
    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
      <h3 className="font-medium">Legend:</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded" />
          <span>Top 3 by Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded" />
          <span>Completion below 70%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">90%</span>
          <span>✅</span>
          <span>Pace Accuracy above 90%</span>
        </div>
      </div>
    </div>
  );
}
