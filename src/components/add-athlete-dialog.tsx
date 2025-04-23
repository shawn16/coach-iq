"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { differenceInYears } from "date-fns";
import { cn } from "@/lib/utils";
import { timeStringToMs } from "@/lib/time-utils";
import { AthleteInput } from "@/types/athlete";

/**
 * Props for the AddAthleteDialog component
 *
 * @interface AddAthleteDialogProps
 * @property {boolean} isOpen - Controls whether the dialog is displayed
 * @property {() => void} onClose - Function to call when dialog should close
 * @property {(athlete: AthleteInput) => void} onAdd - Function to call with new athlete data
 */
interface AddAthleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (athlete: AthleteInput) => void;
}

/**
 * Initial state for the form - empty values for all fields
 * Using camelCase here for UI form state even though database uses snake_case
 */
const initialFormData = {
  firstName: "",
  lastName: "",
  birthday: "",
  grade: "",
  time1600m: "",
};

/**
 * Dialog component for adding a new athlete
 *
 * This component handles:
 * 1. Displaying a form in a modal dialog
 * 2. Form state management
 * 3. Validation of user input
 * 4. Conversion between display format and database format
 * 5. Submitting data to parent component
 */
export function AddAthleteDialog({
  isOpen,
  onClose,
  onAdd,
}: AddAthleteDialogProps) {
  // State to track form input values
  const [formData, setFormData] = useState(initialFormData);

  // State to track validation errors for each field
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State to display calculated age based on birthday
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  /**
   * Reset form state when dialog closes
   * This useEffect hook runs whenever the isOpen prop changes
   */
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
      setCalculatedAge(null);
    }
  }, [isOpen]);

  /**
   * Handle changes from <Input> components
   *
   * @param field - The form field being updated
   * @param e - The React change event
   */
  const handleInputChange = (
    field: keyof typeof initialFormData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    // Update the form state with the new value
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear any previous error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Special handling for birthday field to calculate age
    if (field === "birthday") {
      if (value) {
        try {
          const birthDate = new Date(value);
          if (!isNaN(birthDate.getTime())) {
            // Use date-fns to calculate years between birthday and now
            const age = differenceInYears(new Date(), birthDate);
            setCalculatedAge(age);
          } else {
            setCalculatedAge(null);
          }
        } catch {
          setCalculatedAge(null);
        }
      } else {
        setCalculatedAge(null);
      }
    }
  };

  /**
   * Handle changes from <Select> components
   *
   * @param field - The form field being updated
   * @param value - The selected value
   */
  const handleSelectChange = (
    field: keyof typeof initialFormData,
    value: string
  ) => {
    // Update the form state with the new value
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear any previous error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Validate all form fields and set error messages if needed
   *
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Check first name
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    // Check last name
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Check birthday
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else {
      try {
        const birthDate = new Date(formData.birthday);
        if (isNaN(birthDate.getTime()))
          newErrors.birthday = "Invalid date format";
      } catch {
        newErrors.birthday = "Invalid date format";
      }
    }

    // Check grade
    if (!formData.grade) newErrors.grade = "Grade is required";

    // Check 1600m time
    if (!formData.time1600m.trim()) {
      newErrors.time1600m = "1600m time is required";
    } else if (!/^\d+:\d{2}\.\d{2}$/.test(formData.time1600m)) {
      // Regex to validate time format (MM:SS.ss)
      newErrors.time1600m = "Format must be MM:SS.ss (e.g., 5:45.30)";
    }

    // Update state with any errors found
    setErrors(newErrors);

    // Return true if no errors (form is valid)
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   *
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) {
      // Create athlete object in the format expected by Supabase
      // Note the conversion from UI format (camelCase) to database format (snake_case)
      const athleteToAdd: AthleteInput = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        birthday: formData.birthday,
        grade: Number.parseInt(formData.grade),
        time_1600m: timeStringToMs(formData.time1600m.trim()), // Convert "4:45.30" to milliseconds
      };

      // Pass data up to parent component
      onAdd(athleteToAdd);

      // Close the dialog
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Add New Athlete
          </DialogTitle>
        </DialogHeader>

        {/* Form with grid layout for fields */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* First row: First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-gray-700 dark:text-gray-300"
              >
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e)}
                className={cn(
                  "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                  errors.firstName && "border-red-500 dark:border-red-500" // Add red border if error
                )}
                aria-invalid={!!errors.firstName}
                aria-describedby="firstName-error"
              />
              {/* Show error message if validation fails */}
              {errors.firstName && (
                <p id="firstName-error" className="text-red-500 text-xs">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-gray-700 dark:text-gray-300"
              >
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e)}
                className={cn(
                  "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                  errors.lastName && "border-red-500 dark:border-red-500"
                )}
                aria-invalid={!!errors.lastName}
                aria-describedby="lastName-error"
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-red-500 text-xs">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Second row: Birthday and Grade */}
          <div className="grid grid-cols-2 gap-4">
            {/* Birthday Input */}
            <div className="space-y-2">
              <Label
                htmlFor="birthday"
                className="text-gray-700 dark:text-gray-300"
              >
                Birthday <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthday"
                type="date" // HTML5 date picker
                value={formData.birthday}
                onChange={(e) => handleInputChange("birthday", e)}
                className={cn(
                  "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                  errors.birthday && "border-red-500 dark:border-red-500"
                )}
                aria-invalid={!!errors.birthday}
                aria-describedby="birthday-error"
              />
              {errors.birthday && (
                <p id="birthday-error" className="text-red-500 text-xs">
                  {errors.birthday}
                </p>
              )}
              {/* Show calculated age if birthday is valid */}
              {calculatedAge !== null && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Age: {calculatedAge} years
                </p>
              )}
            </div>

            {/* Grade Select */}
            <div className="space-y-2">
              <Label
                htmlFor="grade"
                className="text-gray-700 dark:text-gray-300"
              >
                Grade <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.grade}
                onValueChange={(value) => handleSelectChange("grade", value)}
              >
                <SelectTrigger
                  id="grade"
                  className={cn(
                    "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                    errors.grade && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={!!errors.grade}
                  aria-describedby="grade-error"
                >
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9th Grade</SelectItem>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              {errors.grade && (
                <p id="grade-error" className="text-red-500 text-xs">
                  {errors.grade}
                </p>
              )}
            </div>
          </div>

          {/* 1600m Time Input */}
          <div className="space-y-2">
            <Label
              htmlFor="time1600m"
              className="text-gray-700 dark:text-gray-300"
            >
              1600m PR <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time1600m"
              placeholder="e.g., 5:45.30"
              value={formData.time1600m}
              onChange={(e) => handleInputChange("time1600m", e)}
              className={cn(
                "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                errors.time1600m && "border-red-500 dark:border-red-500"
              )}
              aria-invalid={!!errors.time1600m}
              aria-describedby="time1600m-error"
            />
            {errors.time1600m && (
              <p id="time1600m-error" className="text-red-500 text-xs">
                {errors.time1600m}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Format: MM:SS.ss
            </p>
          </div>

          {/* Dialog Footer with Buttons */}
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add Athlete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
