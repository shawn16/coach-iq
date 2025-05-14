"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const getTextColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "endurance support":
      return "text-green-600 dark:text-green-400";
    case "direct endurance":
      return "text-blue-600 dark:text-blue-400";
    case "specific endurance":
      return "text-purple-600 dark:text-purple-400";
    case "direct speed":
      return "text-red-600 dark:text-red-400";
    case "speed support":
      return "text-orange-600 dark:text-orange-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

interface WorkoutCardProps {
  workout: WorkoutLibrary;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const IconComponent = iconMap[workout.icon] || Clock; // Default to Clock if name not found

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-md ${getBackgroundColor(workout.category)}`}
          >
            <IconComponent // Use the mapped component
              className={`h-5 w-5 ${getTextColor(workout.category)}`}
            />
          </div>
          <div>
            <CardTitle className="text-base text-gray-900 dark:text-gray-50">
              {workout.name}
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {workout.category} • {workout.duration}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {workout.description}
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
      </CardContent>
    </Card>
  );
}
