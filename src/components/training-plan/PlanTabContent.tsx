import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { TrainingPlanCard } from "./TrainingPlanCard";
import { PlanPagination } from "./PlanPagination";
import { TrainingPlan } from "./TrainingPlanCard";

// Define the props interface for the PlanTabContent component
interface PlanTabContentProps {
  plans: TrainingPlan[];
  totalPlans: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewDetails: (id: string) => void;
  isActive?: boolean;
  searchQuery: string;
  durationFilter: string;
  dateFilter: string;
}

// PlanTabContent component - A reusable component for displaying plans in a tab
export function PlanTabContent({
  plans,
  totalPlans,
  totalPages,
  currentPage,
  onPageChange,
  onViewDetails,
  isActive = false,
  searchQuery,
  durationFilter,
  dateFilter,
}: PlanTabContentProps) {
  // Render the component
  return (
    <div className="space-y-4">
      {/* Tab overview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Info className="h-5 w-5 text-indigo-500" />
          <p>
            You have <span className="font-medium">{totalPlans}</span>{" "}
            {isActive ? "active" : "upcoming"}{" "}
            {totalPlans === 1 ? "plan" : "plans"}
            {searchQuery || durationFilter !== "all" || dateFilter !== "all"
              ? ` matching your search criteria (showing ${Math.min(
                  totalPlans,
                  plans.length
                )} of ${totalPlans} total)`
              : ""}
          </p>
        </div>
      </div>

      {/* Plan cards */}
      {plans.length > 0 ? (
        <>
          {plans.map((plan) => (
            <TrainingPlanCard
              key={plan.id}
              plan={plan}
              onViewDetails={onViewDetails}
              isActive={isActive}
            />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <PlanPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <Card className="border-dashed border-2 p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="mb-2">No plans found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
