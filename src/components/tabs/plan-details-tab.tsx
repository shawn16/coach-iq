import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeaderWithIcon } from "@/components/ui/card-header-with-icon";
import { FormFieldWithTooltip } from "@/components/ui/form-field-with-tooltip";
import { StatsBox } from "@/components/ui/stats-box";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { PlanFormat, WeekData, WorkoutType } from "@/types/training";
import { TrainingPlanTable } from "@/components/training-plan-table";
import type { PhaseData } from "@/components/phase-editor-dialog";

// Props interface for the PlanDetailsTab component
interface PlanDetailsTabProps {
  // Plan details
  planName: string;
  setPlanName: (name: string) => void;
  planFormat: PlanFormat;
  setPlanFormat: (format: PlanFormat) => void;
  description: string;
  setDescription: (desc: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  weeks: number;
  // Plan data and types
  planData: WeekData[];
  workoutTypes: WorkoutType[];
  // Event handlers
  onCellClick: (weekId: number, workoutTypeId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, weekId: number, workoutTypeId: string) => void;
  onPhaseChange: (weekId: number, phaseData: PhaseData) => void;
}

// The Plan Details tab content component
export function PlanDetailsTab({
  planName,
  setPlanName,
  planFormat,
  setPlanFormat,
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  weeks,
  planData,
  workoutTypes,
  onCellClick,
  onKeyDown,
  onPhaseChange,
}: PlanDetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Plan Information Card */}
      <Card>
        <CardHeaderWithIcon
          icon={CalendarIcon}
          title="Plan Information"
          description="Enter the basic details of your training plan"
          colorTheme="blue"
        />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormFieldWithTooltip
                label="Plan Name"
                tooltipText="Give your plan a descriptive name."
                id="plan-name"
                required
              >
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="E.g., XC Summer Base"
                />
              </FormFieldWithTooltip>

              <FormFieldWithTooltip
                label="Start Date"
                tooltipText="The first day of the training plan."
                required
              >
                <DatePicker
                  date={startDate}
                  setDate={(date) => setStartDate(date || startDate)}
                />
              </FormFieldWithTooltip>
            </div>

            <div className="space-y-4">
              <FormFieldWithTooltip
                label="Plan Format"
                tooltipText="Select the primary sport or season format."
                id="plan-format"
              >
                <Select 
                  value={planFormat} 
                  onValueChange={(value) => setPlanFormat(value as PlanFormat)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xc">Cross Country</SelectItem>
                    <SelectItem value="track">Track</SelectItem>
                    <SelectItem value="road">Road</SelectItem>
                    <SelectItem value="trail">Trail</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </FormFieldWithTooltip>

              <FormFieldWithTooltip
                label="End Date"
                tooltipText="The last day of the training plan."
                required
              >
                <DatePicker
                  date={endDate}
                  setDate={(date) => setEndDate(date || endDate)}
                />
              </FormFieldWithTooltip>
            </div>
          </div>

          <FormFieldWithTooltip
            label="Description"
            tooltipText="Optional: Briefly describe the plan."
            id="description"
          >
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description of the plan's goals or focus"
              className="flex-1"
            />
          </FormFieldWithTooltip>
        </CardContent>
      </Card>

      {/* Plan Preview Card */}
      <Card>
        <CardHeaderWithIcon
          icon={Clock}
          title="Plan Preview"
          description="Preview how your plan will look"
          colorTheme="purple"
        />
        <CardContent>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {planName || "Unnamed Plan"}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {planFormat === "xc"
                    ? "Cross Country"
                    : planFormat === "track"
                    ? "Track"
                    : planFormat === "road"
                    ? "Road"
                    : planFormat === "trail"
                    ? "Trail"
                    : "General"}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
              </span>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
              {description || "No description provided."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsBox
                label="Duration"
                value={`${weeks} ${weeks === 1 ? "week" : "weeks"}`}
              />
              <StatsBox
                label="Total Workouts"
                value={`${planData.length * 3} estimated`}
              />
              <StatsBox
                label="Athletes"
                value="Not assigned yet"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Schedule Card */}
      <Card>
        <CardHeaderWithIcon
          icon={CalendarIcon}
          title="Training Schedule"
          description="Manage your training plan schedule"
          colorTheme="green"
          rightContent={
            <Button variant="outline" size="sm" className="gap-2 font-medium">
              <Plus className="h-4 w-4" /> Add Week
            </Button>
          }
        />
        <CardContent>
          <TrainingPlanTable
            planData={planData}
            workoutTypes={workoutTypes}
            onCellClick={onCellClick}
            onKeyDown={onKeyDown}
            onPhaseChange={onPhaseChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
