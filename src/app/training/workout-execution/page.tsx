import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const sampleWorkouts = [
  { id: 1, title: "Morning Run", description: "5km easy pace", completed: false },
  { id: 2, title: "Interval Training", description: "8x400m at 5K pace", completed: false },
  { id: 3, title: "Strength Training", description: "Upper body workout", completed: false },
];

export default function WorkoutExecutionPage() {
  const [workouts, setWorkouts] = useState(sampleWorkouts);

  const toggleCompletion = (id: number) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Workout Execution</h1>
      <p className="text-gray-600">Track and record your workout progress for today.</p>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <Card key={workout.id} className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>{workout.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{workout.description}</p>
              <div className="flex items-center mt-4">
                <Checkbox
                  checked={workout.completed}
                  onCheckedChange={() => toggleCompletion(workout.id)}
                  id={`workout-${workout.id}`}
                />
                <label
                  htmlFor={`workout-${workout.id}`}
                  className="ml-2 text-gray-700 dark:text-gray-300"
                >
                  Mark as completed
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => console.log("Workout data saved:", workouts)}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Save Progress
      </Button>
    </div>
  );
}
