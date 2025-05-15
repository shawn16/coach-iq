import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardHeaderWithIcon } from "@/components/ui/card-header-with-icon";
import { WorkoutCard } from "@/components/workout-card";
import { Library, Plus } from "lucide-react";
import type { WorkoutLibrary } from "@/types/training-plans";

// Props interface for the WorkoutBuilderTab component
interface WorkoutBuilderTabProps {
  // Array of workouts to display
  workouts: WorkoutLibrary[];
  // Callback for when the create workout button is clicked
  onCreateWorkout: () => void;
}

// Component for the Workout Builder tab content
export function WorkoutBuilderTab({ workouts, onCreateWorkout }: WorkoutBuilderTabProps) {
  return (
    <Card>
      <CardHeader className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <CardHeaderWithIcon
            icon={Library}
            title="Workout Library"
            description="Double-click on a workout to view or edit details"
            colorTheme="blue"
          />
          <Button 
            onClick={onCreateWorkout}
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create New Workout
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
          {workouts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No workouts in the library yet. Click &quot;Create New Workout&quot; to add one.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
