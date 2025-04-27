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
import { IntervalSetEditor } from "./IntervalSetEditor";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : undefined,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setWorkout((prev) => ({ ...prev, [name]: value }));

    if (name === "type") {
      setHasIntervals(value === "interval");

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

  const removeIntervalSet = (index: number) => {
    setWorkout((prev) => {
      const updatedSets = [...(prev.sets || [])];
      updatedSets.splice(index, 1);
      return { ...prev, sets: updatedSets };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workout.title.trim()) {
      alert("Please enter a workout title");
      return;
    }

    onSave(workout);
  };

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
          {/* Basic Info: Title and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Intervals Section (only shown for interval workouts) */}
          {hasIntervals && (
            <IntervalSetEditor
              sets={workout.sets}
              onAddSet={addIntervalSet}
              onUpdateSet={updateIntervalSet}
              onRemoveSet={removeIntervalSet}
            />
          )}
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
