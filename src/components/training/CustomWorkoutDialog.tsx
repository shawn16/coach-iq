"use client";

// Importing components - Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger from @/components/ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing hooks - useCustomWorkoutDialog from @/hooks/useCustomWorkoutDialog
import { useCustomWorkoutDialog } from "@/hooks/useCustomWorkoutDialog";

// Importing icons - AlertCircle from lucide-react
import { AlertCircle } from "lucide-react";

// Importing hooks - useCustomWorkoutDialog from @/hooks/useCustomWorkoutDialog
import { useCustomWorkoutDialog } from "@/hooks/useCustomWorkoutDialog";

// Define the CustomWorkoutDialogProps type
interface CustomWorkoutDialogProps {
  onSave: (workout: Omit<Workout, "id">) => void;
}

// Define the CustomWorkoutDialog component
export function CustomWorkoutDialog({ onSave }: CustomWorkoutDialogProps) {
  // Define the state for the custom workout dialog
  const { state, setState, validate, getWorkout, reset } =
    useCustomWorkoutDialog();

  // Define the handleSave function
  const handleSave = () => {
    if (validate()) {
      onSave(getWorkout());
      reset();
    }
  };

  // Define the main return function
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Custom Workout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Custom Workout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          {/* Define the input fields */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={state.name}
              onChange={(e) =>
                setState((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter workout name"
            />
          </div>
          {/* Define the type select */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={state.type}
              onValueChange={(value) =>
                setState((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tempo">Tempo</SelectItem>
                <SelectItem value="interval">Interval</SelectItem>
                <SelectItem value="long_run">Long Run</SelectItem>
                <SelectItem value="fartlek">Fartlek</SelectItem>
                <SelectItem value="recovery_run">Recovery Run</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Define the description textarea */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={state.description}
              onChange={(e) =>
                setState((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter workout description"
            />
          </div>
          {/* Define the duration input */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              type="number"
              value={state.duration}
              onChange={(e) =>
                setState((prev) => ({ ...prev, duration: e.target.value }))
              }
              placeholder="Enter duration"
            />
          </div>
          {/* Define the distance input */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Distance (miles)</label>
            <Input
              type="number"
              value={state.distance}
              onChange={(e) =>
                setState((prev) => ({ ...prev, distance: e.target.value }))
              }
              placeholder="Enter distance"
            />
          </div>
          {/* Define the pace input */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Pace (min/mile)</label>
            <Input
              value={state.pace}
              onChange={(e) =>
                setState((prev) => ({ ...prev, pace: e.target.value }))
              }
              placeholder="Enter pace"
            />
          </div>
          {/* Define the intensity input */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Intensity (1-10)</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={state.intensity}
              onChange={(e) =>
                setState((prev) => ({ ...prev, intensity: e.target.value }))
              }
              placeholder="Enter intensity"
            />
          </div>
          {/* Define the notes textarea */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={state.notes}
              onChange={(e) =>
                setState((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Enter notes"
            />
          </div>
        </div>
        {/* Define the save button */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
