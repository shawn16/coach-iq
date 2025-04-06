"use client";

// Core UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Feature Components
import { EnterWorkoutResults } from "./components/EnterWorkoutResults";
import { WorkoutInsights } from "./components/WorkoutInsights";
import { TeamDashboard } from "./components/TeamDashboard";

/**
 * Workout Results Page
 *
 * This page serves as the main hub for managing and analyzing workout data.
 * It's organized into three main sections:
 * 1. Enter Workout Results - For coaches to input and manage workout data
 * 2. Workout Insights - For analyzing performance trends and AI-generated insights
 * 3. Team Dashboard - For viewing team-wide metrics and performance statistics
 */
export default function WorkoutResultsPage() {
  return (
    // Main container with consistent padding and max-width
    <div className="container mx-auto py-6">
      {/* Page header with title and description */}
      <h1 className="text-3xl font-bold mb-2">Workout Results</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select a workout to enter results, analyze team performance, or view
        training trends.
      </p>

      {/* Tabbed interface for switching between different workout management views */}
      <Tabs defaultValue="enter-results" className="w-full">
        {/* Tab navigation */}
        <TabsList className="mb-6">
          <TabsTrigger value="enter-results">Enter Workout Results</TabsTrigger>
          <TabsTrigger value="workout-insights">Workout Insights</TabsTrigger>
          <TabsTrigger value="team-dashboard">Team Dashboard</TabsTrigger>
        </TabsList>

        {/* Tab content sections */}

        {/* Enter Workout Results Tab
            - Allows coaches to input workout data
            - Includes workout type selection, date picker, and athlete results entry
            - Features group filtering and search functionality */}
        <TabsContent value="enter-results">
          <EnterWorkoutResults />
        </TabsContent>

        {/* Workout Insights Tab
            - Displays AI-generated analysis of workout data
            - Shows performance trends and patterns
            - Includes visualizations and key metrics */}
        <TabsContent value="workout-insights">
          <WorkoutInsights />
        </TabsContent>

        {/* Team Dashboard Tab
            - Overview of team performance metrics
            - Shows top performers and areas needing attention
            - Displays weekly mileage and workout completion rates
            - Includes best efforts and team progress tracking */}
        <TabsContent value="team-dashboard">
          <TeamDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
