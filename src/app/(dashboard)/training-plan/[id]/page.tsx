"use client";

import type React from "react"; // Import React for ReactNode type
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  ArrowLeft,
  Pencil,
  Copy,
  Timer,
  MonitorIcon as Running,
  Award,
  Info,
} from "lucide-react";
import { TrainingPlanTable } from "@/components/training-plan-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import {
  TrainingPlanDetail,
  PlanSubType,
  getTrainingPlanById,
  workoutTypes,
} from "@/lib/sample-data/training-plans"; // Import necessary types/functions/data

export default function TrainingPlanDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [plan, setPlan] = useState<TrainingPlanDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Map plan type values to display names
  const planTypeNames: Record<string, string> = {
    xc: "Cross Country",
    track: "Track",
    road: "Road Racing",
    custom: "Custom",
  };

  // Determine plan type icon
  const getPlanTypeIcon = (type: PlanSubType): React.ReactNode => {
    switch (type) {
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

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedPlan = getTrainingPlanById(params.id); // Use imported function
    setPlan(fetchedPlan);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Training Plan Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The training plan you are looking for could not be found or may
              have been deleted.
            </p>
            <Button
              onClick={() => router.push("/training-plan")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Training Plans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back button and header */}
      <div className="flex flex-col mb-6 space-y-4">
        <Button
          variant="ghost"
          className="w-fit p-0 h-auto text-gray-600 dark:text-gray-400 hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-50"
          onClick={() => router.push("/training-plan")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Training Plans
        </Button>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {plan.title}
          </h1>
          <TooltipProvider>
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    {getPlanTypeIcon(plan.type)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Plan Type: {plan.type || "Standard"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Plan Overview Card */}
      <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
              <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-gray-900 dark:text-gray-50">
              Plan Overview
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </h3>
                <p className="text-gray-900 dark:text-gray-50 mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Plan Type
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 mt-1">
                    {planTypeNames[plan.planType] || plan.type}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 mt-1">
                    {plan.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Start Date
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 mt-1">
                    {plan.startDate
                      ? format(plan.startDate, "MM/dd/yyyy")
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    End Date
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 mt-1">
                    {plan.endDate
                      ? format(plan.endDate, "MM/dd/yyyy")
                      : "Not set"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Athletes
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <p className="text-gray-900 dark:text-gray-50">
                      {plan.athletes}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Workouts
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 mt-1">
                    {plan.totalWorkouts}
                  </p>
                </div>
              </div>

              {plan.progress !== undefined && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Progress
                  </h3>
                  <div className="flex items-center gap-2 w-full mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-indigo-600"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {plan.progress}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 dark:text-gray-300 h-9 px-4"
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 dark:text-gray-300 h-9 px-4"
              onClick={() => router.push(`/training-plan-builder/${params.id}`)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Schedule */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Training Schedule
        </h2>
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 transition-colors duration-150">
            {/* Scroll shadows */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-left"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-right"></div>
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-top"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-bottom"></div>

            {/* Read-only training plan table */}
            <TrainingPlanTable
              planData={plan.planData}
              workoutTypes={workoutTypes}
              readOnly={true} // Passing readOnly to make table read-only
            />
          </div>
        </div>
      </div>
    </div>
  );
}
