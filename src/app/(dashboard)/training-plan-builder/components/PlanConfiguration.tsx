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

type PlanType = "xc" | "track" | "road" | "custom";

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

// Memoized workout cell component
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

// Memoized table row component
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

// Add type for week dates
type WeekDates = {
  [key: number]: string;
};

/**
 * Plan Configuration Component
 *
 * This component handles the basic configuration of a training plan:
 * 1. Plan name and description
 * 2. Start and end dates
 * 3. Plan type selection
 * 4. Automatic week calculation based on dates
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
  // Calculate number of weeks based on start and end date
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

  // Update weekDates definition
  const weekDates: WeekDates = useMemo(
    () => ({
      0: "5/24-5/30",
      1: "5/31-6/6",
      2: "6/7-6/13",
      3: "6/14-6/20",
      4: "6/21-6/27",
      5: "6/28-7/4",
      6: "7/5-7/11",
      7: "7/12-7/18",
      8: "7/19-7/25",
      9: "7/26-8/1",
      10: "8/2-8/8",
      11: "8/9-8/15",
    }),
    []
  );

  // Memoize the getPhase function
  const getPhase = useCallback((weekIndex: number) => {
    if (weekIndex < 2) return `Transition Week ${weekIndex + 1}`;
    if (weekIndex >= 2 && weekIndex <= 8) return `Summer Week ${weekIndex - 1}`;
    return "Cypress XC";
  }, []);

  // Map plan type values to display names
  const planTypeNames: Record<PlanType, string> = {
    xc: "Cross Country",
    track: "Track",
    road: "Road Racing",
    custom: "Custom",
  };

  const getWorkoutValue = (weekIndex: number) => {
    if (weekIndex < 2) return null;
    if (weekIndex === 2)
      return {
        green: "10m@70%",
        white: "5m@70%",
        gold: "7m@70%",
        green_lr: "30min",
        white_lr: "25min",
        gold_lr: "20min",
        acceleration: "8x100m",
        tempo: "20min@HMP",
        fartlek_new: "2min/1min x 6",
        fartlek_varsity: "3min/1min x 8",
        pace_5k: "6-8x400m",
        pace_3200: "4-6x800m",
        pace_1600: "6-8x200m",
      };
    if (weekIndex === 3)
      return {
        green: "10m@75%",
        white: "5m@75%",
        gold: "7m@75%",
        green_lr: "35min",
        white_lr: "30min",
        gold_lr: "25min",
        acceleration: "10x100m",
        tempo: "25min@HMP",
        fartlek_new: "2min/1min x 8",
        fartlek_varsity: "3min/1min x 10",
        pace_5k: "8-10x400m",
        pace_3200: "5-7x800m",
        pace_1600: "8-10x200m",
      };
    if (weekIndex === 4)
      return {
        green: "10m@80%",
        white: "5m@80%",
        gold: "7m@80%",
        green_lr: "40min",
        white_lr: "35min",
        gold_lr: "30min",
        acceleration: "12x100m",
        tempo: "30min@HMP",
        fartlek_new: "2min/1min x 10",
        fartlek_varsity: "3min/1min x 12",
        pace_5k: "10-12x400m",
        pace_3200: "6-8x800m",
        pace_1600: "10-12x200m",
      };
    if (weekIndex === 5)
      return {
        green: "10m@85%",
        white: "5m@85%",
        gold: "7m@85%",
        green_lr: "45min",
        white_lr: "40min",
        gold_lr: "35min",
        acceleration: "14x100m",
        tempo: "35min@HMP",
        fartlek_new: "2min/1min x 12",
        fartlek_varsity: "3min/1min x 14",
        pace_5k: "12-14x400m",
        pace_3200: "7-9x800m",
        pace_1600: "12-14x200m",
      };
    if (weekIndex === 6)
      return {
        green: "10m@90%",
        white: "5m@90%",
        gold: "7m@90%",
        green_lr: "50min",
        white_lr: "45min",
        gold_lr: "40min",
        acceleration: "16x100m",
        tempo: "40min@HMP",
        fartlek_new: "2min/1min x 14",
        fartlek_varsity: "3min/1min x 16",
        pace_5k: "14-16x400m",
        pace_3200: "8-10x800m",
        pace_1600: "14-16x200m",
      };
    if (weekIndex === 7)
      return {
        green: "10m@95%",
        white: "5m@95%",
        gold: "7m@95%",
        green_lr: "55min",
        white_lr: "50min",
        gold_lr: "45min",
        acceleration: "18x100m",
        tempo: "45min@HMP",
        fartlek_new: "2min/1min x 16",
        fartlek_varsity: "3min/1min x 18",
        pace_5k: "16-18x400m",
        pace_3200: "9-11x800m",
        pace_1600: "16-18x200m",
      };
    if (weekIndex === 8)
      return {
        green: "10m@95%",
        white: "5m@95%",
        gold: "7m@95%",
        green_lr: "60min",
        white_lr: "55min",
        gold_lr: "50min",
        acceleration: "20x100m",
        tempo: "50min@HMP",
        fartlek_new: "2min/1min x 18",
        fartlek_varsity: "3min/1min x 20",
        pace_5k: "18-20x400m",
        pace_3200: "10-12x800m",
        pace_1600: "18-20x200m",
      };
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Plan Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="planName">Plan Name *</Label>
            <Input
              id="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter plan name"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Plan Type</Label>
            <Select value={planType} onValueChange={setPlanType}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(planTypeNames).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date *</Label>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              placeholder="Select start date"
            />
          </div>

          <div className="space-y-2">
            <Label>End Date *</Label>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              placeholder="Select end date"
            />
            <p className="text-sm text-muted-foreground">
              Plan Duration: {numberOfWeeks} weeks
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Description</Label>
            <Input
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              placeholder="Enter plan description"
              className="bg-background"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Plan Preview
          </h2>
        </div>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-wrap">
              <h4 className="text-lg font-semibold text-foreground">
                {planName || "Untitled Plan"}
              </h4>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {planTypeNames[planType]}
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-sm text-muted-foreground">
                  {startDate?.toLocaleDateString()} -{" "}
                  {endDate?.toLocaleDateString()}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {planDescription || "No description provided"}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-muted/50 p-3 rounded-md border border-border">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">
                  {numberOfWeeks} weeks
                </p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md border border-border">
                <p className="text-xs text-muted-foreground">Total Workouts</p>
                <p className="font-medium text-foreground">
                  {numberOfWeeks * 3} estimated
                </p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md border border-border">
                <p className="text-xs text-muted-foreground">Athletes</p>
                <p className="font-medium text-foreground">Not assigned yet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Training Schedule
          </h2>
          <Button variant="outline" size="sm" className="bg-background">
            <Plus className="h-4 w-4 mr-2" />
            Add Week
          </Button>
        </div>
        <div className="overflow-auto max-h-[600px] min-w-[1200px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50 sticky top-0">
                <th className="text-left p-3 font-medium text-muted-foreground border-r border-border">
                  Phase
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Week
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Dates
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Green Vol
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  White Vol
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Gold Vol
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Green LR
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  White LR
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Gold LR
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Acceleration
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Tempo
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Fartlek
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background">
              {Array.from({ length: numberOfWeeks }).map((_, index) => (
                <WeekRow
                  key={index}
                  index={index}
                  weekDates={weekDates[index] || ""}
                  phase={getPhase(index)}
                  workoutValues={getWorkoutValue(index)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
