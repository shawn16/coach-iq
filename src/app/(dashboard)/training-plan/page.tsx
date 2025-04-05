"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePlanDialog } from "@/components/create-plan-dialog";
import { useRouter } from "next/navigation";
import { PlanFilters } from "@/components/training-plan/PlanFilters";
import { PlanTabContent } from "@/components/training-plan/PlanTabContent";
import { TrainingPlan } from "@/components/training-plan/TrainingPlanCard";

// Mock data for training plans
const activePlans: TrainingPlan[] = [
  {
    id: "1",
    title: "Spring Marathon Training",
    description: "12-week program for marathon preparation",
    duration: "12",
    athletes: 8,
    startDate: "Jan 15, 2024",
    progress: 45,
    type: "marathon",
  },
  // Add more mock plans as needed
];

const upcomingPlans: TrainingPlan[] = [
  {
    id: "2",
    title: "Summer Speed Program",
    description: "8-week speed development program",
    duration: "8",
    athletes: 12,
    startDate: "Jun 1, 2024",
    type: "speed",
  },
  // Add more mock plans as needed
];

const completedPlans: TrainingPlan[] = [
  {
    id: "3",
    title: "Winter Endurance Block",
    description: "10-week endurance building program",
    duration: "10",
    athletes: 15,
    startDate: "Oct 1, 2023",
    type: "endurance",
  },
  // Add more mock plans as needed
];

// Main component for the training plan page
export default function TrainingPlanPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [durationFilter, setDurationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const plansPerPage = 5;

  // Handle navigation programmatically
  const handleViewDetails = (id: string) => {
    router.push(`/training-plan-builder/${id}`);
  };

  // Handle plan creation
  const handlePlanCreated = () => {
    // Refresh the page to show the new plan
    router.refresh();
  };

  // Filter plans based on search query and filters
  const filterPlans = (plans: TrainingPlan[]) => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter plans based on duration filter
      const matchesDuration =
        durationFilter === "all" ||
        (durationFilter === "short" && Number.parseInt(plan.duration) <= 8) ||
        (durationFilter === "medium" &&
          Number.parseInt(plan.duration) > 8 &&
          Number.parseInt(plan.duration) <= 12) ||
        (durationFilter === "long" && Number.parseInt(plan.duration) > 12);

      // Filter plans based on date filter
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "recent" && plan.startDate.includes("Jan")) ||
        plan.startDate.includes("Feb") ||
        (dateFilter === "upcoming" && plan.startDate.includes("Jun"));

      return matchesSearch && matchesDuration && matchesDate;
    });
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

  // Get paginated plans for each tab
  const {
    plans: paginatedActivePlans,
    totalPlans: activeTotalPlans,
    totalPages: activeTotalPages,
  } = getPaginatedPlans(activePlans);
  const {
    plans: paginatedUpcomingPlans,
    totalPlans: upcomingTotalPlans,
    totalPages: upcomingTotalPages,
  } = getPaginatedPlans(upcomingPlans);
  const {
    plans: paginatedCompletedPlans,
    totalPlans: completedTotalPlans,
    totalPages: completedTotalPages,
  } = getPaginatedPlans(completedPlans);

  // Main render function
  return (
    <div className="container mx-auto p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Training Plans
        </h1>
        <CreatePlanDialog onPlanCreated={handlePlanCreated} />
      </div>

      {/* Search and filters */}
      <PlanFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        durationFilter={durationFilter}
        onDurationChange={setDurationFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
      />

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Active Plans ({activePlans.length})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Upcoming ({upcomingPlans.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Completed ({completedPlans.length})
          </TabsTrigger>
        </TabsList>

        {/* Active plans tab */}
        <TabsContent value="active">
          <PlanTabContent
            plans={paginatedActivePlans}
            totalPlans={activeTotalPlans}
            totalPages={activeTotalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            isActive={true}
            searchQuery={searchQuery}
            durationFilter={durationFilter}
            dateFilter={dateFilter}
          />
        </TabsContent>

        {/* Upcoming plans tab */}
        <TabsContent value="upcoming">
          <PlanTabContent
            plans={paginatedUpcomingPlans}
            totalPlans={upcomingTotalPlans}
            totalPages={upcomingTotalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            searchQuery={searchQuery}
            durationFilter={durationFilter}
            dateFilter={dateFilter}
          />
        </TabsContent>

        {/* Completed plans tab */}
        <TabsContent value="completed">
          <PlanTabContent
            plans={paginatedCompletedPlans}
            totalPlans={completedTotalPlans}
            totalPages={completedTotalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            searchQuery={searchQuery}
            durationFilter={durationFilter}
            dateFilter={dateFilter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
