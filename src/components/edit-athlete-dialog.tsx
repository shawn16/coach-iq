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
import { AthleteDisplay, AthleteInput } from "@/types/athlete";

interface EditAthleteDialogProps {
  athlete: AthleteDisplay | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, athlete: AthleteInput) => void;
}

/**
 * Dialog component for editing an existing athlete
 *
 * This component handles:
 * 1. Displaying a pre-populated form in a modal dialog
 * 2. Form state management
 * 3. Validation of user input
 * 4. Conversion between display format and database format
 * 5. Submitting data to parent component
 */
export function EditAthleteDialog({
  athlete,
  isOpen,
  onClose,
  onUpdate,
}: EditAthleteDialogProps) {
  // State to track form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    grade: "",
    time1600m: "",
  });

  // State to track validation errors for each field
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State to display calculated age based on birthday
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  /**
   * Populate form with athlete data when the dialog opens or athlete changes
   */
  useEffect(() => {
    if (isOpen && athlete) {
      setFormData({
        firstName: athlete.first_name,
        lastName: athlete.last_name,
        birthday: athlete.birthday,
        grade: athlete.grade.toString(),
        time1600m: athlete.time1600m,
      });

      // Calculate age from birthday
      if (athlete.birthday) {
        try {
          const birthDate = new Date(athlete.birthday);
          if (!isNaN(birthDate.getTime())) {
            const age = differenceInYears(new Date(), birthDate);
            setCalculatedAge(age);
          }
        } catch {
          setCalculatedAge(null);
        }
      }
    } else if (!isOpen) {
      // Reset form when dialog closes
      setFormData({
        firstName: "",
        lastName: "",
        birthday: "",
        grade: "",
        time1600m: "",
      });
      setErrors({});
      setCalculatedAge(null);
    }
  }, [isOpen, athlete]);

  /**
   * Handle changes from <Input> components
   */
  const handleInputChange = (
    field: keyof typeof formData,
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
   */
  const handleSelectChange = (field: keyof typeof formData, value: string) => {
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
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!athlete) return;

    if (validateForm()) {
      // Create athlete object in the format expected by Supabase
      const athleteToUpdate: AthleteInput = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        birthday: formData.birthday,
        grade: Number.parseInt(formData.grade),
        time_1600m: timeStringToMs(formData.time1600m.trim()),
      };

      // Pass data up to parent component
      onUpdate(athlete.id, athleteToUpdate);

      // Close the dialog
      onClose();
    }
  };

  if (!athlete) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Edit Athlete
          </DialogTitle>
        </DialogHeader>

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
                  errors.firstName && "border-red-500 dark:border-red-500"
                )}
                aria-invalid={!!errors.firstName}
                aria-describedby="firstName-error"
              />
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
                type="date"
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
