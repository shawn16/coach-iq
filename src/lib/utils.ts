import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToMMDDYYYY(date: Date): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "-";
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function calculateAge(birthDate: Date): number {
  console.log("calculateAge input:", birthDate); // Debug log to verify input
  if (
    !birthDate ||
    !(birthDate instanceof Date) ||
    isNaN(birthDate.getTime())
  ) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Parses a time string in MM:SS.ms format into milliseconds.
 * Returns null if the format is invalid.
 */
export const parseTimeToMilliseconds = (timeString: string): number | null => {
  if (!timeString?.trim()) return null;
  // Regex allows optional minutes (M:SS.ss) or just seconds (SS.ss)
  const match = timeString
    .trim()
    .match(/^(?:(\d{1,2}):)?(\d{1,2})(?:[.,](\d{1,2}))?$/);
  if (!match) return null; // Invalid format

  const minutes = parseInt(match[1] || "0", 10);
  const seconds = parseInt(match[2] || "0", 10);
  // Ensure milliseconds are treated correctly (e.g., .3 -> 300ms, .30 -> 300ms)
  const millisecondsPart = parseInt((match[3] || "0").padEnd(2, "0"), 10);

  if (isNaN(minutes) || isNaN(seconds) || isNaN(millisecondsPart)) {
    return null; // Handle NaN parsing results
  }

  // Convert to milliseconds (handling the fractional seconds)
  return (minutes * 60 + seconds) * 1000 + millisecondsPart * 10;
};

/**
 * Formats milliseconds into MM:SS.ss format for display.
 */
export const formatMillisecondsToTime = (
  milliseconds: number | null | undefined
): string => {
  if (
    milliseconds === null ||
    milliseconds === undefined ||
    isNaN(milliseconds) ||
    milliseconds < 0
  )
    return "-";
  if (milliseconds === 0) return "0:00.00"; // Explicitly handle 0 case if needed

  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  // Calculate hundredths of a second
  const hundredths = Math.floor((milliseconds % 1000) / 10);

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${hundredths
    .toString()
    .padStart(2, "0")}`;
};
