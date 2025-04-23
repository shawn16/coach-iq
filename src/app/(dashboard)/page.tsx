"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Users, BarChart3, Zap, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Welcome to CoachIQ
        </h1>
        <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
          Your all-in-one platform for training management and athlete
          development
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Training Plan Card */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <div className="rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/50">
              <ClipboardList className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Training Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Create and manage training plans for your athletes</p>
            <p>
              Develop structured training programs, apply progressions, and
              track workouts over time.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button
              onClick={() => handleNavigate("/training-plan")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Athletes Card */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/50">
              <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle className="text-xl font-semibold">Athletes</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Manage athlete profiles and track their progress</p>
            <p>
              Maintain detailed athlete records, set goals, and analyze
              performance metrics.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button
              onClick={() => handleNavigate("/athletes")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View Athletes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Workout Results Card */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <div className="rounded-lg bg-rose-100 p-3 dark:bg-rose-900/50">
              <BarChart3 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Workout Results
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Record and analyze workout performance data</p>
            <p>
              Capture detailed workout metrics, view trends, and gain insights
              from AI-powered analysis.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button
              onClick={() => handleNavigate("/workout-results")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View Results <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Assistant Coach Section */}
      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Assistant Coach</h2>
        </div>
        <p className="mt-2 text-purple-100">
          Your AI-powered coaching assistant. Get personalized training
          recommendations, analyze workout data, and optimize your coaching
          strategy.
        </p>
        {/* Add Input/Button for interaction if needed */}
      </div>
    </div>
  );
}
