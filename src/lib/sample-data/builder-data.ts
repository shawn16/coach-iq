import { parseISO } from "date-fns";

// import type { LucideIcon } from "lucide-react"; // Removed unused import

// --- Type Definitions ---

export interface Workout {
  id: number;
  name: string;
  type: string; // Consider using a specific literal type e.g., 'tempo' | 'interval' | 'long_run'
  category: string;
  duration: string;
  description: string;
  icon: string; // Changed to string to store icon name/identifier
}

export interface ProgressionStep {
  label: string;
  color: string;
}

export interface Progression {
  id: number;
  name: string;
  type: string;
  weeks: number;
  description: string;
  steps: ProgressionStep[];
}

export interface AthleteGroup {
  id: number;
  name: string;
  count: number;
}

export interface Athlete {
  id: number;
  name: string;
  group: string;
}

export interface WeekWorkouts { // Ensure this is exported
  [key: string]: string | undefined;
}

export interface WeekData { // Ensure this is exported
  id: number;
  weekNumber: number;
  dateRange: string;
  seasonPhase: string;
  workouts: WeekWorkouts;
}

export interface WorkoutType { // Ensure this is exported
  id: string;
  name: string;
  color: string;
}

export type PlanType = "xc" | "track" | "road" | "custom"; // Ensure this is exported

// --- Sample Data Arrays ---

export const workoutLibrary: Workout[] = [
  {
    id: 1,
    name: "Tempo Run",
    type: "tempo",
    category: "Endurance",
    duration: "20-40 min",
    description:
      "Sustained effort at 80-85% of max heart rate to improve lactate threshold",
    icon: 'Clock',
  },
  {
    id: 2,
    name: "Interval 400m",
    type: "interval",
    category: "Speed",
    duration: "8-12 reps",
    description: "400m repeats at 5K pace with 1-2 min recovery between reps",
    icon: 'Repeat',
  },
   {
    id: 3,
    name: "Long Run",
    type: "long_run",
    category: "Endurance",
    duration: "60-90 min",
    description:
      "Easy effort run to build aerobic endurance and running economy",
    icon: 'CalendarIcon',
  },
   {
    id: 4,
    name: "Fartlek",
    type: "interval",
    category: "Mixed",
    duration: "30-45 min",
    description: "Speed play with alternating fast and easy segments",
    icon: 'Zap',
  },
   {
    id: 5,
    name: "Hill Repeats",
    type: "interval",
    category: "Strength",
    duration: "6-10 reps",
    description: "Uphill repeats to build strength and power",
    icon: 'Repeat',
  },
  {
    id: 6,
    name: "Recovery Run",
    type: "long_run",
    category: "Recovery",
    duration: "20-30 min",
    description: "Very easy effort to promote recovery between hard workouts",
    icon: 'CalendarIcon',
  },
];

export const progressionLibrary: Progression[] = [
   {
    id: 1,
    name: "Tempo Run Progression",
    type: "Endurance",
    weeks: 8,
    description:
      "Progressive tempo runs that increase in duration and intensity over 8 weeks",
    steps: [
      { label: "20min@75%", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
      { label: "25min@75%", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
      { label: "25min@80%", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
      { label: "30min@80%", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
      { label: "30min@85%", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
      { label: "35min@85%", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
      { label: "35min@90%", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
      { label: "40min@90%", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
    ],
  },
  {
    id: 2,
    name: "Interval 400m Progression",
    type: "Speed",
    weeks: 6,
    description: "Progressive 400m intervals that increase in volume and decrease in recovery time",
    steps: [
        { label: "6x400m/2min", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
        { label: "8x400m/2min", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
        { label: "8x400m/90sec", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
        { label: "10x400m/90sec", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
        { label: "10x400m/60sec", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
        { label: "12x400m/60sec", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
    ]
  },
    {
    id: 3,
    name: "Long Run Progression",
    type: "Endurance",
    weeks: 10,
    description:
      "Progressive long runs that increase in duration over 10 weeks",
    steps: [
        { label: "45min", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
        { label: "50min", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
        { label: "60min", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
        { label: "65min", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
        { label: "70min", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
        { label: "75min", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
        { label: "80min", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
        { label: "85min", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
        { label: "90min", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
        { label: "100min", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
    ]
  },
   {
    id: 4,
    name: "Hill Repeats Progression",
    type: "Strength",
    weeks: 6,
    description: "Progressive hill repeats that increase in volume and grade",
    steps: [
      { label: "4x30sec/3%", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
      { label: "6x30sec/3%", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
      { label: "6x30sec/5%", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
      { label: "8x30sec/5%", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" },
      { label: "8x30sec/7%", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" },
      { label: "10x30sec/7%", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
    ],
  },
];

export const workoutTypes: WorkoutType[] = [
  {
    id: "green_vol",
    name: "Green Vol",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  },
  {
    id: "white_vol",
    name: "White Vol",
    color:
      "bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-300",
  },
  {
    id: "gold_vol",
    name: "Gold Vol",
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  },
  {
    id: "green_lr",
    name: "Green LR",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  },
  {
    id: "white_lr",
    name: "White LR",
    color:
      "bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-300",
  },
  {
    id: "gold_lr",
    name: "Gold LR",
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  },
  {
    id: "acceleration",
    name: "Acceleration Run",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  },
  {
    id: "tempo",
    name: "Tempo",
    color:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
  },
  {
    id: "fartlek_new",
    name: "Fartlek (new runners)",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  },
  {
    id: "fartlek_varsity",
    name: "Fartlek (Varsity)",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  },
  {
    id: "5k_pace",
    name: "5k Pace",
    color: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300",
  },
  {
    id: "3200_pace",
    name: "3200 Pace",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  },
  {
    id: "1600_pace",
    name: "1600 Pace",
    color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  },
];

export const athleteGroups: AthleteGroup[] = [
  { id: 1, name: "Varsity Boys", count: 12 },
  // ... rest of athleteGroups ...
];

export const athletes: Athlete[] = [
  { id: 1, name: "Alex Johnson", group: "Varsity Boys" },
  // ... rest of athletes ...
];

// --- Sample Data Constants ---

// --- Sample Data Generation Functions ---

// Moved from builder page
export const generateInitialPlanData = (startDate?: Date, weeks?: number): WeekData[] => {
  const data: WeekData[] = [];
  const planWeeks = weeks ?? 12; // Use passed weeks or default to 12

  // Sample data to match the screenshot
  // Consider moving this to be exported as well if needed elsewhere
  const seasonPhases = [
    { weeks: 2, name: "Transition Week" },
    { weeks: 7, name: "Summer Week" },
    { weeks: 1, name: "Cypress XC Relays" },
    { weeks: 1, name: "Cy Woods Inv mile" },
    { weeks: 1, name: "Friday Night Lights" },
    { weeks: 1, name: "Seven Lakes" },
    { weeks: 1, name: "Strake" },
    { weeks: 1, name: "SBISD" },
    { weeks: 1, name: "OFF" },
    { weeks: 1, name: "Klein" },
    { weeks: 1, name: "OFF" },
    { weeks: 1, name: "District" },
    { weeks: 1, name: "Regionals" },
    { weeks: 1, name: "OFF" },
    { weeks: 1, name: "State" },
  ];

  // Generate dates for each week
  const startDateObj = startDate || parseISO("2023-05-24"); // Use passed start date or default
  const currentDate = new Date(startDateObj);
  let weekCounter = 1;
  let phaseIndex = 0;
  let phaseWeekCounter = 1;

  for (let i = 0; i < planWeeks; i++) {
    const weekStartDate = new Date(currentDate);
    const weekEndDate = new Date(currentDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    // Format dates as MM/DD
    const formatDate = (date: Date): string =>
      `${date.getMonth() + 1}/${date.getDate()}`;
    const dateRange = `${formatDate(weekStartDate)}-${formatDate(weekEndDate)}`;

    // Determine season phase
    let seasonPhase = "";
    let seasonWeek = "";

    if (phaseIndex < seasonPhases.length) {
      seasonPhase = seasonPhases[phaseIndex].name;
      if (seasonPhase.includes("Week")) {
        seasonWeek = seasonPhase.split(" ")[0] + " Week " + phaseWeekCounter;
      } else {
        seasonWeek = seasonPhase;
      }

      phaseWeekCounter++;
      if (phaseWeekCounter > seasonPhases[phaseIndex].weeks) {
        phaseIndex++;
        phaseWeekCounter = 1;
      }
    }

    // Create week data
    const weekData: WeekData = {
      id: i + 1,
      weekNumber: weekCounter,
      dateRange,
      seasonPhase: seasonWeek,
      workouts: {},
    };

    // Add sample workout data for the first few weeks to match screenshot
    if (i < 15) {
      if (i >= 2 && i <= 8) {
        // Summer weeks
        const intensity = 70 + Math.min(i - 2, 5) * 5; // Increase intensity each week
        weekData.workouts = {
          green_vol: i >= 2 ? `10m@${intensity}%` : "",
          white_vol: i >= 2 ? `5m@${intensity}%` : "",
          gold_vol: i >= 2 ? `7m@${intensity}%` : "",
          acceleration: i >= 2 ? `${3 + Math.min(i - 2, 2)}m AR` : "",
          tempo:
            i >= 2
              ? `${2 + Math.min(i - 2, 2)}m@${81 + Math.min(i - 2, 4)}% w/1'`
              : "",
          fartlek_new:
            i >= 2 ? `1-2-1-2-1 w/1'30 H, last 1' (${7 + i} total)` : "",
          fartlek_varsity:
            i >= 2 ? `1-2-1-2-1-2 w/1'30 H, last 1' (${9 + i} total)` : "",
          "5k_pace": i >= 7 ? "Time Trial" : "",
        };
      }
    }

    data.push(weekData);

    // Move to next week
    currentDate.setDate(currentDate.getDate() + 7);
    weekCounter++;
  }

  return data;
};

// ... getTrainingPlanById function (if it should live here or elsewhere) ...
