"use client";

// Importing components and libraries - Workout and WorkoutType types from @/types/progression
import { Workout, WorkoutType } from "@/types/progression";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing components and libraries - Input component from shadcn/ui
import { Input } from "@/components/ui/input";

// Importing components and libraries - Select component from shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importing components and libraries - Lucide icons
import { Plus, Trash2 } from "lucide-react";

// Importing utils - getWorkoutTypeIcon from @/utils/workout
import { getWorkoutTypeIcon } from "@/utils/workout";

// Define the props interface for the WorkoutBuilder component
interface WorkoutBuilderProps {
  workouts: Workout[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, workout: Workout) => void;
}

// Define the WorkoutBuilder component
export function WorkoutBuilder({
  workouts,
  onAdd,
  onRemove,
  onUpdate,
}: WorkoutBuilderProps) {
  // Define the main return function
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Workouts</h3>
        <Button onClick={onAdd} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Workout
        </Button>
      </div>

      {/* Render the workouts */}
      <div className="space-y-2">
        {workouts.map((workout, index) => (
          <div
            key={workout.id}
            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            {/* Render the workout details */}
            <div className="flex-1 grid grid-cols-4 gap-2">
              <Select
                value={workout.type}
                onValueChange={(value) =>
                  onUpdate(index, { ...workout, type: value as WorkoutType })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tempo">
                    {getWorkoutTypeIcon("tempo")} Tempo
                  </SelectItem>
                  <SelectItem value="interval">
                    {getWorkoutTypeIcon("interval")} Interval
                  </SelectItem>
                  <SelectItem value="long_run">
                    {getWorkoutTypeIcon("long_run")} Long Run
                  </SelectItem>
                  <SelectItem value="fartlek">
                    {getWorkoutTypeIcon("fartlek")} Fartlek
                  </SelectItem>
                  <SelectItem value="recovery_run">
                    {getWorkoutTypeIcon("recovery_run")} Recovery Run
                  </SelectItem>
                  <SelectItem value="custom">
                    {getWorkoutTypeIcon("custom")} Custom
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Render the name input */}
              <Input
                type="text"
                value={workout.name}
                onChange={(e) =>
                  onUpdate(index, { ...workout, name: e.target.value })
                }
                placeholder="Name"
              />

              {/* Render the value input */}
              <Input
                type="text"
                value={workout.value}
                onChange={(e) =>
                  onUpdate(index, { ...workout, value: e.target.value })
                }
                placeholder="Value"
              />

              {/* Render the description input */}
              <Input
                type="text"
                value={workout.description}
                onChange={(e) =>
                  onUpdate(index, { ...workout, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>

            <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
