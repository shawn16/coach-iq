"use client";

// Importing components and libraries - Card component from shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Importing components and libraries - Progress component from shadcn/ui
import { Progress } from "@/components/ui/progress";

// Importing components and libraries - Utility function for class name concatenation
import { cn } from "@/lib/utils";

// Importing types - ProgressionTemplate type from @/types/progression
import { ProgressionTemplate } from "@/types/progression";

// Importing components and libraries - Lucide icons
import {
  LineChart,
  BarChart3,
  Percent,
  HelpCircle,
  Calendar,
  Clock,
} from "lucide-react";

// Importing components and libraries - Tooltip component from shadcn/ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the props interface for the ProgressionTemplateCard component
interface ProgressionTemplateCardProps {
  template: ProgressionTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

// Define the ProgressionTemplateCard component
export function ProgressionTemplateCard({
  template,
  isSelected,
  onSelect,
}: ProgressionTemplateCardProps) {
  // Define the getIcon function
  const getIcon = () => {
    switch (template.type) {
      case "linear":
        return <LineChart className="h-5 w-5 text-blue-500" />;
      case "wave":
        return <BarChart3 className="h-5 w-5 text-green-500" />;
      case "step":
        return <Percent className="h-5 w-5 text-purple-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Define the getStatusColor function
  const getStatusColor = () => {
    switch (template.status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "draft":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Define the main return function
  return (
    <TooltipProvider>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-lg",
          isSelected
            ? "border-2 border-indigo-500"
            : "border border-gray-200 dark:border-gray-700"
        )}
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {template.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    {getIcon()}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Type: {template.type}</p>
                </TooltipContent>
              </Tooltip>
              {template.status && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor()}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Status: {template.status}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{template.duration} weeks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{template.metric}</span>
              </div>
            </div>
            {template.progress !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="font-medium">{template.progress}%</span>
                </div>
                <Progress value={template.progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

// Export the ProgressionTemplateCard component as the default export
export default ProgressionTemplateCard;
