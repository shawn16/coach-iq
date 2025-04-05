import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the TrainingPlan interface - Represents a training plan
export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  athletes: number;
  startDate: string;
  progress?: number; // Optional progress percentage for active plans
  type?: "endurance" | "speed" | "strength" | "marathon"; // Optional plan type
}

// Define the props interface for the TrainingPlanCard component
interface TrainingPlanCardProps {
  plan: TrainingPlan;
  onViewDetails: (id: string) => void;
  isActive?: boolean;
  isCompleted?: boolean;
}

// TrainingPlanCard component - A reusable card component for displaying training plans
export function TrainingPlanCard({
  plan,
  onViewDetails,
  isActive = false,
  isCompleted = false,
}: TrainingPlanCardProps) {
  // Function to get the appropriate icon based on plan type
  const getPlanTypeIcon = () => {
    switch (plan.type) {
      case "endurance":
        return <Running className="h-5 w-5 text-blue-500" />;
      case "speed":
        return <Timer className="h-5 w-5 text-green-500" />;
      case "strength":
        return <Award className="h-5 w-5 text-amber-500" />;
      case "marathon":
        return <Running className="h-5 w-5 text-purple-500" />;
      default:
        return <Running className="h-5 w-5 text-gray-500" />;
    }
  };

  // Render the component - A reusable card component for displaying training plans
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getPlanTypeIcon()}
            <CardTitle className="text-gray-900 dark:text-gray-50">
              {plan.title}
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(plan.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Plan</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate Plan</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <CalendarDays className="h-4 w-4" />
            <span>{plan.startDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{plan.duration} weeks</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4" />
            <span>{plan.athletes} athletes</span>
          </div>
          {plan.progress !== undefined && (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            isCompleted
                              ? "bg-green-600"
                              : isActive
                              ? "bg-indigo-600"
                              : "bg-gray-400"
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
              </TooltipProvider>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
