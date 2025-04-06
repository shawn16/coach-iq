import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useWorkoutResults } from "@/hooks/useWorkoutResults";

/**
 * Workout Insights Component
 *
 * This component provides AI-powered analysis and performance insights for workouts.
 * It's organized into several key sections:
 * 1. AI Analysis - For generating and displaying AI insights
 * 2. Performance Trends - Visualizing performance over time
 * 3. Top Improvers - Highlighting athletes with significant progress
 * 4. Workout Completion - Tracking completion rates by group
 * 5. Workout Analysis - Breaking down performance by workout type
 */
export function WorkoutInsights() {
  const { aiInsights, isAnalyzing, generateAIAnalysis } = useWorkoutResults();

  return (
    <div className="space-y-6">
      {/* AI Analysis Section
          - Light blue background for emphasis
          - Info icon and descriptive heading
          - Purple button to generate analysis
          - Empty state with brain icon when no analysis exists */}
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <CardTitle>AI Workout Analysis</CardTitle>
              <CardDescription>
                Get AI-powered insights about your team's performance
              </CardDescription>
            </div>
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={generateAIAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.996.996 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"
                    fill="currentColor"
                  />
                </svg>
                Generate AI Analysis
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              No analysis generated yet. Click the button above to get started.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends Section
          - Graph icon and heading
          - Timeframe selector dropdown
          - Placeholder for trend chart visualization */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z M7 12h2v5H7v-5zm8-5h2v10h-2V7zm-4 7h2v3h-2v-3zm0-4h2v2h-2v-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track performance over time</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label>Timeframe:</Label>
            <Select defaultValue="30">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              Performance trend chart will appear here
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid Section
          - Three-column layout for different metrics
          - Each column has its own color scheme and icon */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Improvers Card
            - Green trend icon
            - Lists athletes with highest improvement percentages
            - Shows name, group, and improvement value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <CardTitle>Top Improvers</CardTitle>
                <CardDescription>
                  Athletes showing the most improvement
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "James Lee",
                  group: "Varsity Boys",
                  improvement: "+12%",
                },
                {
                  name: "Charlotte Lewis",
                  group: "Varsity Girls",
                  improvement: "+9%",
                },
                {
                  name: "Alex Johnson",
                  group: "Varsity Boys",
                  improvement: "+8%",
                },
                {
                  name: "Michael Brown",
                  group: "Varsity Boys",
                  improvement: "+7%",
                },
              ].map((athlete, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{athlete.name}</div>
                    <div className="text-sm text-gray-500">{athlete.group}</div>
                  </div>
                  <div className="text-green-500 font-medium">
                    {athlete.improvement}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Completion Card
            - Yellow checkmark icon
            - Progress bars for each group
            - Shows completion percentage and total workouts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <CardTitle>Workout Completion</CardTitle>
                <CardDescription>Completion rates by group</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  group: "Varsity Boys",
                  completed: 45,
                  total: 50,
                  percentage: 90,
                },
                {
                  group: "Varsity Girls",
                  completed: 38,
                  total: 45,
                  percentage: 84,
                },
                { group: "JV Boys", completed: 30, total: 40, percentage: 75 },
                { group: "JV Girls", completed: 25, total: 35, percentage: 71 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.group}</span>
                    <span className="text-sm text-gray-500">
                      {item.completed}/{item.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Analysis Card
            - Blue chart icon
            - Performance metrics by workout type
            - Shows average pace and completion rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z M7 12h2v5H7v-5zm8-5h2v10h-2V7zm-4 7h2v3h-2v-3zm0-4h2v2h-2v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <CardTitle>Workout Analysis</CardTitle>
                <CardDescription>Performance by workout type</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Interval Workouts",
                  pace: "5:45/mile",
                  completion: "92%",
                },
                { type: "Tempo Runs", pace: "6:15/mile", completion: "88%" },
                { type: "Long Runs", pace: "7:00/mile", completion: "95%" },
                { type: "Recovery Runs", pace: "8:30/mile", completion: "98%" },
              ].map((workout, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{workout.type}</div>
                    <div className="text-sm text-gray-500">
                      Avg Pace: {workout.pace}
                    </div>
                  </div>
                  <div className="text-blue-500 font-medium">
                    {workout.completion}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
