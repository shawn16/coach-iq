import { PlanFormat } from "@/types/training";

// Default values for new training plans
export const DEFAULT_PLAN_VALUES = {
  name: "Summer Training Plan",
  description: "12-week summer training plan for varsity runners",
  format: "xc" as PlanFormat,
  startDate: new Date("2023-05-24"),
  endDate: new Date("2023-08-15"),
};

// Plan format options for the select dropdown
export const PLAN_FORMAT_OPTIONS = [
  { value: "xc", label: "Cross Country" },
  { value: "track", label: "Track" },
  { value: "road", label: "Road" },
  { value: "trail", label: "Trail" },
  { value: "general", label: "General" },
] as const;

// Card header themes for different sections
export const CARD_THEMES = {
  planInfo: { color: "blue", icon: "Calendar" },
  preview: { color: "purple", icon: "Clock" },
  schedule: { color: "green", icon: "Calendar" },
  workoutLibrary: { color: "blue", icon: "Library" },
} as const;
