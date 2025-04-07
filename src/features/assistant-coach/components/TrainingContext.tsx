/**
 * TrainingContext Component
 *
 * A component that displays the current training context for the team, including:
 * - Upcoming race information
 * - Current season phase
 * - Next scheduled workout
 * - Overall team performance trend
 *
 * This information is used by the AI assistant to provide context-aware responses
 * and recommendations based on the team's current training situation.
 */
import { Badge } from "@/components/ui/badge";

export function TrainingContext() {
  return (
    <div className="space-y-6">
      {/* Next Race Section */}
      <div>
        <h3 className="text-muted-foreground mb-2">Next Race</h3>
        <div>
          {/* Display race name and type with countdown */}
          <div className="text-lg">City Championships (5K) - 12</div>
          <div className="text-muted-foreground">days away</div>
        </div>
      </div>

      {/* Season Phase Section */}
      <div>
        <h3 className="text-muted-foreground mb-2">Season Phase</h3>
        {/* Badge indicating current training phase with custom color */}
        <Badge variant="secondary" className="text-blue-400">
          Competition Phase
        </Badge>
      </div>

      {/* Next Workout Section */}
      <div>
        <h3 className="text-muted-foreground mb-2">Next Workout</h3>
        <div>
          {/* Display workout type and scheduled date */}
          <div className="text-base">Threshold Tempo Run</div>
          <div className="text-muted-foreground">(2023-05-04)</div>
        </div>
      </div>

      {/* Team Performance Section */}
      <div>
        <h3 className="text-muted-foreground mb-2">Team Performance</h3>
        <div className="flex items-center gap-2">
          {/* Display performance trend with color-coded badge */}
          <span className="text-muted-foreground">Trend:</span>
          <Badge variant="secondary" className="text-emerald-400">
            improving
          </Badge>
        </div>
      </div>
    </div>
  );
}
