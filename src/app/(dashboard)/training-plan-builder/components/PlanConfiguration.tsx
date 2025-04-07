/**
 * Plan Configuration Component
 *
 * Handles the basic configuration of a training plan including:
 * - Plan name and description
 * - Start and end dates
 * - Plan type selection
 * - Automatic week calculation
 * - Workout schedule preview
 *
 * Features:
 * - Real-time week calculation based on date range
 * - Visual workout schedule preview
 * - Phase-based color coding
 * - Responsive layout
 */

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { differenceInWeeks } from "date-fns";
import { Eye, Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useEffect, useCallback, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";

/**
 * Plan Type Definition
 *
 * Represents the different types of training plans available:
 * - xc: Cross Country
 * - track: Track and Field
 * - road: Road Racing
 * - custom: Custom Plan
 */
type PlanType = "xc" | "track" | "road" | "custom";

/**
 * Plan Configuration Props
 *
 * Interface defining the props required by the PlanConfiguration component
 * @property planName - Current plan name
 * @property setPlanName - Function to update plan name
 * @property planDescription - Current plan description
 * @property setPlanDescription - Function to update plan description
 * @property startDate - Plan start date
 * @property setStartDate - Function to update start date
 * @property endDate - Plan end date
 * @property setEndDate - Function to update end date
 * @property planType - Current plan type
 * @property setPlanType - Function to update plan type
 * @property setWeeks - Function to update number of weeks
 */
interface PlanConfigurationProps {
  planName: string;
  setPlanName: (name: string) => void;
  planDescription: string;
  setPlanDescription: (description: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  planType: PlanType;
  setPlanType: (type: PlanType) => void;
  setWeeks: (weeks: number) => void;
}

/**
 * Workout Cell Component
 *
 * Displays a single workout cell in the schedule preview
 * Shows either a placeholder or the workout value with appropriate styling
 *
 * @property value - Workout value to display
 * @property bgColor - Background color class
 * @property textColor - Text color class
 */
const WorkoutCell = memo(
  ({
    value,
    bgColor,
    textColor,
  }: {
    value: string;
    bgColor: string;
    textColor: string;
  }) => {
    if (!value) {
      return (
        <div className="text-muted-foreground text-xs cursor-pointer hover:text-foreground">
          Click to add workout
        </div>
      );
    }

    return (
      <div
        className={`bg-${bgColor}-100 dark:bg-${bgColor}-900/30 text-${textColor}-800 dark:text-${textColor}-300 text-xs font-medium px-3 py-1 rounded-full w-fit border border-${bgColor}-200 dark:border-${bgColor}-800`}
      >
        {value}
      </div>
    );
  }
);
WorkoutCell.displayName = "WorkoutCell";

/**
 * Week Row Component
 *
 * Displays a single week row in the schedule preview
 * Includes week number, dates, phase, and workout cells
 *
 * @property index - Week index (0-based)
 * @property weekDates - Formatted date range for the week
 * @property phase - Current training phase
 * @property workoutValues - Map of workout types to their values
 */
const WeekRow = memo(
  ({
    index,
    weekDates,
    phase,
    workoutValues,
  }: {
    index: number;
    weekDates: string;
    phase: string;
    workoutValues: Record<string, string> | null;
  }) => {
    // Determine phase color based on week index
    const phaseColor = index < 2 ? "indigo" : index < 9 ? "green" : "amber";

    return (
      <tr className="border-b hover:bg-muted/50 transition-colors">
        <td className="p-4 align-middle font-medium">{index + 1}</td>
        <td className="p-4 align-middle text-muted-foreground">{weekDates}</td>
        <td className="p-4 align-middle border-r">
          <div
            className={`text-${phaseColor}-600 dark:text-${phaseColor}-400 font-medium`}
          >
            {phase}
          </div>
        </td>
        {workoutValues ? (
          <>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.green}
                bgColor="green"
                textColor="green"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.white}
                bgColor="slate"
                textColor="slate"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.gold}
                bgColor="amber"
                textColor="amber"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.green_lr}
                bgColor="green"
                textColor="green"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.white_lr}
                bgColor="slate"
                textColor="slate"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.gold_lr}
                bgColor="amber"
                textColor="amber"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.acceleration}
                bgColor="blue"
                textColor="blue"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.tempo}
                bgColor="indigo"
                textColor="indigo"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.fartlek_new}
                bgColor="purple"
                textColor="purple"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.fartlek_varsity}
                bgColor="violet"
                textColor="violet"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.pace_5k}
                bgColor="rose"
                textColor="rose"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.pace_3200}
                bgColor="pink"
                textColor="pink"
              />
            </td>
            <td className="p-4 align-middle">
              <WorkoutCell
                value={workoutValues.pace_1600}
                bgColor="fuchsia"
                textColor="fuchsia"
              />
            </td>
          </>
        ) : (
          Array(13)
            .fill(null)
            .map((_, i) => (
              <td key={i} className="p-4 align-middle">
                <div className="text-muted-foreground text-xs cursor-pointer hover:text-foreground">
                  Click to add workout
                </div>
              </td>
            ))
        )}
        <td className="p-4 align-middle">
          <div className="flex items-center justify-center gap-2">
            <button className="text-muted-foreground hover:text-foreground">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="text-destructive hover:text-destructive/80">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }
);
WeekRow.displayName = "WeekRow";

/**
 * Week Dates Type
 *
 * Maps week numbers to their formatted date ranges
 */
type WeekDates = {
  [key: number]: string;
};

/**
 * Plan Configuration Component
 *
 * Main component for configuring training plan settings
 *
 * @param props - PlanConfigurationProps containing all necessary state and handlers
 */
export function PlanConfiguration({
  planName,
  setPlanName,
  planDescription,
  setPlanDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  planType,
  setPlanType,
  setWeeks,
}: PlanConfigurationProps) {
  /**
   * Calculate Number of Weeks
   *
   * Computes the number of weeks between start and end dates
   * Returns 12 as default if dates are not set
   */
  const calculateWeeks = useCallback(() => {
    if (!startDate || !endDate) return 12;
    return Math.max(1, Math.ceil(differenceInWeeks(endDate, startDate)));
  }, [startDate, endDate]);

  // Memoize the number of weeks to prevent unnecessary recalculations
  const numberOfWeeks = useMemo(() => calculateWeeks(), [calculateWeeks]);

  // Update weeks when dates change
  useEffect(() => {
    setWeeks(numberOfWeeks);
  }, [numberOfWeeks, setWeeks]);

  /**
   * Get Workout Value
   *
   * Retrieves the workout value for a specific week
   * Currently returns null as a placeholder
   *
   * @param weekIndex - Index of the week to get workout for
   * @returns Workout value or null
   */
  const getWorkoutValue = (weekIndex: number) => {
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Plan Basic Info Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Enter plan name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan-description">Description</Label>
              <Input
                id="plan-description"
                value={planDescription}
                onChange={(e) => setPlanDescription(e.target.value)}
                placeholder="Enter plan description"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Dates Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                placeholder="Select start date"
              />
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                placeholder="Select end date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Type Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Plan Type</Label>
              <Select value={planType} onValueChange={setPlanType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xc">Cross Country</SelectItem>
                  <SelectItem value="track">Track and Field</SelectItem>
                  <SelectItem value="road">Road Racing</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workout Schedule Preview Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Workout Schedule</h3>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Workout
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium">Week</th>
                    <th className="p-4 text-left font-medium">Dates</th>
                    <th className="p-4 text-left font-medium border-r">
                      Phase
                    </th>
                    <th className="p-4 text-left font-medium">Green</th>
                    <th className="p-4 text-left font-medium">White</th>
                    <th className="p-4 text-left font-medium">Gold</th>
                    <th className="p-4 text-left font-medium">Green LR</th>
                    <th className="p-4 text-left font-medium">White LR</th>
                    <th className="p-4 text-left font-medium">Gold LR</th>
                    <th className="p-4 text-left font-medium">Acceleration</th>
                    <th className="p-4 text-left font-medium">Tempo</th>
                    <th className="p-4 text-left font-medium">Fartlek New</th>
                    <th className="p-4 text-left font-medium">
                      Fartlek Varsity
                    </th>
                    <th className="p-4 text-left font-medium">Pace 5K</th>
                    <th className="p-4 text-left font-medium">Pace 3200</th>
                    <th className="p-4 text-left font-medium">Pace 1600</th>
                    <th className="p-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: numberOfWeeks }, (_, i) => (
                    <WeekRow
                      key={i}
                      index={i}
                      weekDates=""
                      phase={i < 2 ? "Base" : i < 9 ? "Build" : "Peak"}
                      workoutValues={getWorkoutValue(i)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
