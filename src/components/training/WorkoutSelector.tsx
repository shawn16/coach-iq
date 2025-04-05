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

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing icons - Search from lucide-react
import { Search } from "lucide-react";

// Importing hooks - useWorkoutSelector from @/hooks/useWorkoutSelector
import { useWorkoutSelector } from "@/hooks/useWorkoutSelector";

// Define the WorkoutSelectorProps type
interface WorkoutSelectorProps {
  workouts: Workout[];
  onSelect: (workout: Workout) => void;
  onCreateCustom: () => void;
}

// Define the WorkoutSelector component
export function WorkoutSelector({
  workouts,
  onSelect,
  onCreateCustom,
}: WorkoutSelectorProps) {
  // Define the state for the workout selector
  const { state, updateSearch, updateType, getWorkoutTypes } =
    useWorkoutSelector(workouts);

  // Define the main return function
  return (
    <Dialog>
      {/* Define the trigger */}
      <DialogTrigger asChild>
        <Button variant="outline">Select Workout</Button>
      </DialogTrigger>
      {/* Define the content */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Define the header */}
        <DialogHeader>
          <DialogTitle>Select Workout</DialogTitle>
        </DialogHeader>
        {/* Define the body */}
        <div className="space-y-4 py-4">
          {/* Define the search and filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                value={state.search}
                onChange={(e) => updateSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={state.type} onValueChange={updateType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {getWorkoutTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Define the workouts */}
          <div className="space-y-2">
            {state.filteredWorkouts.map((workout) => (
              <Button
                key={workout.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onSelect(workout)}
              >
                <div className="text-left">
                  <div className="font-medium">{workout.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {workout.type} • {workout.duration} min
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {/* Define the create custom workout button */}
          <Button variant="outline" className="w-full" onClick={onCreateCustom}>
            Create Custom Workout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
