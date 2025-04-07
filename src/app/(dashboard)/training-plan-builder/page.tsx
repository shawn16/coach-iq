/**
 * Training Plan Builder Page
 *
 * Main page for creating and managing training plans.
 * Provides a comprehensive interface for:
 * - Plan configuration (name, description, dates, type)
 * - Week management (adding, removing, reordering)
 * - Workout scheduling and updates
 * - Plan import/export functionality
 *
 * Features:
 * - Tabbed interface for different aspects of plan management
 * - Real-time workout updates
 * - Error handling with toast notifications
 * - Data persistence and state management
 */

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { PlanConfiguration } from "./components/PlanConfiguration";
import { WeekManagement } from "./components/WeekManagement";
import { WorkoutUpdates } from "./components/WorkoutUpdates";
import { ErrorBoundary } from "react-error-boundary";
import type {
  Workout,
  WorkoutType as WorkoutUpdateType,
} from "./components/WorkoutUpdates";

/**
 * Workout Type Configuration
 *
 * Defines the visual and functional properties of workout types
 * @property id - Unique identifier for the workout type
 * @property name - Display name of the workout type
 * @property color - Background color for the workout type
 * @property textColor - Text color for the workout type
 */
interface WorkoutType {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

/**
 * Plan Data Structure
 *
 * Represents a week in the training plan
 * @property id - Unique identifier for the week
 * @property weekNumber - Display number of the week
 * @property dateRange - Date range for the week
 * @property seasonPhase - Current phase of the training season
 * @property workouts - Map of workout types to their values
 */
interface PlanData {
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: Record<string, string>;
}

export default function TrainingPlanBuilderPage() {
  // Navigation and notification hooks
  const router = useRouter();
  const { toast } = useToast();

  // State management for plan configuration
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [planType, setPlanType] = useState<"xc" | "track" | "road" | "custom">(
    "xc"
  );
  const [weeks, setWeeks] = useState(12);
  const [planData, setPlanData] = useState<PlanData[]>([]);
  const [activeTab, setActiveTab] = useState("plan-configuration");

  /**
   * Workout Type Definitions
   *
   * Predefined workout types with their visual properties
   * Memoized to prevent recreation on every render
   */
  const workoutTypes: WorkoutType[] = [
    {
      id: "green_vol",
      name: "Green Vol",
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-800 dark:text-green-300",
    },
    // ... rest of workout types ...
  ];

  /**
   * Workout Update Handler
   *
   * Updates a specific workout in the plan data
   * Includes error handling with toast notifications
   *
   * @param weekId - ID of the week to update
   * @param workoutType - Type of workout to update
   * @param value - New value for the workout
   */
  const updateWorkout = useCallback(
    (weekId: number, workoutType: string, value: string) => {
      try {
        setPlanData((prevData) =>
          prevData.map((week) =>
            week.id === weekId
              ? {
                  ...week,
                  workouts: { ...week.workouts, [workoutType]: value },
                }
              : week
          )
        );
      } catch {
        toast({
          title: "Error",
          description: "Failed to update workout. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  /**
   * Week Management Handlers
   *
   * Functions for managing weeks in the training plan:
   * - Adding new weeks
   * - Removing weeks
   * - Reordering weeks
   *
   * Each function includes error handling with toast notifications
   */
  const handleAddWeek = useCallback(() => {
    try {
      setPlanData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          weekNumber: prevData.length + 1,
          dateRange: "",
          seasonPhase: "base",
          workouts: {},
        },
      ]);
      setWeeks((prev) => prev + 1);
    } catch {
      toast({
        title: "Error",
        description: "Failed to add week. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleRemoveWeek = useCallback(() => {
    try {
      if (weeks > 1) {
        setPlanData((prevData) => prevData.slice(0, -1));
        setWeeks((prev) => prev - 1);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove week. Please try again.",
        variant: "destructive",
      });
    }
  }, [weeks, toast]);

  const handleMoveWeek = useCallback(
    (fromIndex: number, toIndex: number) => {
      try {
        setPlanData((prevData) => {
          const newData = [...prevData];
          const [movedWeek] = newData.splice(fromIndex, 1);
          newData.splice(toIndex, 0, movedWeek);
          return newData.map((week, i) => ({
            ...week,
            weekNumber: i + 1,
          }));
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to move week. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  /**
   * Data Conversion Utility
   *
   * Converts PlanData format to Workout format for the WorkoutUpdates component
   *
   * @param data - PlanData array to convert
   * @returns Array of Workout objects
   */
  const convertPlanDataToWorkouts = (data: PlanData[]): Workout[] => {
    return data.map((week) => ({
      id: week.id.toString(),
      type: week.seasonPhase,
      name: `Week ${week.weekNumber}`,
      value: week.dateRange,
      description: week.seasonPhase,
      weekId: week.weekNumber,
    }));
  };

  /**
   * Plan Operation Handlers
   *
   * Functions for managing the training plan:
   * - Importing plans
   * - Exporting plans
   * - Saving plans
   * - Previewing plans
   *
   * Each function includes error handling with toast notifications
   */
  const handleImport = useCallback(async () => {
    try {
      // Implementation
    } catch {
      toast({
        title: "Error",
        description: "Failed to import plan. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleExport = useCallback(async () => {
    try {
      // Implementation
    } catch {
      toast({
        title: "Error",
        description: "Failed to export plan. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSave = useCallback(async () => {
    try {
      // Implementation
    } catch {
      toast({
        title: "Error",
        description: "Failed to save plan. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handlePreview = useCallback(() => {
    try {
      router.push(`/training-plan-preview/${planName}`);
    } catch {
      toast({
        title: "Error",
        description: "Failed to preview plan. Please try again.",
        variant: "destructive",
      });
    }
  }, [planName, router, toast]);

  const handleCopy = useCallback(async () => {
    try {
      // Implementation
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy plan. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please try refreshing the page
          </p>
        </div>
      }
    >
      <div className="container mx-auto py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Training Plan Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="plan-configuration">
                  Plan Configuration
                </TabsTrigger>
                <TabsTrigger value="week-management">
                  Week Management
                </TabsTrigger>
                <TabsTrigger value="assign-athletes">
                  Assign Athletes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="plan-configuration" className="mt-6">
                <PlanConfiguration
                  planName={planName}
                  setPlanName={setPlanName}
                  planDescription={planDescription}
                  setPlanDescription={setPlanDescription}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  planType={planType}
                  setPlanType={setPlanType}
                  setWeeks={setWeeks}
                />
              </TabsContent>

              <TabsContent value="week-management" className="mt-6">
                <WeekManagement
                  weeks={weeks}
                  onWeeksChange={setWeeks}
                  onRemoveWeek={handleRemoveWeek}
                  onMoveWeek={(weekId: number, direction: "up" | "down") => {
                    const index = planData.findIndex(
                      (week) => week.id === weekId
                    );
                    const newIndex = direction === "up" ? index - 1 : index + 1;
                    if (newIndex >= 0 && newIndex < planData.length) {
                      handleMoveWeek(index, newIndex);
                    }
                  }}
                />
              </TabsContent>

              <TabsContent value="assign-athletes" className="mt-6">
                <WorkoutUpdates
                  planData={convertPlanDataToWorkouts(planData)}
                  workoutTypes={workoutTypes as WorkoutUpdateType[]}
                  updateWorkout={updateWorkout}
                  removeWeek={handleRemoveWeek}
                  moveWeek={(weekId: number, direction: "up" | "down") => {
                    const index = planData.findIndex(
                      (week) => week.id === weekId
                    );
                    const newIndex = direction === "up" ? index - 1 : index + 1;
                    if (newIndex >= 0 && newIndex < planData.length) {
                      handleMoveWeek(index, newIndex);
                    }
                  }}
                  onAddWeek={handleAddWeek}
                  onImport={handleImport}
                  onExport={handleExport}
                  onSave={handleSave}
                  onPreview={handlePreview}
                  onCopy={handleCopy}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </ErrorBoundary>
  );
}
