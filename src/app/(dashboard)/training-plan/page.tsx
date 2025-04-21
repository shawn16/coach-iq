"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export default function TrainingPlanPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5;

  // This will be replaced with real data from Supabase later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activePlans, setActivePlans] = useState<TrainingPlan[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [completedPlans, setCompletedPlans] = useState<TrainingPlan[]>([]);

  // Handle navigation programmatically
  const handleViewDetails = (id: string) => {
    router.push(`/planning/training-plan/${id}`);
  };

  // Navigate to plan builder
  const handleCreatePlan = () => {
    router.push("/planning/plan-builder");
  };

  // Navigate to edit plan
  const handleEditPlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/planning/plan-builder/${id}`);
  };

  // Handle plan duplication
  const handleDuplicatePlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // This will be implemented with Supabase
    console.log("Duplicate plan", id);
  };

  // Get paginated plans
  const getPaginatedPlans = (plans: TrainingPlan[]) => {
    const startIndex = (currentPage - 1) * plansPerPage;
    const endIndex = startIndex + plansPerPage;
    return {
      plans: plans.slice(startIndex, endIndex),
      totalPlans: plans.length,
      totalPages: Math.ceil(plans.length / plansPerPage),
    };
  };

  const {
    plans: paginatedActivePlans,
    totalPlans: activeTotalPlans,
    totalPages: activeTotalPages,
  } = getPaginatedPlans(activePlans);

  const {
    plans: paginatedCompletedPlans,
    totalPlans: completedTotalPlans,
    totalPages: completedTotalPages,
  } = getPaginatedPlans(completedPlans);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Training Plans
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create and manage training plans for your athletes
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">{/* Additional filters could go here */}</div>
        <Button
          onClick={handleCreatePlan}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Active Plans ({activePlans.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Completed ({completedPlans.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Tab Overview */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Info className="h-5 w-5 text-indigo-500" />
              <p>
                You have <span className="font-medium">{activeTotalPlans}</span>{" "}
                active {activeTotalPlans === 1 ? "plan" : "plans"}
              </p>
            </div>
          </div>

          {paginatedActivePlans.length > 0 ? (
            <>
              {paginatedActivePlans.map((plan) => (
                <TrainingPlanCard
                  key={plan.id}
                  plan={plan}
                  onViewDetails={handleViewDetails}
                  onEditPlan={handleEditPlan}
                  onDuplicatePlan={handleDuplicatePlan}
                  isActive={true}
                />
              ))}

              {/* Pagination */}
              {activeTotalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {activeTotalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="h-9 px-4 py-2"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, activeTotalPages)
                        )
                      }
                      disabled={currentPage === activeTotalPages}
                      className="h-9 px-4 py-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card className="border-dashed border-2 p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="mb-2">No active plans found.</p>
                <p>Create a new training plan to get started.</p>
                <Button
                  onClick={handleCreatePlan}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Plan
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {/* Tab Overview */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Info className="h-5 w-5 text-green-500" />
              <p>
                You have{" "}
                <span className="font-medium">{completedTotalPlans}</span>{" "}
                completed {completedTotalPlans === 1 ? "plan" : "plans"}
              </p>
            </div>
          </div>

          {paginatedCompletedPlans.length > 0 ? (
            <>
              {paginatedCompletedPlans.map((plan) => (
                <TrainingPlanCard
                  key={plan.id}
                  plan={plan}
                  onViewDetails={handleViewDetails}
                  onEditPlan={handleEditPlan}
                  onDuplicatePlan={handleDuplicatePlan}
                  isActive={false}
                  isCompleted={true}
                />
              ))}

              {/* Pagination */}
              {completedTotalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {completedTotalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="h-9 px-4 py-2"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, completedTotalPages)
                        )
                      }
                      disabled={currentPage === completedTotalPages}
                      className="h-9 px-4 py-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card className="border-dashed border-2 p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="mb-2">No completed plans found.</p>
                <p>Completed plans will appear here when they're finished.</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  athletes: number;
  startDate: string;
  progress?: number; // Optional progress percentage for active plans
  type?: "endurance" | "speed" | "strength" | "marathon"; // Optional plan type
}

function TrainingPlanCard({
  plan,
  onViewDetails,
  onEditPlan,
  onDuplicatePlan,
  isActive = false,
  isCompleted = false,
}: {
  plan: TrainingPlan;
  onViewDetails: (id: string) => void;
  onEditPlan: (id: string, e: React.MouseEvent) => void;
  onDuplicatePlan: (id: string, e: React.MouseEvent) => void;
  isActive?: boolean;
  isCompleted?: boolean;
}) {
  // Determine plan type icon
  const getPlanTypeIcon = () => {
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

  const handleConfirmAndDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      confirm("Are you sure you want to delete this plan? It can't be undone.")
    ) {
      console.log("Delete plan confirmed:", plan.id);
      // Call actual delete function here
    }
  };

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
              onClick={(e) => onDuplicatePlan(plan.id, e)}
            >
              <Copy className={buttonIconClass} />
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={secondaryButtonClass}
              onClick={(e) => onEditPlan(plan.id, e)}
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
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
              onClick={handleConfirmAndDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
