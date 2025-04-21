"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ArrowLeft,
  Users,
  Save,
  Plus,
  Info,
  ListTodo,
  Equal,
  MoreHorizontal,
  Trash2,
  Copy,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlanType,
  WorkoutType,
  IntensityLevel,
  TrainingPlanInput,
  WorkoutInput,
} from "@/types/training";
import { WorkoutEditor } from "@/components/workout-editor";
import { AthleteDisplay } from "@/types/athlete";
import {
  createTrainingPlanAction,
  getTrainingPlanAction,
  updateTrainingPlanAction,
} from "./actions";

export default function PlanBuilderPage() {
  const router = useRouter();
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditing, setIsEditing] = useState(!!params?.id);
  const [currentTab, setCurrentTab] = useState("details");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [planId, setPlanId] = useState<string | null>(
    (params?.id as string) || null
  );

  // Plan details state
  const [planDetails, setPlanDetails] = useState<TrainingPlanInput>({
    title: "",
    description: "",
    type: "endurance",
    startDate: format(new Date(), "yyyy-MM-dd"),
    duration: "12 weeks",
  });

  // Workouts state
  const [workouts, setWorkouts] = useState<WorkoutInput[]>([]);
  const [assignedAthletes, setAssignedAthletes] = useState<AthleteDisplay[]>(
    []
  );

  // Calculate total days based on duration
  const totalDays = parseInt(planDetails.duration.split(" ")[0]) * 7;

  // Generate an array of day numbers from 1 to totalDays
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlanDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dropdown selection changes
  const handleSelectChange = (name: string, value: string) => {
    setPlanDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date selection
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setPlanDetails((prev) => ({
        ...prev,
        startDate: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  // Handle workout creation or update
  const handleWorkoutSave = (workout: WorkoutInput) => {
    // Check if this workout already exists for this day
    const existingIndex = workouts.findIndex((w) => w.day === workout.day);

    if (existingIndex !== -1) {
      // Update existing workout
      setWorkouts((prev) => {
        const updated = [...prev];
        updated[existingIndex] = workout;
        return updated;
      });
    } else {
      // Add new workout
      setWorkouts((prev) => [...prev, workout]);
    }

    // Close the workout editor
    setSelectedDay(null);
  };

  // Handle workout deletion
  const handleWorkoutDelete = (day: number) => {
    setWorkouts((prev) => prev.filter((w) => w.day !== day));
    setSelectedDay(null);
  };

  // Handle workout duplication
  const handleWorkoutDuplicate = (day: number) => {
    const workout = workouts.find((w) => w.day === day);
    if (!workout) return;

    // Create a copy of the workout
    const newWorkout: WorkoutInput = {
      ...workout,
      day: day + 1,
    };

    // Check if the target day already has a workout
    const existingIndex = workouts.findIndex((w) => w.day === newWorkout.day);
    if (existingIndex !== -1) {
      // Ask for confirmation before overwriting
      if (
        !confirm(
          `Day ${newWorkout.day} already has a workout. Do you want to replace it?`
        )
      ) {
        return;
      }

      // Replace the existing workout
      setWorkouts((prev) => {
        const updated = [...prev];
        updated[existingIndex] = newWorkout;
        return updated;
      });
    } else {
      // Add new workout
      setWorkouts((prev) => [...prev, newWorkout]);
    }
  };

  // Handle plan saving
  const handleSavePlan = async () => {
    // Validate plan details
    if (!planDetails.title.trim()) {
      alert("Please enter a plan title");
      return;
    }

    if (!planDetails.startDate) {
      alert("Please select a start date");
      return;
    }

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("title", planDetails.title);
      formData.append("description", planDetails.description);
      formData.append("type", planDetails.type);
      formData.append("startDate", planDetails.startDate);
      formData.append("duration", planDetails.duration);
      formData.append("workouts", JSON.stringify(workouts));
      formData.append("athletes", JSON.stringify(assignedAthletes));

      let result;
      if (isEditing && planId) {
        result = await updateTrainingPlanAction(planId, formData);
      } else {
        result = await createTrainingPlanAction(formData);
      }

      if (!result.success) {
        alert(`Failed to save plan: ${result.error}`);
        return;
      }

      // Navigate back to training plans list
      router.push("/planning/training-plan");
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("An unexpected error occurred while saving the plan");
    }
  };

  // Load plan data if editing existing plan
  useEffect(() => {
    if (isEditing && planId) {
      const loadPlan = async () => {
        try {
          const result = await getTrainingPlanAction(planId);

          if (!result.success || !result.plan) {
            console.error("Failed to load plan:", result.error);
            return;
          }

          // Set plan details
          setPlanDetails({
            title: result.plan.title || "",
            description: result.plan.description || "",
            type: (result.plan.type as PlanType) || "endurance",
            startDate:
              result.plan.startDate || format(new Date(), "yyyy-MM-dd"),
            duration: result.plan.duration || "12 weeks",
          });

          // Set workouts
          if (result.workouts) {
            setWorkouts(result.workouts);
          }

          // Set assigned athletes
          if (result.athletes) {
            setAssignedAthletes(result.athletes);
          }
        } catch (error) {
          console.error("Error loading plan:", error);
        }
      };

      loadPlan();
    }
  }, [isEditing, planId]);

  // Split the workouts into weeks for display
  const workoutsByWeek = days.reduce<Record<number, number[]>>((acc, day) => {
    const week = Math.ceil(day / 7);
    if (!acc[week]) acc[week] = [];
    acc[week].push(day);
    return acc;
  }, {});

  // Determine badge color based on workout intensity
  const getIntensityColor = (intensity: IntensityLevel) => {
    switch (intensity) {
      case "recovery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "hard":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "race":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  // Get label for workout type
  const getWorkoutTypeLabel = (type: WorkoutType) => {
    switch (type) {
      case "long_run":
        return "Long Run";
      case "easy_run":
        return "Easy Run";
      case "tempo_run":
        return "Tempo Run";
      case "interval":
        return "Intervals";
      case "hills":
        return "Hills";
      case "fartlek":
        return "Fartlek";
      case "recovery":
        return "Recovery";
      case "race":
        return "Race";
      case "cross_training":
        return "Cross Training";
      case "rest":
        return "Rest Day";
      default:
        return type;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/planning/training-plan")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              {isEditing ? "Edit Training Plan" : "Create Training Plan"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing
                ? "Modify an existing training plan"
                : "Design a new training plan for your athletes"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSavePlan}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Plan
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Plan Details
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Workout Schedule
          </TabsTrigger>
          <TabsTrigger
            value="athletes"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Assigned Athletes
          </TabsTrigger>
        </TabsList>

        {/* Plan Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Plan Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={planDetails.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Spring Track Season Preparation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Plan Type</Label>
                  <Select
                    value={planDetails.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="speed">Speed Development</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="marathon">Marathon</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !planDetails.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {planDetails.startDate ? (
                          format(new Date(planDetails.startDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          planDetails.startDate
                            ? new Date(planDetails.startDate)
                            : undefined
                        }
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={planDetails.duration}
                    onValueChange={(value) =>
                      handleSelectChange("duration", value)
                    }
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="4 weeks">4 weeks</SelectItem>
                      <SelectItem value="8 weeks">8 weeks</SelectItem>
                      <SelectItem value="12 weeks">12 weeks</SelectItem>
                      <SelectItem value="16 weeks">16 weeks</SelectItem>
                      <SelectItem value="20 weeks">20 weeks</SelectItem>
                      <SelectItem value="24 weeks">24 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={planDetails.description}
                  onChange={handleInputChange}
                  placeholder="Enter a description for this training plan..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workout Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          {selectedDay ? (
            <WorkoutEditor
              day={selectedDay}
              initialWorkout={workouts.find((w) => w.day === selectedDay)}
              onSave={handleWorkoutSave}
              onCancel={() => setSelectedDay(null)}
              onDelete={handleWorkoutDelete}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Workout Schedule
                </h2>
                <div className="inline-flex shadow-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-r-none border-r-0"
                  >
                    <ListTodo className="h-4 w-4 mr-2" />
                    List View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-l-none bg-white dark:bg-gray-800"
                  >
                    <Equal className="h-4 w-4 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Info className="h-5 w-5 text-indigo-500" />
                  <p>
                    Click on any day to add or edit a workout. You can duplicate
                    workouts to quickly build your schedule.
                  </p>
                </div>
              </div>

              {Object.entries(workoutsByWeek).map(([week, days]) => (
                <Card key={week} className="mb-4">
                  <CardHeader className="py-3 px-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-gray-700 dark:text-gray-300">
                        Week {week}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {days.map((day) => {
                        const workout = workouts.find((w) => w.day === day);
                        return (
                          <div
                            key={day}
                            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                            onClick={() => setSelectedDay(day)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                  {day}
                                </div>
                                {workout ? (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {workout.title}
                                      </span>
                                      <Badge
                                        className={getIntensityColor(
                                          workout.intensity
                                        )}
                                        variant="outline"
                                      >
                                        {workout.intensity}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {getWorkoutTypeLabel(workout.type)}
                                      {workout.distance
                                        ? ` • ${workout.distance}m`
                                        : ""}
                                      {workout.duration
                                        ? ` • ${workout.duration} min`
                                        : ""}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-gray-500 dark:text-gray-400 italic">
                                    No workout planned
                                  </div>
                                )}
                              </div>
                            </div>
                            {workout && (
                              <div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleWorkoutDuplicate(day);
                                      }}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Duplicate to next day
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDay(day);
                                      }}
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                          confirm(
                                            "Are you sure you want to delete this workout?"
                                          )
                                        ) {
                                          handleWorkoutDelete(day);
                                        }
                                      }}
                                      className="text-red-600 dark:text-red-400"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Assigned Athletes Tab */}
        <TabsContent value="athletes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Assigned Athletes</CardTitle>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Assign Athletes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {assignedAthletes.length > 0 ? (
                <div className="border rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                  {assignedAthletes.map((athlete) => (
                    <div
                      key={athlete.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {athlete.first_name} {athlete.last_name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Grade: {athlete.grade}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                  <p className="mb-2">No athletes assigned yet</p>
                  <p className="mb-4">
                    Assign athletes to this training plan to track their
                    progress
                  </p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Athletes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
