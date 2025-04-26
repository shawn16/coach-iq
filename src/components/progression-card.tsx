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
import { Copy, TrendingUp, ArrowRight } from "lucide-react";
import { Progression, ProgressionStep } from "@/lib/sample-data/builder-data"; // Import interfaces

interface ProgressionCardProps {
  progression: Progression;
}

export function ProgressionCard({
  progression,
}: ProgressionCardProps): React.ReactNode {
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
            <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-base text-gray-900 dark:text-gray-50">
              {progression.name}
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {progression.type} • {progression.weeks} weeks
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {progression.description}
        </p>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Progression Steps:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {progression.steps.map((step: ProgressionStep, index: number) => (
              <div key={index} className="flex items-center min-w-fit">
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium ${step.color}`}
                >
                  {step.label}
                </div>
                {index < progression.steps.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-gray-400 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-2">
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
                <p>Copy progression to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
