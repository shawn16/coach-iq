"use client";

// Importing components - Button, Card, CardContent, CardHeader, CardTitle from @/components/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Importing types - Workout from @/types/workout
import { Workout } from "@/types/workout";

// Importing components - WorkoutCard from @/components/training
import { WorkoutCard } from "./WorkoutCard";

// Importing icons - Plus from lucide-react
import { Plus } from "lucide-react";

// Importing hooks - useWeekView from @/hooks/useWeekView
import { useWeekView } from "@/hooks/useWeekView";

// Define the WeekViewProps type
interface WeekViewProps {
  weekNumber: number;
  workouts: Workout[];
  onAddWorkout: () => void;
  onRemoveWorkout: (workoutId: string) => void;
  onMoveWorkout: (workoutId: string, direction: "up" | "down") => void;
}

// Define the WeekView component
export function WeekView({
  weekNumber,
  workouts,
  onAddWorkout,
  onRemoveWorkout,
  onMoveWorkout,
}: WeekViewProps) {
  // Define the state for the week view
  const { state } = useWeekView(workouts);

  // Define the main return function
  return (
    <Card>
      {/* Define the header */}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Week {weekNumber}</span>
          <Button variant="outline" size="sm" onClick={onAddWorkout}>
            <Plus className="h-4 w-4 mr-2" />
            Add Workout
          </Button>
        </CardTitle>
      </CardHeader>
      {/* Define the content */}
      <CardContent className="space-y-4">
        {/* Define the workouts */}
        {state.workouts.map((workout, index) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onRemove={() => onRemoveWorkout(workout.id)}
            onMove={(direction) => {
              if (direction === "up" && index > 0) {
                onMoveWorkout(workout.id, "up");
              } else if (
                direction === "down" &&
                index < state.workouts.length - 1
              ) {
                onMoveWorkout(workout.id, "down");
              }
            }}
            isDragging={state.isDragging}
          />
        ))}
        {state.workouts.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No workouts scheduled for this week
          </div>
        )}
      </CardContent>
    </Card>
  );
}
