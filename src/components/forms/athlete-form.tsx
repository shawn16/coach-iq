"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { formatMillisecondsToTime, parseTimeToMilliseconds, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interface for the data this form manages
export interface AthleteFormData {
  first_name: string;
  last_name: string;
  birthday: Date | null;
  grade: string;
  time_1600m_str: string; // Keep time as string for input field
}

// Interface for initial data (used for editing)
interface InitialData {
  first_name: string;
  last_name: string;
  birthday: string | Date; // Can be string or Date initially
  grade: number | string;
  time_1600m?: number | null; // Milliseconds
}

interface AthleteFormProps {
  initialData?: InitialData | null;
  onSubmit: (data: AthleteFormData) => void; // Parent handles API call
  isSubmitting?: boolean; // Optional: for disabling button during submission
  apiError?: string | null; // Optional: display error from parent
  formId?: string; // Optional ID for linking external submit button
  className?: string; // Optional className for styling
}

// Helper function to safely get initial string value
function getInitialString(value: unknown): string {
  // Handle null/undefined explicitly, then convert
  if (value === null || value === undefined) return "";
  return value.toString();
}

// Helper function to safely get initial birthday string
function getInitialBirthdayStr(
  value: string | Date | undefined | null
): string {
  if (!value) return "";
  try {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  } catch (error) {
    console.error("Error parsing initial birthday value:", value, error);
  }
  return ""; // Return empty string if parsing fails
}

// Helper function to safely get initial time string
function getInitialTimeStr(value: number | undefined | null): string {
  return formatMillisecondsToTime(value) || "";
}

export function AthleteForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  apiError,
  formId,
  className,
}: AthleteFormProps) {
  // --- LOGGING START ---
  console.log("AthleteForm received initialData:", initialData);
  // --- LOGGING END ---

  // Initialize state directly from props
  const [firstName, setFirstName] = React.useState(() =>
    getInitialString(initialData?.first_name)
  );
  const [lastName, setLastName] = React.useState(() =>
    getInitialString(initialData?.last_name)
  );
  const [birthdayStr, setBirthdayStr] = React.useState(() =>
    getInitialBirthdayStr(initialData?.birthday)
  );
  const [grade, setGrade] = React.useState(() =>
    getInitialString(initialData?.grade)
  );
  const [time1600mStr, setTime1600mStr] = React.useState(() =>
    getInitialTimeStr(initialData?.time_1600m)
  );
  const [internalError, setInternalError] = React.useState<string | null>(null);

  // Populate form when initialData PROP REFERENCE changes (for edit)
  // This should now mainly handle resetting if initialData goes from value -> null/undefined
  // or if the actual athlete being edited changes (less likely)
  React.useEffect(() => {
    console.log(
      "AthleteForm useEffect triggered with initialData:",
      initialData
    );
    if (initialData) {
      // Re-sync state if initialData prop reference changes
      // This might be redundant now with useState initializer, but safe
      setFirstName(getInitialString(initialData.first_name));
      setLastName(getInitialString(initialData.last_name));
      setBirthdayStr(getInitialBirthdayStr(initialData.birthday));
      const gradeStr = getInitialString(initialData.grade);
      console.log(
        `AthleteForm useEffect setting grade state to: '${gradeStr}'`
      );
      setGrade(gradeStr);
      setTime1600mStr(getInitialTimeStr(initialData.time_1600m));
      setInternalError(null); // Also reset internal error on data change
    } else {
      // Reset form if initialData prop becomes null/undefined
      console.log(
        "AthleteForm useEffect resetting form due to falsy initialData"
      );
      setFirstName("");
      setLastName("");
      setBirthdayStr("");
      setGrade("");
      setTime1600mStr("");
      setInternalError(null);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError(null);

    // Try parsing the birthday string (YYYY-MM-DD from input type="date")
    let parsedBirthday: Date | undefined = undefined;
    if (birthdayStr) {
      // Use date-fns parse for YYYY-MM-DD format
      const parsed = parse(birthdayStr, "yyyy-MM-dd", new Date());
      if (isValid(parsed)) {
        parsedBirthday = parsed;
      } else {
        // This validation might be less necessary as type="date" enforces format
        setInternalError("Invalid Birthday date.");
        return;
      }
    } else {
      // Added check for empty string, as type="date" can be cleared
      setInternalError("Birthday is required.");
      return;
    }

    // Now done inside this handler:
    if (!parsedBirthday) {
      setInternalError("Birthday is required and must be valid (YYYY-MM-DD).");
      return;
    }

    // Add validation for Grade
    if (!grade) {
      setInternalError("Grade is required");
      return;
    }

    // Add validation for time1600mStr
    if (!time1600mStr) {
      setInternalError("1600m PR is required.");
      return;
    }
    const time1600mMs = parseTimeToMilliseconds(time1600mStr);
    if (time1600mMs === null) {
      setInternalError("Invalid 1600m time format. Use MM:SS.ms");
      return;
    }

    onSubmit({
      first_name: firstName,
      last_name: lastName,
      birthday: parsedBirthday,
      grade: grade,
      time_1600m_str: time1600mStr, // Pass the validated string
    });
  };

  // --- LOGGING START ---
  console.log(`AthleteForm rendering with grade state: '${grade}'`);
  // --- LOGGING END ---

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
    >
      {/* First Name / Last Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name" className="text-gray-900 dark:text-gray-100">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter first name"
            disabled={isSubmitting}
            className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name" className="text-gray-900 dark:text-gray-100">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter last name"
            disabled={isSubmitting}
            className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Birthday / Grade Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthday" className="text-gray-900 dark:text-gray-100">
            Birthday <span className="text-red-500">*</span>
          </Label>
          {/* Use standard Input with type="date" */}
          <Input
            id="birthday"
            type="date"
            value={birthdayStr}
            onChange={(e) => setBirthdayStr(e.target.value)}
            required
            disabled={isSubmitting}
            className="block w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade" className="text-gray-900 dark:text-gray-100">
            Grade <span className="text-red-500">*</span>
          </Label>
          <Select
            value={grade}
            onValueChange={setGrade}
            required
            disabled={isSubmitting}
          >
            <SelectTrigger 
              id="grade" 
              className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <SelectValue placeholder="Select grade" className="text-gray-900 dark:text-gray-100" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
              <SelectItem value="9" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">9th</SelectItem>
              <SelectItem value="10" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">10th</SelectItem>
              <SelectItem value="11" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">11th</SelectItem>
              <SelectItem value="12" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">12th</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 1600m PR Field */}
      <div className="space-y-2">
        <Label htmlFor="1600m-pr" className="text-gray-900 dark:text-gray-100">1600m PR (Optional)</Label>
        <Input
          id="1600m-pr"
          value={time1600mStr}
          onChange={(e) => setTime1600mStr(e.target.value)}
          placeholder="e.g., 5:45.30"
          disabled={isSubmitting}
          className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Format: MM:SS.ms (e.g., 5:45.30)
        </p>
      </div>

      {/* Display Errors */}
      {(apiError || internalError) && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center">
          Error: {apiError || internalError}
        </p>
      )}

      {/* Footer Buttons (passed via props or handled by parent dialog) */}
      {/* The parent dialog will render its own footer usually */}
    </form>
  );
}
