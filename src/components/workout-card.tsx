"use client";

import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Gauge, Zap, Activity, Flame, LifeBuoy, Dumbbell, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WorkoutLibrary } from "@/types/training";
import { EditWorkoutSheet } from "@/components/dialogs/workout-sheet";
import { useState } from "react";

// Map icon names (strings) to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Gauge: Gauge,      // Tempo Run
  Zap: Zap,         // Interval
  Activity: Activity, // Long Run
  Flame: Flame,     // Fartlek
  LifeBuoy: LifeBuoy, // Recovery
  Dumbbell: Dumbbell, // Strength
  running: Activity, // Default icon
};

const getBackgroundColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "endurance support":
      return "bg-green-100 dark:bg-green-900/50";
    case "direct endurance":
      return "bg-blue-100 dark:bg-blue-900/50";
    case "specific endurance":
      return "bg-purple-100 dark:bg-purple-900/50";
    case "direct speed":
      return "bg-red-100 dark:bg-red-900/50";
    case "speed support":
      return "bg-orange-100 dark:bg-orange-900/50";
    default:
      return "bg-gray-100 dark:bg-gray-900/50";
  }
};


interface WorkoutCardProps {
  workout: WorkoutLibrary;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const IconComponent = iconMap[workout.icon] || Clock; // Default to Clock if name not found
  // State for edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState(workout);

  // Handler for saving edits - improved to prevent UI freeze
  const handleEditSave = (updatedWorkout: WorkoutLibrary) => {
    // First update data
    setWorkoutData(prev => ({
      ...prev,
      ...updatedWorkout
    }));
    console.log("Updated workout with data:", updatedWorkout);
  };
  
  // Handler for dialog close
  const handleDialogClose = () => {
    setEditOpen(false);
  };

  return (
    <Card
      className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onDoubleClick={() => setEditOpen(true)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 w-full">
            <div className={`p-2 rounded-md ${getBackgroundColor(workoutData.category)}`}>
              <IconComponent className="h-4 w-4" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {workoutData.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {workoutData.description}
        </p>
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy workout to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Edit Workout Dialog */}
        <EditWorkoutSheet
          open={editOpen}
          onOpenChange={handleDialogClose}
          onSave={handleEditSave}
          workout={workoutData}
        />
      </CardContent>
    </Card>
  );
}
