"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, formatMillisecondsToTime } from "@/lib/utils"; // Import format util
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  submitButtonText: string;
  isSubmitting?: boolean; // Optional: for disabling button during submission
  apiError?: string | null; // Optional: display error from parent
  onCancel?: () => void; // Optional: hook for cancel action
  formId?: string; // Optional ID for linking external submit button
}

export function AthleteForm({
  initialData,
  onSubmit,
  submitButtonText,
  isSubmitting = false,
  apiError,
  onCancel,
  formId,
}: AthleteFormProps) {
  // State for form fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [birthday, setBirthday] = React.useState<Date | undefined>(undefined);
  const [grade, setGrade] = React.useState<string>("");
  const [time1600mStr, setTime1600mStr] = React.useState("");
  const [internalError, setInternalError] = React.useState<string | null>(null);

  // Populate form when initialData changes (for edit)
  React.useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name || "");
      setLastName(initialData.last_name || "");

      let initialBday: Date | undefined = undefined;
      if (initialData.birthday) {
        try {
          const parsedDate = new Date(initialData.birthday);
          if (!isNaN(parsedDate.getTime())) {
            initialBday = parsedDate;
          }
        } catch (e) {
          console.error("Error parsing initial birthday:", e);
        }
      }
      setBirthday(initialBday);

      setGrade(initialData.grade?.toString() || "");
      setTime1600mStr(formatMillisecondsToTime(initialData.time_1600m) || "");
      setInternalError(null);
    } else {
      // Reset form if initialData is removed (e.g., switching modes)
      setFirstName("");
      setLastName("");
      setBirthday(undefined);
      setGrade("");
      setTime1600mStr("");
      setInternalError(null);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError(null);

    // Basic client-side validation
    if (!birthday) {
      setInternalError("Birthday is required");
      return;
    }
    if (!grade) {
      setInternalError("Grade is required");
      return;
    }

    // Note: Time parsing validation is handled in the parent dialog
    // before calling the API, as it involves the parse util.
    // Alternatively, could pass the parse util here or do basic regex check.

    onSubmit({
      first_name: firstName,
      last_name: lastName,
      birthday: birthday, // Pass Date object
      grade: grade,
      time_1600m_str: time1600mStr,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6 pt-4">
      {/* First Name / Last Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter first name"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter last name"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Birthday / Grade Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthday">
            Birthday <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !birthday && "text-muted-foreground"
                )}
                disabled={isSubmitting}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthday ? (
                  format(birthday, "MM/dd/yyyy")
                ) : (
                  <span>mm/dd/yyyy</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={birthday}
                onSelect={setBirthday}
                initialFocus
                captionLayout="dropdown"
                fromYear={1990}
                toYear={new Date().getFullYear()}
                required // Note: HTML required doesn't work directly on Calendar, validation done in handleSubmit
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">
            Grade <span className="text-red-500">*</span>
          </Label>
          <Select
            value={grade}
            onValueChange={setGrade}
            required
            disabled={isSubmitting}
          >
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9th</SelectItem>
              <SelectItem value="10">10th</SelectItem>
              <SelectItem value="11">11th</SelectItem>
              <SelectItem value="12">12th</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 1600m PR Field */}
      <div className="space-y-2">
        <Label htmlFor="1600m-pr">1600m PR (Optional)</Label>
        <Input
          id="1600m-pr"
          value={time1600mStr}
          onChange={(e) => setTime1600mStr(e.target.value)}
          placeholder="e.g., 5:45.30"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Format: MM:SS.ms (e.g., 5:45.30)
        </p>
      </div>

      {/* Display Errors */}
      {(apiError || internalError) && (
        <p className="text-sm text-red-500 text-center">
          Error: {apiError || internalError}
        </p>
      )}

      {/* Footer Buttons (passed via props or handled by parent dialog) */}
      {/* The parent dialog will render its own footer usually */}
    </form>
  );
}
