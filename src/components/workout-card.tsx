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
import { Copy, Clock, Repeat, CalendarIcon, Zap } from "lucide-react"; // Import necessary icons
import type { LucideIcon } from "lucide-react";
import { Workout } from "@/lib/sample-data/builder-data"; // Import the interface

// Map icon names (strings) to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Clock: Clock,
  Repeat: Repeat,
  CalendarIcon: CalendarIcon,
  Zap: Zap,
  // Add other icons used in workoutLibrary if necessary
};

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const IconComponent = iconMap[workout.icon] || Clock; // Default to Clock if name not found

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-md ${
              workout.type === "tempo"
                ? "bg-indigo-100 dark:bg-indigo-900/50"
                : workout.type === "interval"
                ? "bg-blue-100 dark:bg-blue-900/50"
                : workout.type === "long_run"
                ? "bg-green-100 dark:bg-green-900/50"
                : "bg-purple-100 dark:bg-purple-900/50"
            }`}
          >
            <IconComponent // Use the mapped component
              className={`h-5 w-5 ${
                workout.type === "tempo"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : workout.type === "interval"
                  ? "text-blue-600 dark:text-blue-400"
                  : workout.type === "long_run"
                  ? "text-green-600 dark:text-green-400"
                  : "text-purple-600 dark:text-purple-400"
              }`}
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
