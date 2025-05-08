"use client";

// This file contains the TrainingPlanCard component that displays a summary of a training plan
// Used in the training plans list page to show basic plan information and actions

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarDays,
  Clock,
  Users,
  Pencil,
  Copy,
  Eye,
  Timer,
  MonitorIcon as Running,
  Award,
} from "lucide-react";

// Type Definitions
type PlanType = "endurance" | "speed" | "strength" | "marathon" | "standard";

// Type definition for a training plan in the UI
export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "12 weeks"
  startDate: string;
  athletes: number;
  progress?: number;
  type?: PlanType; // e.g., "endurance", "speed", etc.
  planType?: string; // e.g., "xc" (cross country), "track", etc.
}

// Props for the TrainingPlanCard component
interface TrainingPlanCardProps {
  plan: TrainingPlan;
  onViewDetails: (id: string) => void;
  onEdit?: (id: string) => void; // Added onEdit prop
  isActive?: boolean; // Whether the plan is active or completed
  isCompleted?: boolean; // Whether the plan has been explicitly marked as completed
}

/**
 * Component for displaying a training plan card
 * Shows key plan information like title, description, progress, and athlete count
 * Includes actions for viewing details and editing
 */
export function TrainingPlanCard({
  plan,
  onViewDetails,
  onEdit, // Added onEdit prop
  isActive = false,
  isCompleted = false,
}: TrainingPlanCardProps): React.ReactNode {
  // Determine plan type icon
  const getPlanTypeIcon = (): React.ReactNode => {
    switch (plan.type) {
      case "marathon":
        return <Running className="h-6 w-6 text-blue-500" />;
      case "speed":
        return <Timer className="h-6 w-6 text-amber-500" />;
      case "strength":
        return <Award className="h-6 w-6 text-purple-500" />;
      case "endurance":
      default:
        return <Clock className="h-6 w-6 text-green-500" />;
    }
  };

  // Common button styles for consistency
  const buttonIconClass = "h-4 w-4 mr-2";
  const secondaryButtonClass =
    "text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors h-9 px-4";
  const primaryButtonClass =
    "bg-indigo-600 hover:bg-indigo-700 text-white h-9 px-4";

  return (
    <TooltipProvider>
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>
              <Button
                variant="link"
                className="p-0 h-auto font-bold text-lg text-indigo-600 dark:text-indigo-400"
                onClick={() => onViewDetails(plan.id)}
              >
                {plan.title}
              </Button>
            </CardTitle>
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    {getPlanTypeIcon()}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Plan Type: {plan.type || "Standard"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {plan.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm">
                        <span className="font-medium">Duration:</span>{" "}
                        {plan.duration}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Program Duration: {plan.duration}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm">
                        <span className="font-medium">Athletes:</span>{" "}
                        {plan.athletes}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of Athletes: {plan.athletes}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm">
                        <span className="font-medium">Starts:</span>{" "}
                        {plan.startDate}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start Date: {plan.startDate}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {(isActive || isCompleted) && plan.progress !== undefined && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              isCompleted ? "bg-green-600" : "bg-indigo-600"
                            }`}
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {plan.progress}%
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Progress: {plan.progress}% Complete</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={secondaryButtonClass}
            >
              <Copy className={buttonIconClass} />
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={secondaryButtonClass}
              onClick={() => onEdit && onEdit(plan.id)}
            >
              <Pencil className={buttonIconClass} />
              Edit
            </Button>
            <Button
              size="sm"
              className={primaryButtonClass}
              onClick={() => onViewDetails(plan.id)}
            >
              <Eye className={buttonIconClass} />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
