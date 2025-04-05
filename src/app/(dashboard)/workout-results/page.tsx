"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  LineChart,
  Save,
  Search,
  TrendingUp,
  Users,
  Sparkles,
  Brain,
  TrendingDown,
  AlertTriangle,
  Award,
  Activity,
  RefreshCw,
  ChevronRight,
  ArrowLeft,
  Medal,
  Timer,
  Flame,
  Zap,
  BarChart,
  CalendarDays,
  Gauge,
  Battery,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
} from "lucide-react"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function WorkoutResultsPage() {
  const [selectedWorkout, setSelectedWorkout] = useState("")
  const [workoutDate, setWorkoutDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAthleteGroup, setSelectedAthleteGroup] = useState("all")
  const [dateRange, setDateRange] = useState("last_30")
  const [workoutCompleted, setWorkoutCompleted] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState(null)
  const [dashboardView, setDashboardView] = useState("team")
  const [dateRangeFilter, setDateRangeFilter] = useState("this_week")
  const [eventTypeFilter, setEventTypeFilter] = useState("all")
  const [date, setDate] = useState(new Date())

  const [aiInsights, setAiInsights] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Function to generate AI analysis
  const generateAIAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI processing time
    setTimeout(() => {
      // In a real app, this would call an API endpoint that processes the data
      // and returns AI-generated insights
      setAiInsights({
        summary:
          "Based on the last 4 weeks of workout data, the team is showing strong improvement in endurance workouts but needs more focus on speed work. Varsity Boys are performing 8% above expectations, while JV Girls are 5% below their targets.",
        metrics: {
          overall: 82,
          endurance: 88,
          speed: 74,
          consistency: 85,
        },
        topPerformers: [
          {
            id: 1,
            name: "James Lee",
            group: "Varsity Boys",
            performance: 12.3,
            insight: "Exceeding 1600m pace targets",
          },
          {
            id: 2,
            name: "Alex Johnson",
            group: "Varsity Boys",
            performance: 9.7,
            insight: "Strong in interval workouts",
          },
          {
            id: 3,
            name: "Charlotte Lewis",
            group: "Varsity Girls",
            performance: 8.5,
            insight: "Consistent tempo performance",
          },
          {
            id: 4,
            name: "Michael Brown",
            group: "Varsity Boys",
            performance: 7.2,
            insight: "Improved 3200m pace",
          },
        ],
        strugglingAthletes: [
          {
            id: 1,
            name: "Isabella Rodriguez",
            group: "Freshmen",
            performance: -8.4,
            insight: "Struggling with interval workouts",
          },
          {
            id: 2,
            name: "Ava Thompson",
            group: "JV Girls",
            performance: -7.1,
            insight: "Below target on tempo runs",
          },
          {
            id: 3,
            name: "William Garcia",
            group: "Freshmen",
            performance: -6.3,
            insight: "Inconsistent pacing",
          },
        ],
        teamTrends: [
          {
            type: "positive",
            title: "Endurance Improvement",
            description:
              "The team has shown a 7% improvement in endurance-based workouts over the past 4 weeks, particularly in tempo runs and long intervals.",
            recommendation: "Continue to build on this strength with progressive overload in endurance workouts.",
          },
          {
            type: "negative",
            title: "Speed Work Lagging",
            description:
              "Speed workouts are showing 5% below expected performance, particularly in shorter intervals (200m-400m).",
            recommendation: "Incorporate more short, high-intensity intervals with full recovery to develop speed.",
          },
          {
            type: "neutral",
            title: "Group Disparities",
            description:
              "There's a significant performance gap between Varsity and JV/Freshmen groups, with Varsity outperforming by 12% on average.",
            recommendation:
              "Consider ability-based workout groups rather than strict team divisions for some sessions.",
          },
        ],
        recommendations: [
          {
            title: "Modify Interval Structure",
            description:
              "Consider adjusting the interval structure for JV and Freshmen groups to include more gradual progressions. Current data suggests the jump in intensity may be too aggressive.",
          },
          {
            title: "Individual Attention Needed",
            description:
              "Schedule one-on-one sessions with the 3 struggling athletes to address technique issues and adjust their training paces.",
          },
          {
            title: "Recovery Analysis",
            description:
              "The data suggests potential inadequate recovery between hard workouts. Consider extending recovery periods or reducing intensity of back-to-back quality sessions.",
          },
          {
            title: "Pacing Strategy",
            description:
              "Implement more structured pacing guidance, especially for newer athletes. Data shows significant pacing inconsistencies in the Freshmen group.",
          },
        ],
      })
      setIsAnalyzing(false)
    }, 2500) // Simulate 2.5 second processing time
  }

  // State for the current workout structure
  const [workoutStructure, setWorkoutStructure] = useState([])

  // Sample athlete results data with pace metrics
  const [athleteResults, setAthleteResults] = useState(
    athletes.map((athlete) => ({
      id: athlete.id,
      name: athlete.name,
      group: athlete.group,
      completed: false,
      paces: {
        "1600": athlete.paces["1600"],
        "3200": athlete.paces["3200"],
        "5k": athlete.paces["5k"],
        tempo: athlete.paces["tempo"],
      },
      results: {},
    })),
  )

  // Filter athletes based on search query and selected group
  const filteredAthletes = athleteResults.filter((athlete) => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGroup = selectedAthleteGroup === "all" || athlete.group === selectedAthleteGroup
    return matchesSearch && matchesGroup
  })

  // Parse workout structure when a workout is selected
  useEffect(() => {
    if (selectedWorkout) {
      const workout = structuredWorkouts.find((w) => w.id === selectedWorkout)
      if (workout) {
        setWorkoutStructure(parseWorkoutStructure(workout.structure))

        // Initialize results object for each athlete
        setAthleteResults((prevResults) =>
          prevResults.map((athlete) => ({
            ...athlete,
            results: initializeResultsObject(parseWorkoutStructure(workout.structure)),
          })),
        )
      }
    }
  }, [selectedWorkout])

  // Parse workout structure into segments
  const parseWorkoutStructure = (structure) => {
    // Split by '+' to get each segment
    const segments = structure.split("+").map((segment) => segment.trim())

    // Parse each segment
    const parsedSegments = []

    segments.forEach((segment) => {
      // Match pattern like "2x200m @ 1600"
      const match = segment.match(/(\d+)x(\d+)m\s*@\s*(\w+)/)

      if (match) {
        const [_, reps, distance, paceType] = match

        // Add each repetition as a separate column
        for (let i = 1; i <= Number.parseInt(reps); i++) {
          parsedSegments.push({
            rep: i,
            distance: Number.parseInt(distance),
            paceType,
            label: `${distance}m #${i} (${paceType})`,
          })
        }
      }
    })

    return parsedSegments
  }

  // Initialize results object with empty strings for each segment
  const initializeResultsObject = (segments) => {
    const results = {}
    segments.forEach((segment, index) => {
      results[index] = ""
    })
    return results
  }

  // Calculate goal time for a segment based on athlete's pace
  const calculateGoalTime = (athlete, segment) => {
    const paceInSeconds = athlete.paces[segment.paceType]
    if (!paceInSeconds) return "N/A"

    // Calculate time for this distance based on pace per 400m
    const timeInSeconds = (segment.distance / 400) * paceInSeconds

    // Format as MM:SS.ss
    return formatTime(timeInSeconds)
  }

  // Format time in seconds to MM:SS.ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const hundredths = Math.floor((timeInSeconds % 1) * 100)

    return `${minutes}:${seconds.toString().padStart(2, "0")}.${hundredths.toString().padStart(2, "0")}`
  }

  // Handle result updates
  const updateAthleteResult = (athleteId, segmentIndex, value) => {
    setAthleteResults(
      athleteResults.map((athlete) =>
        athlete.id === athleteId
          ? {
              ...athlete,
              results: {
                ...athlete.results,
                [segmentIndex]: value,
              },
            }
          : athlete,
      ),
    )
  }

  // Handle saving results
  const saveResults = () => {
    console.log("Saving results:", {
      workout: selectedWorkout,
      date: workoutDate,
      completed: workoutCompleted,
      results: athleteResults,
    })
    // In a real app, this would send data to the server
    alert("Results saved successfully!")
  }

  // Handle selecting an athlete for individual view
  const handleSelectAthlete = (athlete) => {
    setSelectedAthlete(athlete)
    setDashboardView("individual")
  }

  // Handle going back to team view
  const handleBackToTeam = () => {
    setSelectedAthlete(null)
    setDashboardView("team")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-start gap-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Workout Results</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a workout to enter results, analyze team performance, or view training trends.
        </p>
      </div>

      <Tabs defaultValue="enter-results" className="w-full">
        <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger
            value="enter-results"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            Enter Workout Results
          </TabsTrigger>
          <TabsTrigger
            value="workout-insights"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            Workout Insights
          </TabsTrigger>
          <TabsTrigger
            value="team-dashboard"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            Team Dashboard
          </TabsTrigger>
        </TabsList>

        {/* Enter Workout Results Tab */}
        <TabsContent value="enter-results" className="space-y-6">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-50">Enter Workout Results</CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Record athlete performance data for a completed workout
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="workout-select" className="text-gray-700 dark:text-gray-300">
                    Select Workout
                  </Label>
                  <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
                    <SelectTrigger
                      id="workout-select"
                      className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <SelectValue placeholder="Choose a workout" />
                    </SelectTrigger>
                    <SelectContent>
                      {structuredWorkouts.map((workout) => (
                        <SelectItem key={workout.id} value={workout.id}>
                          {workout.name} ({format(new Date(workout.date), "MMM d, yyyy")})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-date" className="text-gray-700 dark:text-gray-300">
                    Workout Date
                  </Label>
                  <Input
                    id="workout-date"
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                    className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="athlete-group" className="text-gray-700 dark:text-gray-300">
                    Athlete Group
                  </Label>
                  <Select value={selectedAthleteGroup} onValueChange={setSelectedAthleteGroup}>
                    <SelectTrigger
                      id="athlete-group"
                      className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <SelectValue placeholder="All Athletes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Athletes</SelectItem>
                      <SelectItem value="Varsity Boys">Varsity Boys</SelectItem>
                      <SelectItem value="Varsity Girls">Varsity Girls</SelectItem>
                      <SelectItem value="JV Boys">JV Boys</SelectItem>
                      <SelectItem value="JV Girls">JV Girls</SelectItem>
                      <SelectItem value="Freshmen">Freshmen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedWorkout && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="workout-completed" checked={workoutCompleted} onCheckedChange={setWorkoutCompleted} />
                    <Label htmlFor="workout-completed" className="text-gray-700 dark:text-gray-300 font-medium">
                      Mark Workout as Complete
                    </Label>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Workout Structure:</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {structuredWorkouts.find((w) => w.id === selectedWorkout)?.structure}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>Enter times in MM:SS.ss format (e.g., 1:45.30)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search athletes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    onClick={saveResults}
                    disabled={!selectedWorkout}
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Results
                  </Button>
                </div>
              </div>

              {selectedWorkout && workoutStructure.length > 0 ? (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 whitespace-nowrap sticky left-0 bg-gray-100 dark:bg-gray-800 z-10"
                          >
                            Athlete
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            Group
                          </th>
                          {workoutStructure.map((segment, index) => (
                            <th key={index} scope="col" className="px-4 py-3 whitespace-nowrap">
                              {segment.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAthletes.map((athlete) => (
                          <tr
                            key={athlete.id}
                            className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-900 z-10">
                              {athlete.name}
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {athlete.group}
                            </td>
                            {workoutStructure.map((segment, index) => (
                              <td key={index} className="px-4 py-3">
                                <div className="flex flex-col gap-1">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          Goal: {calculateGoalTime(athlete, segment)}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Target time based on {segment.paceType} pace</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <Input
                                    value={athlete.results[index] || ""}
                                    onChange={(e) => updateAthleteResult(athlete.id, index, e.target.value)}
                                    placeholder="MM:SS.ss"
                                    className="h-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                  />
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No Workout Selected</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Please select a workout from the dropdown above to enter results.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedWorkout ? `Showing ${filteredAthletes.length} of ${athletes.length} athletes` : ""}
              </div>
              {selectedWorkout && (
                <Button onClick={saveResults} className="bg-rose-600 hover:bg-rose-700 text-white">
                  <Save className="h-4 w-4 mr-1" />
                  Save Results
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Workout Insights Tab */}
        <TabsContent value="workout-insights" className="space-y-6">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                    <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-50">AI Workout Analysis</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      AI-powered insights based on your team's workout data
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={generateAIAnalysis}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!aiInsights ? (
                <div className="text-center py-8">
                  <Brain className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No AI Analysis Generated Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    Click the "Generate AI Analysis" button to analyze your team's workout data and receive AI-powered
                    insights.
                  </p>
                  <Button onClick={generateAIAnalysis} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* AI Summary Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                          <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardTitle className="text-gray-900 dark:text-gray-50">Performance Summary</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800 text-gray-700 dark:text-gray-300">
                        <p className="mb-2">{aiInsights.summary}</p>
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Overall Performance</span>
                              <span className="font-medium">{aiInsights.metrics.overall}%</span>
                            </div>
                            <Progress value={aiInsights.metrics.overall} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Endurance</span>
                              <span className="font-medium">{aiInsights.metrics.endurance}%</span>
                            </div>
                            <Progress
                              value={aiInsights.metrics.endurance}
                              className="h-2 bg-gray-200 dark:bg-gray-700"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Speed</span>
                              <span className="font-medium">{aiInsights.metrics.speed}%</span>
                            </div>
                            <Progress value={aiInsights.metrics.speed} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Consistency</span>
                              <span className="font-medium">{aiInsights.metrics.consistency}%</span>
                            </div>
                            <Progress
                              value={aiInsights.metrics.consistency}
                              className="h-2 bg-gray-200 dark:bg-gray-700"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Performers Card */}
                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                            <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Top Performers</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Athletes exceeding their expected performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="space-y-4">
                          {aiInsights.topPerformers.map((athlete, index) => (
                            <div
                              key={athlete.id}
                              className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-green-600 dark:text-green-400">
                                  {athlete.performance > 0 ? "+" : ""}
                                  {athlete.performance}%
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.insight}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Struggling Athletes Card */}
                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-md">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Needs Attention</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Athletes who may need additional support
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="space-y-4">
                          {aiInsights.strugglingAthletes.map((athlete) => (
                            <div
                              key={athlete.id}
                              className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-800"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-amber-600 dark:text-amber-400">{athlete.performance}%</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.insight}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Team Trends Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-gray-900 dark:text-gray-50">Team Trends</CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Overall patterns in team performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-4">
                        {aiInsights.teamTrends.map((trend, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`p-1 rounded-full ${
                                  trend.type === "positive"
                                    ? "bg-green-100 dark:bg-green-800"
                                    : trend.type === "negative"
                                      ? "bg-red-100 dark:bg-red-800"
                                      : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                {trend.type === "positive" ? (
                                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                ) : trend.type === "negative" ? (
                                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                                ) : (
                                  <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                )}
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">{trend.title}</h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{trend.description}</p>
                            {trend.recommendation && (
                              <div className="mt-2 text-sm bg-white dark:bg-gray-800 p-2 rounded border border-blue-100 dark:border-blue-800">
                                <span className="font-medium">Recommendation:</span> {trend.recommendation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Recommendations Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <CardTitle className="text-gray-900 dark:text-gray-50">AI Recommendations</CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Suggested actions based on analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-4">
                        {aiInsights.recommendations.map((recommendation, index) => (
                          <div
                            key={index}
                            className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md border border-indigo-100 dark:border-indigo-800"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                              {recommendation.title}
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm col-span-3">
              <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                      <LineChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-gray-50">Performance Trends</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-[180px] h-8 text-xs border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last_7">Last 7 days</SelectItem>
                        <SelectItem value="last_30">Last 30 days</SelectItem>
                        <SelectItem value="last_90">Last 90 days</SelectItem>
                        <SelectItem value="season">Current season</SelectItem>
                        <SelectItem value="year">Last 12 months</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80 w-full">
                  {/* This would be a chart in a real app */}
                  <div className="h-full w-full bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 mx-auto text-indigo-500 dark:text-indigo-400 mb-2" />
                      <p className="text-gray-700 dark:text-gray-300 font-medium">Performance Trend Chart</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Showing average pace improvements over time
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Top Improvers</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Athletes with the most improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {topImprovers.map((athlete, index) => (
                    <div key={athlete.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600 dark:text-green-400">+{athlete.improvement}%</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-md">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Workout Completion</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Workout completion rates by group
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {completionRates.map((group) => (
                    <div key={group.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{group.name}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{group.rate}%</p>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${group.rate}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Workout Analysis</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Performance metrics by workout type
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {workoutAnalysis.map((workout) => (
                    <div key={workout.type} className="space-y-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{workout.type}</p>
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600 dark:text-gray-400">Avg. Pace:</p>
                        <p className="text-gray-900 dark:text-gray-100">{workout.avgPace}</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600 dark:text-gray-400">Completion:</p>
                        <p className="text-gray-900 dark:text-gray-100">{workout.completion}%</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600 dark:text-gray-400">Trend:</p>
                        <p
                          className={
                            workout.trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }
                        >
                          {workout.trend > 0 ? "+" : ""}
                          {workout.trend}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Recent Workout Results</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Workout
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Type
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Participants
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Avg. Pace
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Completion
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentWorkouts.map((workout) => (
                        <tr
                          key={workout.id}
                          className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{workout.name}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {format(new Date(workout.date), "MMM d, yyyy")}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                workout.type === "interval"
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                                  : workout.type === "tempo"
                                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                                    : workout.type === "long"
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                              }`}
                            >
                              {workout.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{workout.participants}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{workout.avgPace}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2 w-24">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{ width: `${workout.completion}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{workout.completion}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-700 dark:text-gray-300">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Dashboard Tab */}
        <TabsContent value="team-dashboard" className="space-y-6">
          {dashboardView === "team" ? (
            <>
              {/* Team View */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Team Dashboard</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="date-range" className="text-sm text-gray-700 dark:text-gray-300">
                      Date Range:
                    </Label>
                    <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                      <SelectTrigger
                        id="date-range"
                        className="w-[160px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="this_week">This Week</SelectItem>
                        <SelectItem value="last_week">Last Week</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                        <SelectItem value="last_month">Last Month</SelectItem>
                        <SelectItem value="this_season">This Season</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="event-type" className="text-sm text-gray-700 dark:text-gray-300">
                      Event Type:
                    </Label>
                    <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                      <SelectTrigger
                        id="event-type"
                        className="w-[160px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="interval">Interval</SelectItem>
                        <SelectItem value="tempo">Tempo</SelectItem>
                        <SelectItem value="long_run">Long Run</SelectItem>
                        <SelectItem value="race">Race</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Top Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 dark:text-gray-50 text-base">Workout Completion</CardTitle>
                      <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-md">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">87%</p>
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +4% from last week
                        </p>
                      </div>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-50 dark:bg-green-900/20">
                        <div className="h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">87%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 dark:text-gray-50 text-base">Miles This Week</CardTitle>
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-md">
                        <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">428</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +32 from last week
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Season: 4,285 mi</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Avg: 5.6 mi/athlete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 dark:text-gray-50 text-base">Team Performance</CardTitle>
                      <div className="bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-md">
                        <BarChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">82%</p>
                        <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +3% from last month
                        </p>
                      </div>
                      <div className="space-y-1 w-20">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 dark:text-gray-50 text-base">Active Athletes</CardTitle>
                      <div className="bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-md">
                        <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">76</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +2 from last week
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total: 77</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">1 injured</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Top Performers Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                            <Medal className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-gray-900 dark:text-gray-50">Top Performers</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              Athletes with the highest performance scores
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {topPerformers.map((athlete, index) => (
                          <div
                            key={athlete.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 cursor-pointer transition-colors"
                            onClick={() => handleSelectAthlete(athlete)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={athlete.name} />
                                  <AvatarFallback>
                                    {athlete.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                <span>{athlete.score}</span>
                                <ChevronRight className="h-4 w-4" />
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.highlight}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Most Improved Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-gray-900 dark:text-gray-50">Most Improved</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              Athletes showing the greatest improvement
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {mostImproved.map((athlete, index) => (
                          <div
                            key={athlete.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer transition-colors"
                            onClick={() => handleSelectAthlete(athlete)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={athlete.name} />
                                  <AvatarFallback>
                                    {athlete.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                                <span>+{athlete.improvement}%</span>
                                <ChevronRight className="h-4 w-4" />
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.metric}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Race Performances */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                            <Flame className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-gray-900 dark:text-gray-50">Recent Race Performances</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              Latest competition results
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-6">
                        {recentRaces.map((race) => (
                          <div key={race.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                                >
                                  {race.date}
                                </Badge>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{race.name}</h3>
                              </div>
                              <Badge>{race.distance}</Badge>
                            </div>
                            <div className="space-y-2">
                              {race.results.slice(0, 3).map((result, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 cursor-pointer transition-colors"
                                  onClick={() => handleSelectAthlete(athletes.find((a) => a.name === result.name))}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                      {result.place}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-7 w-7">
                                        <AvatarImage src={`/placeholder.svg?height=28&width=28`} alt={result.name} />
                                        <AvatarFallback>
                                          {result.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className="font-medium text-gray-900 dark:text-gray-100">{result.name}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{result.time}</p>
                                    {result.pr && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                                      >
                                        PR
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                              {race.results.length > 3 && (
                                <Button variant="ghost" size="sm" className="w-full text-gray-700 dark:text-gray-300">
                                  View all {race.results.length} results
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Struggling Athletes Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-md">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Needs Attention</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {strugglingAthletes.map((athlete) => (
                          <div
                            key={athlete.id}
                            className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700 cursor-pointer transition-colors"
                            onClick={() => handleSelectAthlete(athlete)}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={athlete.name} />
                                <AvatarFallback>
                                  {athlete.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{athlete.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{athlete.group}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                <span>{athlete.issue}</span>
                                <ChevronRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Best Efforts Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                            <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Best Efforts</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {bestEfforts.map((effort) => (
                          <div key={effort.distance} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{effort.distance}</h3>
                              <Badge
                                variant="outline"
                                className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                              >
                                {effort.date}
                              </Badge>
                            </div>
                            <div
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer transition-colors"
                              onClick={() => handleSelectAthlete(athletes.find((a) => a.name === effort.athlete))}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarImage src={`/placeholder.svg?height=28&width=28`} alt={effort.athlete} />
                                  <AvatarFallback>
                                    {effort.athlete
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{effort.athlete}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900 dark:text-gray-100">{effort.time}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{effort.pace}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Mileage Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                            <Timer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Weekly Mileage</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {weeklyMileage.map((group) => (
                          <div key={group.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{group.name}</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{group.miles} mi</p>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${(group.miles / Math.max(...weeklyMileage.map((g) => g.miles))) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Avg: {group.average} mi/athlete</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Individual Athlete View */}
              {selectedAthlete && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      onClick={handleBackToTeam}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Team View
                    </Button>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="date-range-individual" className="text-sm text-gray-700 dark:text-gray-300">
                          Date Range:
                        </Label>
                        <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                          <SelectTrigger
                            id="date-range-individual"
                            className="w-[160px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          >
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="this_week">This Week</SelectItem>
                            <SelectItem value="last_week">Last Week</SelectItem>
                            <SelectItem value="this_month">This Month</SelectItem>
                            <SelectItem value="last_month">Last Month</SelectItem>
                            <SelectItem value="this_season">This Season</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Athlete Profile Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={selectedAthlete.name} />
                          <AvatarFallback className="text-2xl">
                            {selectedAthlete.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                {selectedAthlete.name}
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400">{selectedAthlete.group}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant="outline"
                                className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              >
                                Distance
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                              >
                                5K Specialist
                              </Badge>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">Junior</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Seasons</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">XC, Track</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Primary Events</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">1600m, 3200m, 5K</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Mileage</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">42 miles</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Training Readiness Score Card */}
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                          <Gauge className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Training Readiness</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400">
                            AI-generated readiness score based on recent workout data
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col items-center justify-center">
                          <div className="relative h-36 w-36 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-8 border-gray-100 dark:border-gray-800"></div>
                            <div
                              className="absolute inset-0 rounded-full border-8 border-green-500 dark:border-green-500"
                              style={{
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                                clip: "rect(0px, 144px, 144px, 72px)",
                              }}
                            ></div>
                            <div className="text-center">
                              <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">85</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">out of 100</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                              Ready for Training
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            >
                              +3 from last week
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">Fatigue</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">Low</span>
                            </div>
                            <Progress value={25} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">Recovery</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">Good</span>
                            </div>
                            <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">Form</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">Excellent</span>
                            </div>
                            <Progress value={90} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">Consistency</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">Very Good</span>
                            </div>
                            <Progress value={80} className="h-2 bg-gray-200 dark:bg-gray-700" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">AI Recommendation</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Athlete is showing good recovery and is ready for a challenging workout. Consider including
                          more threshold work this week to capitalize on current form. Monitor fatigue levels after
                          intense sessions.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Workout Performance Graph */}
                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm md:col-span-2">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                              <LineChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-900 dark:text-gray-50">Workout Performance</CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400">
                                Performance trends over time
                              </CardDescription>
                            </div>
                          </div>
                          <Select defaultValue="5k_pace">
                            <SelectTrigger className="w-[160px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <SelectValue placeholder="Select metric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5k_pace">5K Pace</SelectItem>
                              <SelectItem value="1600m_pace">1600m Pace</SelectItem>
                              <SelectItem value="tempo_pace">Tempo Pace</SelectItem>
                              <SelectItem value="long_run">Long Run</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="h-80 w-full">
                          {/* This would be a chart in a real app */}
                          <div className="h-full w-full bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                            <div className="text-center">
                              <LineChart className="h-12 w-12 mx-auto text-indigo-500 dark:text-indigo-400 mb-2" />
                              <p className="text-gray-700 dark:text-gray-300 font-medium">Performance Trend Chart</p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                Showing pace improvements over time
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Best Performances */}
                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-md">
                            <Medal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <CardTitle className="text-gray-900 dark:text-gray-50">Best Performances</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {athleteBestPerformances.map((performance) => (
                            <div
                              key={performance.event}
                              className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{performance.event}</h4>
                                {performance.pr && (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                                  >
                                    PR
                                  </Badge>
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{performance.time}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{performance.date}</p>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{performance.location}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Workouts and Training Load */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm md:col-span-2">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                              <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <CardTitle className="text-gray-900 dark:text-gray-50">Recent Workouts</CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400">
                                Latest completed workouts
                              </CardDescription>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                            View All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {athleteRecentWorkouts.map((workout) => (
                            <div
                              key={workout.id}
                              className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                  >
                                    {workout.date}
                                  </Badge>
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{workout.name}</h4>
                                </div>
                                <Badge
                                  className={`
                                  ${
                                    workout.type === "interval"
                                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                                      : workout.type === "tempo"
                                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                                        : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                  }
                                `}
                                >
                                  {workout.type}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">{workout.description}</div>
                              <div className="flex flex-wrap gap-2">
                                {workout.metrics.map((metric, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700"
                                  >
                                    <span className="text-gray-700 dark:text-gray-300">{metric.name}:</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{metric.value}</span>
                                    {metric.performance > 0 ? (
                                      <ThumbsUp className="h-3 w-3 text-green-500" />
                                    ) : metric.performance < 0 ? (
                                      <ThumbsDown className="h-3 w-3 text-red-500" />
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                            <Battery className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-gray-900 dark:text-gray-50">Training Load</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              Weekly training volume
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">42.5 mi</p>
                            <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center justify-center">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              +3.2 from last week
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Easy Miles</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">28.3 mi</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Tempo</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">8.2 mi</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "19%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span className="text-gray-700 dark:text-gray-300">Interval</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">6.0 mi</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "14%" }}></div>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Weekly Goal</h4>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-700 dark:text-gray-300">40-45 miles</p>
                              <Badge
                                variant="outline"
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                On Track
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add structured workout data with segments
const structuredWorkouts = [
  {
    id: "1",
    name: "Tuesday Interval Session",
    type: "interval",
    date: "2023-03-12",
    structure: "2x200m @ 1600 + 6x400m @ 3200 + 2x200m @ 1600",
    description: "Speed endurance workout with 400m repeats at 3200m pace",
  },
  {
    id: "2",
    name: "Threshold Tempo Run",
    type: "tempo",
    date: "2023-03-10",
    structure: "3x1600m @ tempo + 2x800m @ 5k",
    description: "Sustained effort at tempo pace with faster finish",
  },
  {
    id: "3",
    name: "Speed Development",
    type: "interval",
    date: "2023-03-05",
    structure: "6x200m @ 1600 + 4x400m @ 3200",
    description: "Speed development with short recovery",
  },
  {
    id: "4",
    name: "Race Simulation",
    type: "interval",
    date: "2023-03-01",
    structure: "2x1600m @ 5k + 4x400m @ 1600",
    description: "Race pace practice with finishing speed",
  },
  {
    id: "5",
    name: "Ladder Workout",
    type: "interval",
    date: "2023-02-25",
    structure: "1x400m @ 1600 + 1x800m @ 3200 + 1x1200m @ 5k + 1x800m @ 3200 + 1x400m @ 1600",
    description: "Ladder workout with varying distances",
  },
]

// Update athlete data to include pace information
const athletes = [
  {
    id: 1,
    name: "Alex Johnson",
    group: "Varsity Boys",
    paces: { "1600": 75, "3200": 80, "5k": 85, tempo: 90 }, // seconds per 400m
  },
  {
    id: 2,
    name: "Emma Smith",
    group: "Varsity Girls",
    paces: { "1600": 85, "3200": 90, "5k": 95, tempo: 100 },
  },
  {
    id: 3,
    name: "Michael Brown",
    group: "Varsity Boys",
    paces: { "1600": 72, "3200": 78, "5k": 82, tempo: 88 },
  },
  {
    id: 4,
    name: "Sophia Davis",
    group: "Varsity Girls",
    paces: { "1600": 82, "3200": 88, "5k": 92, tempo: 98 },
  },
  {
    id: 5,
    name: "Ethan Wilson",
    group: "JV Boys",
    paces: { "1600": 80, "3200": 85, "5k": 90, tempo: 95 },
  },
  {
    id: 6,
    name: "Olivia Martinez",
    group: "JV Girls",
    paces: { "1600": 90, "3200": 95, "5k": 100, tempo: 105 },
  },
  {
    id: 7,
    name: "Noah Anderson",
    group: "JV Boys",
    paces: { "1600": 82, "3200": 88, "5k": 93, tempo: 98 },
  },
  {
    id: 8,
    name: "Ava Thompson",
    group: "JV Girls",
    paces: { "1600": 92, "3200": 98, "5k": 103, tempo: 108 },
  },
  {
    id: 9,
    name: "William Garcia",
    group: "Freshmen",
    paces: { "1600": 88, "3200": 94, "5k": 100, tempo: 105 },
  },
  {
    id: 10,
    name: "Isabella Rodriguez",
    group: "Freshmen",
    paces: { "1600": 95, "3200": 102, "5k": 108, tempo: 114 },
  },
  {
    id: 11,
    name: "James Lee",
    group: "Varsity Boys",
    paces: { "1600": 70, "3200": 76, "5k": 80, tempo: 85 },
  },
  {
    id: 12,
    name: "Charlotte Lewis",
    group: "Varsity Girls",
    paces: { "1600": 80, "3200": 86, "5k": 90, tempo: 96 },
  },
]

// Keep the other sample data as is
const athleteGroups = [
  { id: 1, name: "Varsity Boys", count: 12 },
  { id: 2, name: "Varsity Girls", count: 10 },
  { id: 3, name: "JV Boys", count: 18 },
  { id: 4, name: "JV Girls", count: 15 },
  { id: 5, name: "Freshmen", count: 22 },
]

const recentWorkouts = [
  {
    id: "1",
    name: "Tuesday Interval Session",
    type: "interval",
    date: "2023-03-12",
    participants: 24,
    avgPace: "6:45/mi",
    completion: 92,
  },
  {
    id: "2",
    name: "Threshold Tempo Run",
    type: "tempo",
    date: "2023-03-10",
    participants: 18,
    avgPace: "7:10/mi",
    completion: 85,
  },
  {
    id: "3",
    name: "Weekend Long Run",
    type: "long",
    date: "2023-03-08",
    participants: 20,
    avgPace: "8:15/mi",
    completion: 78,
  },
  {
    id: "4",
    name: "Core & Strength Circuit",
    type: "strength",
    date: "2023-03-07",
    participants: 26,
    avgPace: "N/A",
    completion: 95,
  },
  {
    id: "5",
    name: "Speed Development",
    type: "interval",
    date: "2023-03-05",
    participants: 22,
    avgPace: "6:30/mi",
    completion: 88,
  },
]

const topImprovers = [
  { id: 1, name: "Noah Anderson", group: "JV Boys", improvement: 12.5, metric: "5K pace" },
  { id: 2, name: "Emma Smith", group: "Varsity Girls", improvement: 10.2, metric: "Mile time" },
  { id: 3, name: "William Garcia", group: "Freshmen", improvement: 9.7, metric: "400m time" },
  { id: 4, name: "Sophia Davis", group: "Varsity Girls", improvement: 8.3, metric: "Long run pace" },
  { id: 5, name: "Ethan Wilson", group: "JV Boys", improvement: 7.8, metric: "Tempo pace" },
]

const completionRates = [
  { name: "Varsity Boys", rate: 94 },
  { name: "Varsity Girls", rate: 92 },
  { name: "JV Boys", rate: 85 },
  { name: "JV Girls", rate: 83 },
  { name: "Freshmen", rate: 78 },
]

const workoutAnalysis = [
  { type: "Interval", avgPace: "6:35/mi", completion: 88, trend: 5.2 },
  { type: "Tempo", avgPace: "7:05/mi", completion: 85, trend: 3.8 },
  { type: "Long Run", avgPace: "8:10/mi", completion: 80, trend: 2.5 },
  { type: "Recovery", avgPace: "9:15/mi", completion: 95, trend: -1.2 },
]

// Team Dashboard data
const topPerformers = [
  { id: 11, name: "James Lee", group: "Varsity Boys", score: 94, highlight: "Exceptional 5K pace" },
  { id: 1, name: "Alex Johnson", group: "Varsity Boys", score: 91, highlight: "Strong interval performance" },
  { id: 12, name: "Charlotte Lewis", group: "Varsity Girls", score: 89, highlight: "Consistent tempo runs" },
  { id: 3, name: "Michael Brown", group: "Varsity Boys", score: 87, highlight: "Great endurance" },
]

const mostImproved = [
  { id: 7, name: "Noah Anderson", group: "JV Boys", improvement: 12.5, metric: "5K pace" },
  { id: 2, name: "Emma Smith", group: "Varsity Girls", improvement: 10.2, metric: "Mile time" },
  { id: 9, name: "William Garcia", group: "Freshmen", improvement: 9.7, metric: "400m time" },
  { id: 4, name: "Sophia Davis", group: "Varsity Girls", improvement: 8.3, metric: "Long run pace" },
]

const strugglingAthletes = [
  { id: 10, name: "Isabella Rodriguez", group: "Freshmen", issue: "Inconsistent pacing" },
  { id: 8, name: "Ava Thompson", group: "JV Girls", issue: "Missing workouts" },
  { id: 6, name: "Olivia Martinez", group: "JV Girls", issue: "Recovery concerns" },
]

const recentRaces = [
  {
    id: 1,
    name: "City Championships",
    date: "Mar 15, 2023",
    distance: "5K",
    results: [
      { place: 1, name: "James Lee", time: "15:42", pr: true },
      { place: 3, name: "Alex Johnson", time: "16:03", pr: false },
      { place: 5, name: "Michael Brown", time: "16:18", pr: true },
      { place: 8, name: "Ethan Wilson", time: "16:45", pr: false },
    ],
  },
  {
    id: 2,
    name: "Invitational Meet",
    date: "Mar 8, 2023",
    distance: "3200m",
    results: [
      { place: 2, name: "Charlotte Lewis", time: "10:45", pr: true },
      { place: 4, name: "Emma Smith", time: "11:02", pr: false },
      { place: 6, name: "Sophia Davis", time: "11:23", pr: true },
      { place: 9, name: "Olivia Martinez", time: "11:56", pr: false },
    ],
  },
]

const bestEfforts = [
  { distance: "1600m", athlete: "James Lee", time: "4:21.3", pace: "4:21/mile", date: "Mar 10" },
  { distance: "3200m", athlete: "Charlotte Lewis", time: "10:45.2", pace: "5:22/mile", date: "Mar 8" },
  { distance: "5K", athlete: "Alex Johnson", time: "16:03.5", pace: "5:10/mile", date: "Mar 15" },
  { distance: "400m", athlete: "Michael Brown", time: "52.4", pace: "3:29/mile", date: "Mar 5" },
]

const weeklyMileage = [
  { name: "Varsity Boys", miles: 52, average: 4.3 },
  { name: "Varsity Girls", miles: 45, average: 4.5 },
  { name: "JV Boys", miles: 38, average: 2.1 },
  { name: "JV Girls", miles: 35, average: 2.3 },
  { name: "Freshmen", miles: 28, average: 1.3 },
]

// Individual athlete data
const athleteBestPerformances = [
  { event: "5K", time: "16:03.5", date: "Mar 15, 2023", location: "City Championships", pr: true },
  { event: "3200m", time: "9:48.2", date: "Mar 1, 2023", location: "Dual Meet", pr: false },
  { event: "1600m", time: "4:32.5", date: "Feb 15, 2023", location: "Indoor Championships", pr: true },
  { event: "800m", time: "2:05.3", date: "Feb 8, 2023", location: "Time Trial", pr: false },
]

const athleteRecentWorkouts = [
  {
    id: 1,
    name: "Tuesday Interval Session",
    type: "interval",
    date: "Mar 12, 2023",
    description: "8x400m @ 3200m pace with 90sec recovery",
    metrics: [
      { name: "Avg. Pace", value: "5:20/mi", performance: 1 },
      { name: "Consistency", value: "3sec range", performance: 1 },
      { name: "Recovery HR", value: "142bpm", performance: 0 },
    ],
  },
  {
    id: 2,
    name: "Threshold Tempo Run",
    type: "tempo",
    date: "Mar 10, 2023",
    description: "25min continuous @ tempo pace",
    metrics: [
      { name: "Avg. Pace", value: "5:45/mi", performance: 1 },
      { name: "Avg. HR", value: "168bpm", performance: 0 },
      { name: "RPE", value: "7/10", performance: 0 },
    ],
  },
  {
    id: 3,
    name: "Long Run",
    type: "long_run",
    date: "Mar 8, 2023",
    description: "12 miles easy with last 2 miles moderate",
    metrics: [
      { name: "Avg. Pace", value: "7:15/mi", performance: 0 },
      { name: "Distance", value: "12.2mi", performance: 1 },
      { name: "Elevation", value: "450ft", performance: 0 },
    ],
  },
]

