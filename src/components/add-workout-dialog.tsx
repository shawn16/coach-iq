"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { WorkoutBuilder } from "./WorkoutBuilder";

// --- Component Interface ---
interface AddWorkoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (workout: string) => void;
}

// --- Component ---
export function AddWorkoutDialog({
  isOpen,
  onClose,
  onAdd,
}: AddWorkoutDialogProps) {
  const [workoutType, setWorkoutType] = useState("distance");
  const [distance, setDistance] = useState("5");
  const [intensity, setIntensity] = useState("70");
  const [unit, setUnit] = useState("m");
  const [rest, setRest] = useState("1");
  const [restUnit, setRestUnit] = useState("min");
  const [reps, setReps] = useState("4");
  const [customWorkout, setCustomWorkout] = useState("");

  const handleAdd = () => {
    let workout = "";

    if (workoutType === "custom") {
      workout = customWorkout;
    } else if (workoutType === "distance") {
      workout = `${distance}${unit}@${intensity}%`;
    } else if (workoutType === "interval") {
      workout = `${reps}x${distance}${unit}@${intensity}% w/${rest}'${restUnit}`;
    } else if (workoutType === "fartlek") {
      workout = `1-2-3-2-1 w/${rest}'${restUnit} H (${distance} total)`;
    } else if (workoutType === "tempo") {
      workout = `${distance}${unit}@${intensity}% w/${rest}'`;
    }

    onAdd(workout);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-[500px] border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Add Workout
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger
              value="builder"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Workout Builder
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Custom
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <WorkoutBuilder
              workoutType={workoutType}
              setWorkoutType={setWorkoutType}
              distance={distance}
              setDistance={setDistance}
              unit={unit}
              setUnit={setUnit}
              intensity={intensity}
              setIntensity={setIntensity}
              rest={rest}
              setRest={setRest}
              restUnit={restUnit}
              setRestUnit={setRestUnit}
              reps={reps}
              setReps={setReps}
            />
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="custom-workout"
                className="text-gray-700 dark:text-gray-300"
              >
                Custom Workout
              </Label>
              <Input
                id="custom-workout"
                value={customWorkout}
                onChange={(e) => setCustomWorkout(e.target.value)}
                placeholder="e.g., 5x800m@5K pace w/2' rest"
                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {workoutTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    setCustomWorkout(template.workout);
                    setWorkoutType("custom");
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {template.workout}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add Workout
          </Button>
        </div>
      </div>
    </div>
  );
}

// Sample workout templates
const workoutTemplates = [
  { id: 1, name: "Easy Run", workout: "30-45min@65-70%" },
  { id: 2, name: "Long Run", workout: "60-90min@65-75%" },
  { id: 3, name: "Tempo Run", workout: "20min@85-90%" },
  { id: 4, name: "400m Intervals", workout: "8-12x400m@5K pace w/90sec rest" },
  { id: 5, name: "800m Intervals", workout: "6-8x800m@10K pace w/2min rest" },
  {
    id: 6,
    name: "1600m Intervals",
    workout: "4-5x1600m@10K-HM pace w/3min rest",
  },
  {
    id: 7,
    name: "Hill Repeats",
    workout: "8-10x200m hills @hard effort w/jog down recovery",
  },
  { id: 8, name: "Fartlek", workout: "1-2-3-2-1 w/equal rest (9min total)" },
  {
    id: 9,
    name: "Progression Run",
    workout: "8-10mi starting@70% finishing@85%",
  },
];
