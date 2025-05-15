"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Clock,
  Info,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { TrainingPlanTable } from "@/components/training-plan-table";

import { useWorkoutData } from "@/hooks/use-workout-data";
import { usePlanDates } from "@/hooks/use-plan-dates";
import { WorkoutBuilderTab } from "@/components/tabs/workout-builder-tab";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CreateWorkoutSheet } from "@/components/dialogs/create-workout-sheet";

// Import constants
import { CARD_THEMES, DEFAULT_PLAN_VALUES, PLAN_FORMAT_OPTIONS } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PlanFormat, PhaseData, WeekData, WorkoutLibrary } from "@/types/training-plans";
import { format } from "date-fns";

export default function TrainingPlanBuilderPage() {
  const [planName, setPlanName] = useState<string>("Summer Training Plan");
  const [planFormat, setPlanFormat] = useState<PlanFormat>("xc");
  const [description, setDescription] = useState<string>(
    "12-week summer training plan for varsity runners"
  );
  const [selectedTab, setSelectedTab] = useState<string>("planDetails");
  const [showCreateWorkoutDialog, setShowCreateWorkoutDialog] = useState(false);

  // Use custom hooks for data management
  const { workoutTypes, workouts, setWorkouts } = useWorkoutData(selectedTab);
  const { 
    startDate, 
    setStartDate,
    endDate, 
    setEndDate,
    weeks,
    planData
  } = usePlanDates(new Date("2023-05-24"), new Date("2023-08-15"));

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleCellClick = (weekId: number, workoutTypeId: string) => {
    console.log("Cell clicked:", weekId, workoutTypeId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    weekId: number,
    workoutTypeId: string
  ) => {
    console.log("Key pressed:", e.key, weekId, workoutTypeId);
  };

  const handlePhaseChange = (weekId: number, phaseData: PhaseData) => {
    console.log("Phase changed:", weekId, phaseData);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
              Training Plan Builder
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Create and customize training plans for your athletes
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50/50 dark:bg-gray-900/50 p-6 space-y-6">
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <TabsTrigger 
                  value="planDetails" 
                  className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=inactive]:text-gray-500 font-medium"
                >
                  Plan Details
                </TabsTrigger>
                <TabsTrigger 
                  value="workoutBuilder"
                  className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=inactive]:text-gray-500 font-medium"
                >
                  Workout Builder
                </TabsTrigger>
                <TabsTrigger 
                  value="progressionBuilder"
                  className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=inactive]:text-gray-500 font-medium"
                >
                  Progression Builder
                </TabsTrigger>
                <TabsTrigger 
                  value="assignAthletes"
                  className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=inactive]:text-gray-500 font-medium"
                >
                  Assign Athletes
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="planDetails" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg">
                      <CalendarIcon className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Plan Information</CardTitle>
                      <p className="mt-1 text-sm text-gray-500">Enter the basic details of your training plan</p>
                    </div>
                  </div>
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

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a brief description of the plan's goals or focus"
                        className="flex-1"
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional: Briefly describe the plan.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 dark:bg-purple-950/50 p-2 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Plan Preview</CardTitle>
                      <p className="mt-1 text-sm text-gray-500">Preview how your plan will look</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-md border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                          {planName || "Unnamed Plan"}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
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
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                      </span>
                    </div>

                    <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                      {description || "No description provided."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Duration</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {weeks} {weeks === 1 ? "week" : "weeks"}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Total Workouts</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {planData.length * 3} estimated
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Athletes</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Not assigned yet
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-50 dark:bg-green-950/50 p-2 rounded-lg">
                        <CalendarIcon className="h-6 w-6 text-green-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Training Schedule</CardTitle>
                        <p className="mt-1 text-sm text-gray-500">Manage your training plan schedule</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 font-medium">
                      <Plus className="h-4 w-4" /> Add Week
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
              <WorkoutBuilderTab
                workouts={workouts}
                onCreateWorkout={() => setShowCreateWorkoutDialog(true)}
              />
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
        <CreateWorkoutSheet
          open={showCreateWorkoutDialog}
          onOpenChange={setShowCreateWorkoutDialog}
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
      </div>
    </TooltipProvider>
  );
}

