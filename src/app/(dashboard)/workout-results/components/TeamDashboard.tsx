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

/**
 * Team Dashboard Component
 *
 * This component provides a comprehensive overview of team performance and metrics.
 * It's organized into several key sections:
 * 1. Filter Controls - For customizing the data view
 * 2. Top Metrics - Key performance indicators
 * 3. Top Performers & Needs Attention - Individual athlete highlights
 * 4. Best Efforts - Record performances by event
 * 5. Weekly Mileage - Training volume by group
 */
export function TeamDashboard() {
  return (
    // Main container with consistent vertical spacing
    <div className="space-y-6">
      {/* Filter Controls Section
          - Date range selector for viewing different time periods
          - Event type filter for focusing on specific events */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <Label>Date Range:</Label>
            <Select defaultValue="this_week">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="last_week">Last Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Event Type:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="5k">5K</SelectItem>
                <SelectItem value="3200m">3200m</SelectItem>
                <SelectItem value="1600m">1600m</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Top Metrics Section
          - Four key performance indicators displayed as cards
          - Each card shows current value and trend
          - Color-coded icons for visual distinction */}
      <div className="grid grid-cols-4 gap-4">
        {/* Workout Completion Card
            - Shows percentage of completed workouts
            - Includes trend indicator
            - Green checkmark icon */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Workout Completion</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">87%</span>
                  <span className="text-sm text-green-500">
                    +4% from last week
                  </span>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Miles This Week Card
            - Shows total weekly mileage
            - Includes season total and per-athlete average
            - Blue running icon */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Miles This Week</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">428</span>
                  <span className="text-sm text-green-500">
                    +92 from last week
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Season: 4,285 mi</p>
                <p className="text-xs text-gray-500">Avg: 5.6 mi/athlete</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Card
            - Shows overall team performance score
            - Includes trend indicator
            - Purple chart icon */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Team Performance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">82%</span>
                  <span className="text-sm text-red-500">
                    -3% from last month
                  </span>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z M7 12h2v5H7v-5zm8-5h2v10h-2V7zm-4 7h2v3h-2v-3zm0-4h2v2h-2v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Athletes Card
            - Shows number of active athletes
            - Includes total count and injury status
            - Yellow people icon */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Active Athletes</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">76</span>
                  <span className="text-sm text-green-500">
                    +2 from last week
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total: 77</p>
                <p className="text-xs text-gray-500">1 Injured</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers and Needs Attention Section
          - Two-column layout showing positive and negative highlights
          - Each section has its own color scheme and icon */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Performers Card
            - Lists athletes with highest performance scores
            - Shows rank, name, group, and performance note
            - Green upward trend icon */}
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
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Athletes with the highest performance scores
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "James Lee",
                  group: "Varsity Boys",
                  score: 94,
                  note: "Exceptional 5k pace",
                },
                {
                  name: "Alex Johnson",
                  group: "Varsity Boys",
                  score: 91,
                  note: "Strong interval performance",
                },
                {
                  name: "Charlotte Lewis",
                  group: "Varsity Girls",
                  score: 89,
                  note: "Consistent tempo runs",
                },
                {
                  name: "Michael Brown",
                  group: "Varsity Boys",
                  score: 87,
                  note: "Great endurance",
                },
              ].map((athlete, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{index + 1}</div>
                    <div>
                      <div className="font-medium">{athlete.name}</div>
                      <div className="text-sm text-gray-500">
                        {athlete.group}
                      </div>
                      <div className="text-xs text-gray-400">
                        {athlete.note}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{athlete.score}</span>
                    <svg
                      className="h-4 w-4 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Needs Attention Card
            - Lists athletes who need additional support
            - Shows name, group, and specific issue
            - Yellow warning icon */}
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
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <CardTitle>Needs Attention</CardTitle>
                <CardDescription>
                  Athletes who may need additional support
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Isabella Rodriguez",
                  group: "Freshmen",
                  issue: "Inconsistent pacing",
                },
                {
                  name: "Ava Thompson",
                  group: "JV Girls",
                  issue: "Missing workouts",
                },
                {
                  name: "Olivia Martinez",
                  group: "JV Girls",
                  issue: "Recovery concerns",
                },
              ].map((athlete, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-yellow-50 rounded-lg p-3"
                >
                  <div>
                    <div className="font-medium">{athlete.name}</div>
                    <div className="text-sm text-gray-500">{athlete.group}</div>
                  </div>
                  <div className="text-sm text-yellow-600 font-medium">
                    {athlete.issue}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Efforts Section
          - Shows top performances by event type
          - Includes date, athlete name, time, and pace
          - Blue trophy icon */}
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
                  d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <CardTitle>Best Efforts</CardTitle>
              <CardDescription>Top performances by event</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                event: "1600m",
                date: "Mar 10",
                athlete: "James Lee",
                time: "4:21.3",
                pace: "4:21/mile",
              },
              {
                event: "3200m",
                date: "Mar 8",
                athlete: "Charlotte Lewis",
                time: "10:45.2",
                pace: "5:22/mile",
              },
              {
                event: "5K",
                date: "Mar 15",
                athlete: "Alex Johnson",
                time: "16:03.5",
                pace: "5:10/mile",
              },
              {
                event: "400m",
                date: "Mar 5",
                athlete: "Michael Brown",
                time: "52.4",
                pace: "3:29/mile",
              },
            ].map((effort, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16">
                    <div className="font-medium">{effort.event}</div>
                    <div className="text-xs text-blue-500">{effort.date}</div>
                  </div>
                  <div className="font-medium">{effort.athlete}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{effort.time}</div>
                  <div className="text-xs text-gray-500">{effort.pace}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Mileage Section
          - Shows training volume by group
          - Includes progress bars and per-athlete averages
          - Purple list icon */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <CardTitle>Weekly Mileage</CardTitle>
              <CardDescription>Distance by training group</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { group: "Varsity Boys", miles: 52, average: "4.3 mi/athlete" },
              { group: "Varsity Girls", miles: 45, average: "4.5 mi/athlete" },
              { group: "JV Boys", miles: 38, average: "2.1 mi/athlete" },
              { group: "JV Girls", miles: 35, average: "2.3 mi/athlete" },
              { group: "Freshmen", miles: 28, average: "1.3 mi/athlete" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.group}</span>
                  <span className="font-medium">{item.miles} mi</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(item.miles / 52) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">Avg: {item.average}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
