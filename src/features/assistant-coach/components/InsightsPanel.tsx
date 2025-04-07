/**
 * InsightsPanel Component
 *
 * A slide-out panel that displays various AI-powered insights for the coach.
 * Provides quick access to different types of insights through a card-based interface.
 *
 * Features:
 * - Slide-out panel design
 * - Scrollable content area
 * - Three insight categories:
 *   1. Training Plan (upcoming workouts, race schedule)
 *   2. Workout Results (performance analysis, team trends)
 *   3. Coaching Philosophy (principles, development focus)
 * - Dark mode support
 * - Responsive layout
 *
 * Design:
 * - Fixed position on right side
 * - Full height
 * - Clean card-based layout
 * - Icon + text button design
 * - Consistent spacing and typography
 */

import { InsightType } from "../types";
import { Button } from "@/components/ui/button";
import { Brain, Calendar, BarChart3 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface InsightsPanelProps {
  isOpen: boolean; // Controls panel visibility
  onClose: () => void; // Callback to close the panel
  onInsightClick: (type: InsightType) => void; // Callback for insight selection
}

export function InsightsPanel({
  isOpen,
  onClose,
  onInsightClick,
}: InsightsPanelProps) {
  // Early return if panel is closed
  if (!isOpen) return null;

  return (
    // Main panel container with fixed positioning and styling
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
      {/* Panel header with title and close button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Insights</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Scrollable content area */}
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-4 space-y-4">
          {/* Training Plan Insight Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Training Plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Get insights about upcoming workouts, race schedule, and
                training focus.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onInsightClick("training_plan")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Training Plan
              </Button>
            </CardContent>
          </Card>

          {/* Workout Results Insight Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Workout Results</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Analyze recent workout performance and team trends.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onInsightClick("workout_result")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Results
              </Button>
            </CardContent>
          </Card>

          {/* Coaching Philosophy Insight Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Coaching Philosophy</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Review core principles and development focus areas.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onInsightClick("coaching_philosophy")}
              >
                <Brain className="h-4 w-4 mr-2" />
                View Philosophy
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
