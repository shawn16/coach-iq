"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  Clock,
  Info,
  Plus,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { differenceInWeeks, format } from "date-fns";
import type React from "react";
import {
  PlanFormat,
  WeekData,
  WorkoutType,
  WorkoutLibrary,
} from "@/types/training";
import { TrainingPlanTable } from "@/components/training-plan-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/workout-card";
import { ProgressionCard } from "@/components/progression-card";
import { CreateWorkoutDialog } from "@/components/create-workout-dialog";

export default function TrainingPlanBuilderPage() {
  const [planName, setPlanName] = useState<string>("Summer Training Plan");
  const [planFormat, setPlanFormat] = useState<PlanFormat>("xc");
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutLibrary[]>([]);
  const [description, setDescription] = useState<string>(
    "12-week summer training plan for varsity runners"
  );

  const [startDate, setStartDate] = useState<Date>(new Date("2023-05-24"));
  const [endDate, setEndDate] = useState<Date>(new Date("2023-08-15"));
  const [showCreateWorkoutDialog, setShowCreateWorkoutDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("planDetails");

  // Load workout types on component mount
  useEffect(() => {
    const loadWorkoutTypes = async () => {
      try {
        // Fetch workout types from the API route
        const response = await fetch('/api/workout-types');
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error fetching workout types:", errorData);
          throw new Error(`Failed to fetch workout types from API: ${response.statusText}`);
        }
        const types = await response.json();
        setWorkoutTypes(types);
      } catch (error) {
        console.error("Error loading workout types:", error);
        // Optionally, set an error state here to display to the user
      }
    };

    loadWorkoutTypes();
  }, []);

  // Load workout library items when the workoutBuilder tab is selected or on initial load if it's the default tab
  useEffect(() => {
    const loadWorkoutLibrary = async () => {
      // Only fetch if the tab is active and workouts haven't been loaded, 
      // or if it's the initial load and the tab is workoutBuilder by default.
      if (selectedTab === 'workoutBuilder' && workouts.length === 0) { 
        try {
          const response = await fetch('/api/workout-library');
          if (!response.ok) {
            const errorData = await response.json();
            console.error("API error fetching workout library:", errorData);
            throw new Error(`Failed to fetch workout library from API: ${response.statusText}`);
          }
          const libraryItems = await response.json();
          setWorkouts(libraryItems);
        } catch (error) {
          console.error("Error loading workout library:", error);
        }
      }
    };

    loadWorkoutLibrary();
  }, [selectedTab, workouts.length]); // Depend on selectedTab and workouts.length

  const calculateWeeks = (start: Date, end: Date) => {
    if (start && end && start.getTime() < end.getTime()) {
      return differenceInWeeks(end, start);
    }
    return 0;
  };

  const initialWeeks = calculateWeeks(startDate, endDate);
  const [weeks, setWeeks] = useState<number>(initialWeeks);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleCellClick = (weekId: number, workoutTypeId: string) => {
    // TODO: Implement cell click handling
    console.log("Cell clicked:", weekId, workoutTypeId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    weekId: number,
    workoutTypeId: string
  ) => {
    // TODO: Implement keyboard handling
    console.log("Key pressed:", e.key, weekId, workoutTypeId);
  };

  const handlePhaseChange = (weekId: number, phase: string) => {
    // TODO: Implement phase change handling
    console.log("Phase changed:", weekId, phase);
  };

  const [planData, setPlanData] = useState<WeekData[]>(() =>
    generateInitialPlanData(weeks)
  );

  useEffect(() => {
    setPlanData(generateInitialPlanData(weeks));
  }, [weeks]);

  useEffect(() => {
    const calculatedWeeks = calculateWeeks(startDate, endDate);
    setWeeks(calculatedWeeks);
  }, [startDate, endDate]);

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Training Plan Builder
            </h1>
            <p className="text-muted-foreground">
              Create and customize training plans for your athletes
            </p>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="planDetails">Plan Details</TabsTrigger>
            <TabsTrigger value="workoutBuilder">Workout Library</TabsTrigger>
            <TabsTrigger value="progressionBuilder">Progression Library</TabsTrigger>
            <TabsTrigger value="assignAthletes">Assign Athletes</TabsTrigger>
          </TabsList>

          <TabsContent value="planDetails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-indigo-600" /> Plan
                    Information
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="plan-name">Plan Name *</Label>
                      <div className="flex items-center gap-1">
                        <Input
                          id="plan-name"
                          value={planName}
                          onChange={(e) => setPlanName(e.target.value)}
                          placeholder="E.g., XC Summer Base"
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Give your plan a descriptive name.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      <Label>Start Date *</Label>
                      <div className="flex items-center gap-1">
                        <DatePicker
                          date={startDate}
                          setDate={(date) => setStartDate(date || startDate)}
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The first day of the training plan.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="plan-format">Plan Format</Label>
                      <div className="flex items-center gap-1">
                        <Select value={planFormat} onValueChange={(value) => setPlanFormat(value as PlanFormat)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a plan format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xc">Cross Country</SelectItem>
                            <SelectItem value="track">Track</SelectItem>
                            <SelectItem value="road">Road</SelectItem>
                            <SelectItem value="trail">Trail</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select the primary sport or season format.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      <Label>End Date *</Label>
                      <div className="flex items-center gap-1">
                        <DatePicker
                          date={endDate}
                          setDate={(date) => setEndDate(date || endDate)}
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The last day of the training plan.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a brief description of the plan's goals or focus"
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Optional: Briefly describe the plan.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Plan Duration: {weeks} {weeks === 1 ? "week" : "weeks"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" /> Plan Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                        {planName || "Unnamed Plan"}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {planFormat === "xc"
                          ? "Cross Country"
                          : planFormat === "track"
                          ? "Track"
                          : planFormat === "road"
                          ? "Road"
                          : planFormat === "trail"
                          ? "Trail"
                          : "General"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {format(startDate, "MM/dd/yyyy")} -{" "}
                      {format(endDate, "MM/dd/yyyy")}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {weeks} {weeks === 1 ? "week" : "weeks"}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Workouts</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {planData.length * 3} estimated
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Athletes</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Not assigned yet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-green-600" /> Training Schedule
                    </div>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Week
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TrainingPlanTable
                  planData={planData}
                  workoutTypes={workoutTypes}
                  onCellClick={handleCellClick}
                  onKeyDown={handleKeyDown}
                  onPhaseChange={handlePhaseChange}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workoutBuilder">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Workout Library</CardTitle>
                  <Button
                    onClick={() => setShowCreateWorkoutDialog(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Plus className="h-4 w-4" /> Create New Workout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                  {workouts.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                      No workouts in the library yet. Click &quot;Create New Workout&quot; to add one.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progressionBuilder">
            <Card>
              <CardHeader>
                <CardTitle>Progression Library</CardTitle>
              </CardHeader>
              <CardContent>
                {/* TODO: Implement progression fetching and state */} 
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Progression library feature coming soon.
                  {/* workouts.map((progression) => (
                    <ProgressionCard key={progression.id} progression={progression} />
                  )) */}
                  {/* workouts.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No progressions available yet. Create workouts first to build progressions.
                    </div>
                  )*/}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignAthletes">
            <Card>
              <CardHeader>
                <CardTitle>Assign Athletes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assign athletes content goes here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Workout Dialog */}
      <CreateWorkoutDialog
        open={showCreateWorkoutDialog}
        onClose={() => setShowCreateWorkoutDialog(false)}
        onSave={async (newlyCreatedWorkout: WorkoutLibrary) => {
          try {
            // Add the new workout to the library
            // newlyCreatedWorkout is the actual workout object returned by the API
            setWorkouts((prevWorkouts) => [...prevWorkouts, newlyCreatedWorkout]);
            setShowCreateWorkoutDialog(false);
          } catch (error) {
            console.error("Error saving workout to state:", error);
            // Optionally, show a toast error to the user if updating local state fails
          }
        }}
      />
    </TooltipProvider>
  );
}

// Helper function to generate initial plan data
function generateInitialPlanData(weeks: number): WeekData[] {
  const data: WeekData[] = [];
  for (let i = 0; i < weeks; i++) {
    data.push({
      id: i + 1,
      weekNumber: i + 1,
      dateRange: `Week ${i + 1}`,
      seasonPhase: "Base",
      workouts: {},
    });
  }
  return data;
}