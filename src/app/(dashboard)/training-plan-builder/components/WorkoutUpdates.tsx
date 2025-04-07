"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainingPlanTable } from "@/components/training-plan-table";
import { Copy, Download, Eye, Save, Upload, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

/**
 * Workout data structure
 *
 * Represents a single workout in the training plan
 * @property id - Unique identifier for the workout
 * @property type - Type of workout (e.g., "interval", "tempo")
 * @property name - Display name of the workout
 * @property value - Workout details or parameters
 * @property description - Optional detailed description
 * @property weekId - Week number this workout belongs to
 */
export interface Workout {
  id: string;
  type: string;
  name: string;
  value: string;
  description?: string;
  weekId: number;
}

/**
 * Workout type configuration
 *
 * Defines the visual and functional properties of workout types
 * @property id - Unique identifier for the workout type
 * @property name - Display name of the workout type
 * @property color - Background color for the workout type
 * @property textColor - Text color for the workout type
 */
export interface WorkoutType {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

/**
 * Component props interface
 *
 * @property planData - Array of workouts in the training plan
 * @property workoutTypes - Available workout type configurations
 * @property updateWorkout - Callback for updating workout details
 * @property removeWeek - Callback for removing a week
 * @property moveWeek - Callback for reordering weeks
 * @property onAddWeek - Optional callback for adding a new week
 * @property onImport - Optional callback for importing a plan
 * @property onExport - Optional callback for exporting a plan
 * @property onSave - Optional callback for saving the plan
 * @property onPreview - Optional callback for previewing the plan
 * @property onCopy - Optional callback for copying the plan
 */
interface WorkoutUpdatesProps {
  planData: Workout[];
  workoutTypes: WorkoutType[];
  updateWorkout: (weekId: number, workoutType: string, value: string) => void;
  removeWeek: (weekId: number) => void;
  moveWeek: (weekId: number, direction: "up" | "down") => void;
  onAddWeek?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  onCopy?: () => void;
}

/**
 * Action Buttons Component
 *
 * Memoized toolbar component for plan management actions
 * Includes buttons for:
 * - Importing plans
 * - Exporting plans
 * - Saving plans
 * - Previewing plans
 * - Copying plans
 *
 * Each button has a tooltip for better UX
 */
const ActionButtons = memo(
  ({
    onImport,
    onExport,
    onSave,
    onPreview,
    onCopy,
  }: {
    onImport?: () => void;
    onExport?: () => void;
    onSave?: () => void;
    onPreview?: () => void;
    onCopy?: () => void;
  }) => (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onImport}>
              <Upload className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Import Plan</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export Plan</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onSave}>
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save Plan</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onPreview}>
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview Plan</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy Plan</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
);
ActionButtons.displayName = "ActionButtons";

/**
 * Error Fallback Component
 *
 * Displays an error message and retry button when something goes wrong
 * Used as a fallback for the ErrorBoundary component
 *
 * @param error - The error object containing the error message
 * @param resetErrorBoundary - Function to reset the error state
 */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-800">
    <h3 className="text-lg font-semibold mb-2">Something went wrong:</h3>
    <pre className="text-sm">{error.message}</pre>
    <Button onClick={resetErrorBoundary} className="mt-4" variant="outline">
      Try again
    </Button>
  </div>
);

/**
 * Main Workout Updates Component
 *
 * Manages the workout schedule and provides editing capabilities
 *
 * State:
 * - selectedWorkout: Currently selected workout for editing
 *
 * Features:
 * - Workout type selection and updates
 * - Workout value editing
 * - Workout description management
 * - Error handling with fallback UI
 */
export function WorkoutUpdates({
  planData,
  workoutTypes,
  updateWorkout,
  removeWeek,
  moveWeek,
  onAddWeek,
  onImport,
  onExport,
  onSave,
  onPreview,
  onCopy,
}: WorkoutUpdatesProps) {
  // State for managing the selected workout
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  /**
   * Handles changes to the workout type selection
   *
   * Updates the workout type while preserving other properties
   *
   * @param value - The selected workout type ID
   */
  const handleTypeChange = (value: string) => {
    if (!selectedWorkout) return;
    const workoutType = workoutTypes.find((type) => type.id === value);
    if (!workoutType) return;

    updateWorkout(
      selectedWorkout.weekId,
      workoutType.id,
      selectedWorkout.value
    );
  };

  /**
   * Handles changes to the workout value input
   *
   * Updates the workout value while preserving other properties
   *
   * @param e - The change event from the input
   */
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedWorkout) return;
    updateWorkout(selectedWorkout.weekId, selectedWorkout.type, e.target.value);
  };

  /**
   * Handles changes to the workout description
   *
   * Updates the workout description while preserving other properties
   *
   * @param e - The change event from the textarea
   */
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!selectedWorkout) return;
    updateWorkout(selectedWorkout.weekId, selectedWorkout.type, e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Workout Schedule Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Workout Schedule</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onAddWeek}
                className="bg-background"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Week
              </Button>
              <ActionButtons
                onImport={onImport}
                onExport={onExport}
                onSave={onSave}
                onPreview={onPreview}
                onCopy={onCopy}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Error boundary for handling table errors */}
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Reset the error state
              window.location.reload();
            }}
          >
            {/* Training plan table component */}
            <TrainingPlanTable
              planData={planData.reduce<
                Array<{
                  id: number;
                  weekNumber: number;
                  dateRange: string;
                  seasonPhase: string;
                  workouts: Record<string, string>;
                }>
              >((acc, workout) => {
                const existingWeek = acc.find((w) => w.id === workout.weekId);
                if (existingWeek) {
                  existingWeek.workouts[workout.type] = workout.value;
                } else {
                  acc.push({
                    id: workout.weekId,
                    weekNumber: workout.weekId,
                    dateRange: "", // This should be calculated based on the week
                    seasonPhase: "", // This should be determined based on the week
                    workouts: {
                      [workout.type]: workout.value,
                    },
                  });
                }
                return acc;
              }, [])}
              workoutTypes={workoutTypes}
              updateWorkout={updateWorkout}
              removeWeek={removeWeek}
              moveWeek={moveWeek}
            />
          </ErrorBoundary>
        </CardContent>
      </Card>

      {/* Workout Updates Card */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Workout Selection Section */}
            <div className="space-y-2">
              <Label>Select Workout</Label>
              <Select
                value={selectedWorkout?.id}
                onValueChange={(value) => {
                  const workout = planData.find((w) => w.id === value);
                  setSelectedWorkout(workout || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a workout" />
                </SelectTrigger>
                <SelectContent>
                  {planData.map((workout) => (
                    <SelectItem key={workout.id} value={workout.id}>
                      {workout.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedWorkout && (
              <>
                {/* Workout Type Selection */}
                <div className="space-y-2">
                  <Label>Workout Type</Label>
                  <Select
                    value={selectedWorkout.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workoutTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Workout Value Input */}
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    value={selectedWorkout.value}
                    onChange={handleValueChange}
                    placeholder="Enter workout value"
                  />
                </div>

                {/* Workout Description Input */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={selectedWorkout.description || ""}
                    onChange={handleDescriptionChange}
                    placeholder="Enter workout description"
                    maxLength={500}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
