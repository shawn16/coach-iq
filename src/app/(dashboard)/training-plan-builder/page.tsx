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
  HelpCircle,
  TrendingUp,
  CalendarIcon,
  Clock,
  Info,
  Plus,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { differenceInWeeks, format } from "date-fns";
import type React from "react";
import {
  PlanType,
  workoutTypes,
  generateInitialPlanData,
  WeekData,
  workoutLibrary,
  progressionLibrary,
} from "@/lib/sample-data/builder-data";
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

// --- Component ---

export default function TrainingPlanBuilderPage() {
  const [planName, setPlanName] = useState<string>("Summer Training Plan");
  const [planType, setPlanType] = useState<PlanType>("xc");
  const [description, setDescription] = useState<string>(
    "12-week summer training plan for varsity runners"
  );

  const [startDate, setStartDate] = useState<Date>(new Date("2023-05-24"));
  const [endDate, setEndDate] = useState<Date>(new Date("2023-08-15"));

  const calculateWeeks = (start: Date, end: Date) => {
    if (start && end && start.getTime() < end.getTime()) {
      return differenceInWeeks(end, start);
    }
    return 0;
  };

  const initialWeeks = calculateWeeks(startDate, endDate);
  const [weeks, setWeeks] = useState<number>(initialWeeks);

  const [planData, setPlanData] = useState<WeekData[]>(() =>
    generateInitialPlanData(startDate, weeks)
  );

  useEffect(() => {
    setPlanData(generateInitialPlanData(startDate, weeks));
  }, [startDate, weeks]);

  useEffect(() => {
    const calculatedWeeks = calculateWeeks(startDate, endDate);
    setWeeks(calculatedWeeks);
  }, [startDate, endDate]);

  const [selectedTab, setSelectedTab] = useState<string>("planDetails");
  const [showAddWorkoutDialog, setShowAddWorkoutDialog] =
    useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<{
    weekId: number;
    workoutType: string;
  } | null>(null);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handlePlanNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(e.target.value);
  };

  const handlePlanTypeChange = (value: PlanType) => {
    setPlanType(value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddWorkout = () => {
    console.log("Add workout clicked");
  };

  const handleSave = () => {
    console.log("Save plan clicked");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleWeeksChange = (newWeeks: number) => {
    if (!isNaN(newWeeks) && newWeeks > 0) {
      setWeeks(newWeeks);
      const newEndDate = new Date(
        startDate.getTime() + newWeeks * 7 * 24 * 60 * 60 * 1000
      );
      setEndDate(newEndDate);
    }
  };

  const handleStartDateChange = (newStartDate: Date | undefined) => {
    if (newStartDate) {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (newEndDate: Date | undefined) => {
    if (newEndDate) {
      setEndDate(newEndDate);
    }
  };

  const handleCellClick = (weekId: number, workoutType: string) => {
    setSelectedCell({ weekId, workoutType });
    setShowAddWorkoutDialog(true);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    weekId: number,
    workoutType: string
  ) => {
    if (event.key === "Enter") {
      setSelectedCell({ weekId, workoutType });
      setShowAddWorkoutDialog(true);
    }
  };

  const handleCloseAddWorkoutDialog = () => {
    setShowAddWorkoutDialog(false);
    setSelectedCell(null);
  };

  const updateWorkout = (
    weekId: number,
    workoutType: string,
    workoutId: number
  ) => {
    // TODO: Implement update workout
  };

  const removeWeek = (weekId: number) => {
    setPlanData((prevPlanData) => prevPlanData.filter((week) => week.id !== weekId));
  };

  const moveWeek = (weekId: number, direction: "up" | "down") => {
    setPlanData((prevPlanData) => {
      const index = prevPlanData.findIndex((week) => week.id === weekId);
      if (index === -1) return prevPlanData;

      const newPlanData = [...prevPlanData];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newPlanData.length) return prevPlanData;

      // Swap weeks
      [newPlanData[index], newPlanData[targetIndex]] = [
        newPlanData[targetIndex],
        newPlanData[index],
      ];

      return newPlanData;
    });
  };

  const formatDateRange = (start: Date, end: Date) => {
    if (!start || !end) return "";
    return `${format(start, "MM/dd/yyyy")} - ${format(end, "MM/dd/yyyy")}`;
  };

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

        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="planDetails">Plan Details</TabsTrigger>
            <TabsTrigger value="workoutBuilder">Workout Builder</TabsTrigger>
            <TabsTrigger value="progressionBuilder">
              Progression Builder
            </TabsTrigger>
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
                          onChange={handlePlanNameChange}
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
                        <DatePicker date={startDate} setDate={handleStartDateChange} />
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
                      <Label htmlFor="plan-type">Plan Type</Label>
                      <div className="flex items-center gap-1">
                        <Select
                          value={planType}
                          onValueChange={handlePlanTypeChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a plan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xc">Cross Country</SelectItem>
                            <SelectItem value="track">Track</SelectItem>
                            <SelectItem value="road">Road</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select the primary sport or season type.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      <Label>End Date *</Label>
                      <div className="flex items-center gap-1">
                        <DatePicker
                          date={endDate}
                          setDate={handleEndDateChange}
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
                      onChange={handleDescriptionChange}
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
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" /> Plan Preview
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {planName || "Unnamed Plan"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium capitalize">
                          {planType}
                        </span>
                        <span>|</span>
                        <span>{formatDateRange(startDate, endDate)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {description || "No description provided."}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {weeks} {weeks === 1 ? "week" : "weeks"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Workouts
                      </p>
                      <p className="font-medium">
                        {planData.length * 5} estimated
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Athletes</p>
                      <p className="font-medium">Not assigned yet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Training Schedule</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Week
                </Button>
              </div>
              <TrainingPlanTable
                planData={planData}
                workoutTypes={workoutTypes}
                onCellClick={handleCellClick}
                onKeyDown={handleKeyDown}
                removeWeek={removeWeek}
                onMoveWeek={moveWeek}
              />
            </div>
          </TabsContent>

          <TabsContent value="workoutBuilder">
            <Card>
              <CardHeader>
                <CardTitle>Workout Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workoutLibrary.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progressionBuilder">
            <Card>
              <CardHeader>
                <CardTitle>Workout Progressions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {progressionLibrary.map((progression) => (
                    <ProgressionCard key={progression.id} progression={progression} />
                  ))}
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
    </TooltipProvider>
  );
}
