"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dumbbell,
  Clock,
  Users,
  Plus,
  Play,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
  Printer,
  FileDown,
  Sparkles,
  Lightbulb,
  Target,
  Info,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export default function WorkoutExecutionPage() {
  const router = useRouter()
  const [workoutType, setWorkoutType] = useState("interval")
  const [selectedWorkout, setSelectedWorkout] = useState("")
  const [isManualEntry, setIsManualEntry] = useState(false)
  const [workoutDate, setWorkoutDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [selectedAthleteGroup, setSelectedAthleteGroup] = useState("all")
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDescription, setWorkoutDescription] = useState("")

  const [exercises, setExercises] = useState([
    { id: 1, name: "Warm-up", duration: "10", intensity: "Low", description: "Easy jogging and dynamic stretches" },
    { id: 2, name: "Intervals", duration: "20", intensity: "High", description: "8 x 400m @ 5K pace with 1 min rest" },
    { id: 3, name: "Cool-down", duration: "10", intensity: "Low", description: "Easy jogging and static stretches" },
  ])

  const addExercise = () => {
    const newId = exercises.length > 0 ? Math.max(...exercises.map((ex) => ex.id)) + 1 : 1
    setExercises([...exercises, { id: newId, name: "", duration: "", intensity: "Medium", description: "" }])
  }

  const removeExercise = (id: number) => {
    setExercises(exercises.filter((ex) => ex.id !== id))
  }

  const updateExercise = (id: number, field: string, value: string) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)))
  }

  const moveExercise = (id: number, direction: "up" | "down") => {
    const index = exercises.findIndex((ex) => ex.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === exercises.length - 1)) {
      return
    }

    const newExercises = [...exercises]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap the exercises
    ;[newExercises[index], newExercises[targetIndex]] = [newExercises[targetIndex], newExercises[index]]

    setExercises(newExercises)
  }

  const handleWorkoutSelect = (value: string) => {
    setSelectedWorkout(value)
    if (value === "manual") {
      setIsManualEntry(true)
      setWorkoutName("")
      setWorkoutDescription("")
      setExercises([
        { id: 1, name: "Warm-up", duration: "10", intensity: "Low", description: "Easy jogging and dynamic stretches" },
        { id: 2, name: "Main Set", duration: "20", intensity: "Medium", description: "" },
        {
          id: 3,
          name: "Cool-down",
          duration: "10",
          intensity: "Low",
          description: "Easy jogging and static stretches",
        },
      ])
    } else {
      setIsManualEntry(false)
      // In a real app, this would fetch the workout details from the server
      const workout = savedWorkouts.find((w) => w.id === value)
      if (workout) {
        setWorkoutName(workout.name)
        setWorkoutDescription(workout.description)
        setWorkoutType(workout.type)
        // This would also load the workout components/exercises
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSaveAsPDF = () => {
    // In a real app, this would use a library like jsPDF or browser APIs to save as PDF
    alert("Save as PDF functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Workout Execution</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and execute training workouts for your athletes
          </p>
        </div>
      </div>

      {/* Workout Selector Section */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-md">
              <Dumbbell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-gray-900 dark:text-gray-50">Workout Selector</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Select a saved workout or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workout-select" className="text-gray-700 dark:text-gray-300">
                Select Workout
              </Label>
              <Select value={selectedWorkout} onValueChange={handleWorkoutSelect}>
                <SelectTrigger
                  id="workout-select"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <SelectValue placeholder="Choose a workout or create new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Entry (Create New)</SelectItem>
                  <SelectItem value="divider" disabled>
                    ───────────────────
                  </SelectItem>
                  {savedWorkouts.map((workout) => (
                    <SelectItem key={workout.id} value={workout.id}>
                      {workout.name}
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
                  <SelectItem value="varsity_boys">Varsity Boys</SelectItem>
                  <SelectItem value="varsity_girls">Varsity Girls</SelectItem>
                  <SelectItem value="jv_boys">JV Boys</SelectItem>
                  <SelectItem value="jv_girls">JV Girls</SelectItem>
                  <SelectItem value="freshmen">Freshmen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Workout Details Card */}
          {(isManualEntry || selectedWorkout) && (
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-md">
                    <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Workout Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="workout-name" className="text-gray-700 dark:text-gray-300">
                      Workout Name
                    </Label>
                    <Input
                      id="workout-name"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      placeholder="e.g., Tuesday Interval Session"
                      className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      disabled={!isManualEntry && selectedWorkout !== ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-type" className="text-gray-700 dark:text-gray-300">
                      Workout Type
                    </Label>
                    <Select
                      value={workoutType}
                      onValueChange={setWorkoutType}
                      disabled={!isManualEntry && selectedWorkout !== ""}
                    >
                      <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <SelectValue placeholder="Select workout type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interval">Interval</SelectItem>
                        <SelectItem value="tempo">Tempo</SelectItem>
                        <SelectItem value="long">Long Run</SelectItem>
                        <SelectItem value="recovery">Recovery</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="workout-description" className="text-gray-700 dark:text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="workout-description"
                      value={workoutDescription}
                      onChange={(e) => setWorkoutDescription(e.target.value)}
                      placeholder="Describe the overall workout purpose and goals..."
                      className="min-h-[100px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      disabled={!isManualEntry && selectedWorkout !== ""}
                    />
                  </div>
                </div>

                {isManualEntry && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Workout Components</h3>
                      <Button
                        onClick={addExercise}
                        variant="outline"
                        size="sm"
                        className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Component
                      </Button>
                    </div>

                    {exercises.map((exercise, index) => (
                      <Card key={exercise.id} className="border-gray-200 dark:border-gray-700">
                        <CardHeader className="pb-2 pt-3 px-4 flex flex-row items-center justify-between space-y-0">
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <Input
                              value={exercise.name}
                              onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                              placeholder="Component name"
                              className="border-0 p-0 h-auto text-base font-medium bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 dark:text-gray-50"
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveExercise(exercise.id, "up")}
                              disabled={index === 0}
                              className="h-8 w-8 text-gray-500"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveExercise(exercise.id, "down")}
                              disabled={index === exercises.length - 1}
                              className="h-8 w-8 text-gray-500"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExercise(exercise.id)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-700 dark:text-gray-300">Duration (minutes)</Label>
                            <Input
                              value={exercise.duration}
                              onChange={(e) => updateExercise(exercise.id, "duration", e.target.value)}
                              type="number"
                              min="1"
                              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-gray-700 dark:text-gray-300">Intensity</Label>
                            <Select
                              value={exercise.intensity}
                              onValueChange={(value) => updateExercise(exercise.id, "intensity", value)}
                            >
                              <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Maximum">Maximum</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-sm text-gray-700 dark:text-gray-300">Description</Label>
                            <Textarea
                              value={exercise.description}
                              onChange={(e) => updateExercise(exercise.id, "description", e.target.value)}
                              placeholder="Describe this component..."
                              className="min-h-[80px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Save className="h-4 w-4 mr-1" />
                  Save Workout
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Play className="h-4 w-4 mr-1" />
                  Execute Workout
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Athlete Paces Table */}
          {selectedWorkout && (
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Athlete Paces</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Expected performance metrics for each athlete
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            Athlete
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            Group
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            400m
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            800m
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            1600m
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            3200m
                          </th>
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">
                            5K
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {athletes.slice(0, 5).map((athlete) => (
                          <tr
                            key={athlete.id}
                            className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{athlete.name}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{athlete.group}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">1:05</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">2:25</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">5:10</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">11:05</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">17:45</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                    View All Athletes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI-Generated Content */}
          {selectedWorkout && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Why This Workout Matters */}
              <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                      <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-50">Why This Workout Matters</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>AI-generated insights</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800 text-gray-700 dark:text-gray-300">
                    <p className="mb-3">
                      This interval workout is designed to improve lactate threshold and VO2 max, critical components
                      for 5K race performance. The 400m repeats at 3200m pace create the perfect balance of intensity
                      and volume.
                    </p>
                    <p>For your athletes, this workout will:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Develop race-specific endurance</li>
                      <li>Improve running economy at threshold pace</li>
                      <li>Enhance mental toughness for maintaining pace</li>
                      <li>Provide valuable data on current fitness levels</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Planned Outcomes */}
              <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                      <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-50">Planned Outcomes</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>AI-generated expectations</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-md border border-indigo-100 dark:border-indigo-800 text-gray-700 dark:text-gray-300">
                    <p className="mb-3">
                      Based on current fitness levels and previous workout data, your athletes should achieve the
                      following outcomes:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Varsity Athletes:</p>
                        <p>
                          Complete all 6 x 400m repeats within 2-3 seconds of target pace with consistent or negative
                          splits.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">JV Athletes:</p>
                        <p>Complete at least 5 repeats with no more than 5-second deviation from target pace.</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Recovery Metrics:</p>
                        <p>Heart rates should return to 65-70% of max during recovery intervals.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div>
          {/* Workout Summary Card */}
          {(isManualEntry || selectedWorkout) && (
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm sticky top-6">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Workout Summary</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Overview of your workout plan
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Total Duration</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {isManualEntry
                        ? exercises.reduce((sum, ex) => sum + (Number.parseInt(ex.duration) || 0), 0)
                        : "40"}{" "}
                      minutes
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Components</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {isManualEntry ? exercises.length : "3"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Type</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50 capitalize">{workoutType}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Date</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">{workoutDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 dark:text-gray-300">Intensity Profile</span>
                    <div className="flex gap-1">
                      {["Low", "Medium", "High", "Maximum"].map((intensity) => {
                        const count = isManualEntry
                          ? exercises.filter((ex) => ex.intensity === intensity).length
                          : intensity === "Low"
                            ? 2
                            : intensity === "High"
                              ? 1
                              : 0
                        return count > 0 ? (
                          <div
                            key={intensity}
                            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                              intensity === "Low"
                                ? "bg-green-500"
                                : intensity === "Medium"
                                  ? "bg-blue-500"
                                  : intensity === "High"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                          >
                            {count}
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                {/* Print & Export Section */}
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Workout
                </Button>
                <Button
                  onClick={handleSaveAsPDF}
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Save as PDF
                </Button>
                <Separator className="my-1" />
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Assign to Athletes
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Workouts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Recent Workouts</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              All
            </TabsTrigger>
            <TabsTrigger value="interval" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Interval
            </TabsTrigger>
            <TabsTrigger value="tempo" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Tempo
            </TabsTrigger>
            <TabsTrigger value="long" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Long Run
            </TabsTrigger>
            <TabsTrigger value="strength" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Strength
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interval" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkouts
                .filter((w) => w.type === "interval")
                .map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="tempo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkouts
                .filter((w) => w.type === "tempo")
                .map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="long" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkouts
                .filter((w) => w.type === "long")
                .map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="strength" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentWorkouts
                .filter((w) => w.type === "strength")
                .map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface Workout {
  id: string
  name: string
  type: string
  duration: string
  components: number
  date: string
  athleteGroup: string
}

function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-md ${
                workout.type === "interval"
                  ? "bg-purple-100 dark:bg-purple-900/50"
                  : workout.type === "tempo"
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : workout.type === "long"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : "bg-amber-100 dark:bg-amber-900/50"
              }`}
            >
              <Dumbbell
                className={`h-5 w-5 ${
                  workout.type === "interval"
                    ? "text-purple-600 dark:text-purple-400"
                    : workout.type === "tempo"
                      ? "text-blue-600 dark:text-blue-400"
                      : workout.type === "long"
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                }`}
              />
            </div>
            <div>
              <CardTitle className="text-base text-gray-900 dark:text-gray-50">{workout.name}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 capitalize">
                {workout.type} • {workout.date}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-700 dark:text-gray-300">Duration:</span>
          <span className="font-medium text-gray-900 dark:text-gray-50">{workout.duration}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-700 dark:text-gray-300">Components:</span>
          <span className="font-medium text-gray-900 dark:text-gray-50">{workout.components}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">Athletes:</span>
          <span className="font-medium text-gray-900 dark:text-gray-50">{workout.athleteGroup}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Edit
          </Button>
          <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Play className="h-3 w-3 mr-1" />
            Execute
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Sample data
const recentWorkouts: Workout[] = [
  {
    id: "1",
    name: "Tuesday Interval Session",
    type: "interval",
    duration: "45 min",
    components: 3,
    date: "Mar 12, 2023",
    athleteGroup: "All Athletes",
  },
  {
    id: "2",
    name: "Threshold Tempo Run",
    type: "tempo",
    duration: "60 min",
    components: 4,
    date: "Mar 10, 2023",
    athleteGroup: "Distance Runners",
  },
  {
    id: "3",
    name: "Weekend Long Run",
    type: "long",
    duration: "90 min",
    components: 2,
    date: "Mar 8, 2023",
    athleteGroup: "Distance Runners",
  },
  {
    id: "4",
    name: "Core & Strength Circuit",
    type: "strength",
    duration: "50 min",
    components: 6,
    date: "Mar 7, 2023",
    athleteGroup: "All Athletes",
  },
  {
    id: "5",
    name: "Speed Development",
    type: "interval",
    duration: "55 min",
    components: 5,
    date: "Mar 5, 2023",
    athleteGroup: "Sprinters",
  },
  {
    id: "6",
    name: "Recovery Run",
    type: "long",
    duration: "40 min",
    components: 2,
    date: "Mar 3, 2023",
    athleteGroup: "Distance Runners",
  },
]

// Sample saved workouts for dropdown
const savedWorkouts = [
  {
    id: "saved_1",
    name: "Tuesday Interval Session",
    type: "interval",
    description: "Speed endurance workout with 400m repeats at 3200m pace",
  },
  {
    id: "saved_2",
    name: "Threshold Tempo Run",
    type: "tempo",
    description: "Sustained effort at tempo pace with faster finish",
  },
  {
    id: "saved_3",
    name: "Weekend Long Run",
    type: "long",
    description: "Easy effort run to build aerobic endurance",
  },
  {
    id: "saved_4",
    name: "Core & Strength Circuit",
    type: "strength",
    description: "Full body strength workout with core focus",
  },
  {
    id: "saved_5",
    name: "Speed Development",
    type: "interval",
    description: "Short intervals focused on speed and form",
  },
]

// Sample athlete data
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
]

