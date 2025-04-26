"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { CreatePlanDialog } from "@/components/create-plan-dialog";
import { useRouter } from "next/navigation";
import {
  TrainingPlanCard,
  TrainingPlan,
} from "@/components/training-plan-card";
import { activePlans, completedPlans } from "@/lib/sample-data/training-plans"; // Import sample data

export default function TrainingPlanPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const plansPerPage = 5;

  // Handle navigation programmatically
  const handleViewDetails = (id: string) => {
    router.push(`/training-plan/${id}`);
  };

  // Get plans without filtering
  const filterPlans = (plans: TrainingPlan[]) => {
    return plans;
  };

  // Get paginated plans
  const getPaginatedPlans = (plans: TrainingPlan[]) => {
    const filteredPlans = filterPlans(plans);
    const startIndex = (currentPage - 1) * plansPerPage;
    const endIndex = startIndex + plansPerPage;
    return {
      plans: filteredPlans.slice(startIndex, endIndex),
      totalPlans: filteredPlans.length,
      totalPages: Math.ceil(filteredPlans.length / plansPerPage),
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
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Training Plans
        </h1>
        <CreatePlanDialog />
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
              {paginatedActivePlans.map((plan: TrainingPlan) => (
                <TrainingPlanCard
                  key={plan.id}
                  plan={plan}
                  onViewDetails={handleViewDetails}
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
                <p className="mb-2">
                  No active plans found matching your criteria.
                </p>
                <p>Try adjusting your search or filters.</p>
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
              {paginatedCompletedPlans.map((plan: TrainingPlan) => (
                <TrainingPlanCard
                  key={plan.id}
                  plan={plan}
                  onViewDetails={handleViewDetails}
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
                <p className="mb-2">
                  No completed plans found matching your criteria.
                </p>
                <p>Try adjusting your search or filters.</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
