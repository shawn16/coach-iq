import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useWorkoutResults } from "@/hooks/useWorkoutResults";

/**
 * Enter Workout Results Component
 *
 * This component provides an interface for coaches to enter and manage workout results.
 * It's organized into several key sections:
 * 1. Workout Selection - Choose workout type and date
 * 2. Athlete Search & Filter - Find and filter athletes
 * 3. Workout Structure - Display workout details and instructions
 * 4. Results Entry - Input area for athlete times and notes
 * 5. Save Controls - Buttons to save or cancel the entry
 */
export function EnterWorkoutResults() {
  const {
    selectedWorkout,
    setSelectedWorkout,
    workoutDate,
    setWorkoutDate,
    searchQuery,
    setSearchQuery,
    selectedGroup,
    setSelectedGroup,
    athleteResults,
    updateAthleteResult,
  } = useWorkoutResults();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Workout Type</Label>
          <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
            <SelectTrigger>
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interval">Interval Workout</SelectItem>
              <SelectItem value="tempo">Tempo Run</SelectItem>
              <SelectItem value="long">Long Run</SelectItem>
              <SelectItem value="recovery">Recovery Run</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Search Athletes</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8"
              placeholder="Search by name or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Filter by Group:</Label>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="varsity_boys">Varsity Boys</SelectItem>
              <SelectItem value="varsity_girls">Varsity Girls</SelectItem>
              <SelectItem value="jv_boys">JV Boys</SelectItem>
              <SelectItem value="jv_girls">JV Girls</SelectItem>
              <SelectItem value="freshmen">Freshmen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline">{athleteResults.length} Athletes</Badge>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <CardTitle>Workout Structure</CardTitle>
              <CardDescription>
                Interval Workout - 6x800m with 2:00 rest
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Enter times for each interval in the format MM:SS. For example,
              3:45 for 3 minutes and 45 seconds.
            </p>
            <p className="text-sm text-gray-600">Goal pace: 3:00 per 800m</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Athlete</th>
                  <th className="text-left py-2">Group</th>
                  <th className="text-center py-2">Interval 1</th>
                  <th className="text-center py-2">Interval 2</th>
                  <th className="text-center py-2">Interval 3</th>
                  <th className="text-center py-2">Interval 4</th>
                  <th className="text-center py-2">Interval 5</th>
                  <th className="text-center py-2">Interval 6</th>
                  <th className="text-center py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {athleteResults
                  .filter(
                    (athlete) =>
                      selectedGroup === "all" || athlete.group === selectedGroup
                  )
                  .filter((athlete) =>
                    athlete.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((athlete) => (
                    <tr key={athlete.id} className="border-b">
                      <td className="py-3">{athlete.name}</td>
                      <td className="py-3 text-gray-500">{athlete.group}</td>
                      {[...Array(6)].map((_, i) => (
                        <td key={i} className="py-3">
                          <Input
                            className="w-20 text-center"
                            placeholder="MM:SS"
                            value={athlete.results[`interval-${i + 1}`] || ""}
                            onChange={(e) =>
                              updateAthleteResult(
                                athlete.id,
                                `interval-${i + 1}`,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                      <td className="py-3">
                        <Input
                          className="w-32"
                          placeholder="Add notes..."
                          value={athlete.notes || ""}
                          onChange={(e) =>
                            updateAthleteResult(
                              athlete.id,
                              "notes",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Results</Button>
      </div>
    </div>
  );
}
