"use client";

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing hooks - useWorkoutCard from @/hooks/useWorkoutCard
import { useWorkoutCard } from "@/hooks/useWorkoutCard";

// Importing components - Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue from @/components/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importing icons - Pencil, Trash2, Check, X from lucide-react
import { Pencil, Trash2, Check, X } from "lucide-react";

// Define the WorkoutCardProps type
interface WorkoutCardProps {
  workout: Workout;
  onUpdate: (workout: Workout) => void;
  onRemove: () => void;
}

// Define the WorkoutCard component
export function WorkoutCard({ workout, onUpdate, onRemove }: WorkoutCardProps) {
  // Define the state for the workout card
  const { state, startEditing, stopEditing, updateWorkout } =
    useWorkoutCard(workout);

  // Define the handleSave function
  const handleSave = () => {
    onUpdate(state.workout);
    stopEditing();
  };

  // Define the handleCancel function
  const handleCancel = () => {
    updateWorkout(workout);
    stopEditing();
  };

  // Define the main return function
  return (
    <div className="p-4 border rounded-lg space-y-4">
      {/* Define the editing form */}
      <div className="space-y-2">
        <Input
          value={state.workout.name}
          onChange={(e) => updateWorkout({ name: e.target.value })}
          placeholder="Workout name"
          />
          <Select
            value={state.workout.type}
            onValueChange={(value) => updateWorkout({ type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="run">Run</SelectItem>
              <SelectItem value="bike">Bike</SelectItem>
              <SelectItem value="swim">Swim</SelectItem>
              <SelectItem value="strength">Strength</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            value={state.workout.description}
            onChange={(e) => updateWorkout({ description: e.target.value })}
            placeholder="Description"
          />
          <Input
            type="number"
            value={state.workout.duration}
            onChange={(e) =>
              updateWorkout({ duration: Number(e.target.value) })
            }
            placeholder="Duration"
          />
          <Input
            type="number"
            value={state.workout.distance}
            onChange={(e) =>
              updateWorkout({ distance: Number(e.target.value) })
            }
            placeholder="Distance"
          />
          <Input
            value={state.workout.pace}
            onChange={(e) => updateWorkout({ pace: e.target.value })}
            placeholder="Pace"
          />
          <Input
            type="number"
            value={state.workout.intensity}
            onChange={(e) =>
              updateWorkout({ intensity: Number(e.target.value) })
            }
            placeholder="Intensity"
          />
          <Textarea
            value={state.workout.notes}
            onChange={(e) => updateWorkout({ notes: e.target.value })}
            placeholder="Notes"
          />
        </div>
        {/* Define the save and cancel buttons */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Check className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    );
  }

  // Define the main return function
  return (
    <div className="p-4 border rounded-lg space-y-4">
      {/* Define the header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{state.workout.name}</h3>
          <p className="text-sm text-gray-500">{state.workout.type}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={startEditing}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Define the description */}
      {state.workout.description && (
        <p className="text-sm">{state.workout.description}</p>
      )}
      {/* Define the duration */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {state.workout.duration && (
          <div>
            <span className="text-gray-500">Duration:</span>{" "}
            {state.workout.duration} minutes
          </div>
        )}
        {/* Define the distance */}
        {state.workout.distance && (
          <div>
            <span className="text-gray-500">Distance:</span>{" "}
            {state.workout.distance} miles
          </div>
        )}
        {/* Define the pace */}
        {state.workout.pace && (
          <div>
            <span className="text-gray-500">Pace:</span> {state.workout.pace}{" "}
            min/mile
          </div>
        )}
        {/* Define the intensity */}
        {state.workout.intensity && (
          <div>
            <span className="text-gray-500">Intensity:</span>{" "}
            {state.workout.intensity}
          </div>
        )}
      </div>
      {/* Define the notes */}
      {state.workout.notes && (
        <p className="text-sm text-gray-500">{state.workout.notes}</p>
      )}
    </div>
  );
}
