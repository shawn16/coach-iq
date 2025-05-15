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
      className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer aspect-[1.2/1] max-w-[400px] mx-auto w-full group relative"
      onDoubleClick={() => setEditOpen(true)}
    >
      {/* Copy Button - Positioned absolutely and visible on hover */}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-sm"
              >
                <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy workout to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg ${getBackgroundColor(workoutData.category)} ring-1 ring-black/5 dark:ring-white/5`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="space-y-1 min-h-[40px] flex-1">
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 line-clamp-1">
                {workoutData.name || 'Untitled Workout'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <span>{workoutData.type}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span>{workoutData.duration || 'No duration set'}</span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col justify-between h-[calc(100%-6rem)]">
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 min-h-[3em]">
          {workoutData.description || 'No description available'}
        </p>
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
