"use client";

// Importing components - Button, Input, Textarea from @/components/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing components - WeekView from @/components/training
import { WeekView } from "./WeekView";

// Importing hooks - useTrainingPlanForm from @/hooks/useTrainingPlanForm
import { useTrainingPlanForm } from "@/hooks/useTrainingPlanForm";

// Importing icons - AlertCircle from lucide-react
import { AlertCircle } from "lucide-react";

// Define the TrainingPlanFormProps type
interface TrainingPlanFormProps {
  onSave: (plan: {
    name: string;
    description: string;
    duration: number;
    weeks: Workout[][];
  }) => void;
  onCancel: () => void;
}

// Define the TrainingPlanForm component
export function TrainingPlanForm({ onSave, onCancel }: TrainingPlanFormProps) {
  // Define the state for the training plan form
  const {
    state,
    setState,
    validate,
    addWeek,
    addWorkout,
    removeWorkout,
    moveWorkout,
    getPlan,
  } = useTrainingPlanForm();

  // Define the handleSave function
  const handleSave = () => {
    if (validate()) {
      onSave(getPlan());
    }
  };

  // Define the main return function
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={state.name}
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter plan name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (weeks)</label>
          <Input
            type="number"
            value={state.duration}
            onChange={(e) =>
              setState((prev) => ({ ...prev, duration: e.target.value }))
            }
            placeholder="Enter duration"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={state.description}
          onChange={(e) =>
            setState((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter plan description"
        />
      </div>
      {state.errors.length > 0 && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <ul className="list-disc list-inside">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Define the WeekView component */}
      <div className="space-y-4">
        {state.weeks.map((weekWorkouts, weekIndex) => (
          <WeekView
            key={weekIndex}
            weekNumber={weekIndex + 1}
            workouts={weekWorkouts}
            onAddWorkout={() => addWorkout(weekIndex)}
            onRemoveWorkout={(workoutId) => removeWorkout(weekIndex, workoutId)}
            onMoveWorkout={(workoutId, direction) =>
              moveWorkout(weekIndex, workoutId, direction)
            }
          />
        ))}
        <Button variant="outline" onClick={addWeek}>
          Add Week
        </Button>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
