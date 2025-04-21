"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { WorkoutInput, IntensityLevel } from "@/types/training";

interface WorkoutEditorProps {
  day: number;
  initialWorkout?: WorkoutInput;
  onSave: (workout: WorkoutInput) => void;
  onCancel: () => void;
  onDelete?: (day: number) => void;
}

export function WorkoutEditor({
  day,
  initialWorkout,
  onSave,
  onCancel,
  onDelete,
}: WorkoutEditorProps) {
  // Initialize workout state with defaults or previous values
  const [workout, setWorkout] = useState<WorkoutInput>({
    day,
    title: initialWorkout?.title || "",
    description: initialWorkout?.description || "",
    type: initialWorkout?.type || "easy_run",
    intensity: initialWorkout?.intensity || "easy",
    duration: initialWorkout?.duration || undefined,
    distance: initialWorkout?.distance || undefined,
    notes: initialWorkout?.notes || "",
    sets: initialWorkout?.sets || [],
  });

  const [hasIntervals, setHasIntervals] = useState(
    initialWorkout?.type === "interval"
  );

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : undefined,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setWorkout((prev) => ({ ...prev, [name]: value }));

    // Toggle intervals based on workout type
    if (name === "type") {
      setHasIntervals(value === "interval");

      // If switching to intervals with no sets, add a default one
      if (
        value === "interval" &&
        (!workout.sets || workout.sets.length === 0)
      ) {
        setWorkout((prev) => ({
          ...prev,
          sets: [
            {
              reps: 4,
              distance: 400,
              rest: 60,
              pace: "",
              notes: "",
            },
          ],
        }));
      }
    }
  };

  // Add a new interval set
  const addIntervalSet = () => {
    setWorkout((prev) => ({
      ...prev,
      sets: [
        ...(prev.sets || []),
        {
          reps: 4,
          distance: 400,
          rest: 60,
          pace: "",
          notes: "",
        },
      ],
    }));
  };

  // Update an interval set
  const updateIntervalSet = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setWorkout((prev) => {
      const updatedSets = [...(prev.sets || [])];
      updatedSets[index] = {
        ...updatedSets[index],
        [field]:
          typeof value === "string"
            ? value
            : value
            ? parseInt(value.toString(), 10)
            : undefined,
      };
      return { ...prev, sets: updatedSets };
    });
  };

  // Remove an interval set
  const removeIntervalSet = (index: number) => {
    setWorkout((prev) => {
      const updatedSets = [...(prev.sets || [])];
      updatedSets.splice(index, 1);
      return { ...prev, sets: updatedSets };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!workout.title.trim()) {
      alert("Please enter a workout title");
      return;
    }

    onSave(workout);
  };

  // Handle delete
  const handleDelete = () => {
    if (onDelete && confirm("Are you sure you want to delete this workout?")) {
      onDelete(day);
    }
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
            {initialWorkout ? "Edit Workout" : "Add Workout"} - Day {day}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {initialWorkout
              ? "Update the details of this workout"
              : "Configure a new workout for this day"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info: Title and Type */}
            <div className="space-y-2">
              <Label htmlFor="title">Workout Title</Label>
              <Input
                id="title"
                name="title"
                value={workout.title}
                onChange={handleInputChange}
                placeholder="e.g., Long Run with Strides"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select
                value={workout.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy_run">Easy Run</SelectItem>
                  <SelectItem value="long_run">Long Run</SelectItem>
                  <SelectItem value="tempo_run">Tempo Run</SelectItem>
                  <SelectItem value="interval">Intervals</SelectItem>
                  <SelectItem value="hills">Hills</SelectItem>
                  <SelectItem value="fartlek">Fartlek</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                  <SelectItem value="race">Race</SelectItem>
                  <SelectItem value="cross_training">Cross Training</SelectItem>
                  <SelectItem value="rest">Rest Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Details: Intensity, Duration, and Distance */}
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity Level</Label>
              <Select
                value={workout.intensity}
                onValueChange={(value) =>
                  handleSelectChange("intensity", value as IntensityLevel)
                }
              >
                <SelectTrigger id="intensity">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recovery">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-2">
                        Recovery
                      </Badge>
                      <span>Very easy effort</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="easy">
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2">
                        Easy
                      </Badge>
                      <span>Comfortable conversational pace</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="moderate">
                    <div className="flex items-center">
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 mr-2">
                        Moderate
                      </Badge>
                      <span>Somewhat challenging</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hard">
                    <div className="flex items-center">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 mr-2">
                        Hard
                      </Badge>
                      <span>Challenging, high effort</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="race">
                    <div className="flex items-center">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mr-2">
                        Race
                      </Badge>
                      <span>Maximum effort</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={workout.duration ?? ""}
                  onChange={handleNumberChange}
                  placeholder="e.g., 45"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (meters)</Label>
                <Input
                  id="distance"
                  name="distance"
                  type="number"
                  value={workout.distance ?? ""}
                  onChange={handleNumberChange}
                  placeholder="e.g., 8000"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Workout Description</Label>
            <Textarea
              id="description"
              name="description"
              value={workout.description}
              onChange={handleInputChange}
              placeholder="Explain the workout details..."
              rows={3}
            />
          </div>

          {/* Intervals Section (only shown for interval workouts) */}
          {hasIntervals && (
            <div className="space-y-4">
              <Separator />

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Interval Sets
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addIntervalSet}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Set
                </Button>
              </div>

              {workout.sets &&
                workout.sets.map((set, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Set {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIntervalSet(index)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`set-${index}-reps`}>Repetitions</Label>
                        <Input
                          id={`set-${index}-reps`}
                          type="number"
                          value={set.reps}
                          onChange={(e) =>
                            updateIntervalSet(index, "reps", e.target.value)
                          }
                          min={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`set-${index}-distance`}>
                          Distance (m)
                        </Label>
                        <Input
                          id={`set-${index}-distance`}
                          type="number"
                          value={set.distance ?? ""}
                          onChange={(e) =>
                            updateIntervalSet(index, "distance", e.target.value)
                          }
                          placeholder="e.g., 400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`set-${index}-rest`}>
                          Rest (seconds)
                        </Label>
                        <Input
                          id={`set-${index}-rest`}
                          type="number"
                          value={set.rest ?? ""}
                          onChange={(e) =>
                            updateIntervalSet(index, "rest", e.target.value)
                          }
                          placeholder="e.g., 60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`set-${index}-pace`}>Target Pace</Label>
                        <Input
                          id={`set-${index}-pace`}
                          value={set.pace ?? ""}
                          onChange={(e) =>
                            updateIntervalSet(index, "pace", e.target.value)
                          }
                          placeholder="e.g., 1:30/400m"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`set-${index}-notes`}>Notes</Label>
                        <Input
                          id={`set-${index}-notes`}
                          value={set.notes ?? ""}
                          onChange={(e) =>
                            updateIntervalSet(index, "notes", e.target.value)
                          }
                          placeholder="Optional notes for this set"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={workout.notes || ""}
              onChange={handleInputChange}
              placeholder="Any additional instructions or notes..."
              rows={2}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            {initialWorkout && onDelete && (
              <Button
                type="button"
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:border-red-800 dark:hover:bg-red-900/20"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save Workout
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
