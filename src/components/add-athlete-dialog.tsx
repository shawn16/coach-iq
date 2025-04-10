/**
 * AddAthleteDialog Component
 *
 * A modal dialog for adding new athletes to the system.
 * Features:
 * - Form with validation for required fields
 * - Age calculation based on birthday
 * - Formatted input for 1600m times
 * - Submit handling with API integration
 */
"use client";

import type React from "react";
import { useState } from "react";
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

/**
 * Athlete interface defines the structure of athlete data
 */
interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  grade: number;
  time1600m: string;
}

/**
 * Props for the AddAthleteDialog component
 *
 * @property isOpen - Controls dialog visibility
 * @property onClose - Callback function to close the dialog
 * @property onAddAthlete - Callback function to handle adding a new athlete
 */
interface AddAthleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAthlete: (athlete: Omit<Athlete, "id">) => void;
}

export function AddAthleteDialog({
  isOpen,
  onClose,
  onAddAthlete,
}: AddAthleteDialogProps) {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    grade: "",
    time1600m: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State for calculated age based on birthday
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  /**
   * Handles input changes for all form fields
   *
   * @param field - The name of the field being changed
   * @param value - The new value of the field
   */
  const handleInputChange = (field: string, value: string) => {
    // Update form data with new value
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Calculate age if birthday changes
    if (field === "birthday" && value) {
      try {
        const birthDate = new Date(value);
        const age = differenceInYears(new Date(), birthDate);
        setCalculatedAge(age);
      } catch {
        setCalculatedAge(null);
      }
    }
  };

  /**
   * Validates all form fields and sets appropriate error messages
   *
   * @returns boolean - True if the form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate first name (required)
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Validate last name (required)
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Validate birthday (required)
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else {
      try {
        const birthDate = new Date(formData.birthday);
        if (isNaN(birthDate.getTime())) {
          newErrors.birthday = "Invalid date format";
        }
      } catch {
        newErrors.birthday = "Invalid date format";
      }
    }

    // Validate grade (required)
    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    // Validate 1600m time format if provided (optional field)
    if (
      formData.time1600m &&
      !/^\d+:\d{2}(.\d{2})?$/.test(formData.time1600m)
    ) {
      newErrors.time1600m = "Format should be MM:SS.ss (e.g., 5:45.30)";
    }

    // Update error state
    setErrors(newErrors);

    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   *
   * @param event - The form submission event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Only proceed if the form is valid
    if (validateForm()) {
      // Call the parent component's handler with the new athlete data
      onAddAthlete({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthday: formData.birthday,
        grade: Number.parseInt(formData.grade),
        time1600m: formData.time1600m || "",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        birthday: "",
        grade: "",
        time1600m: "",
      });
      setCalculatedAge(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {/* Dialog header with title */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Athlete
          </DialogTitle>
        </DialogHeader>

        {/* Athlete form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div>
            <Label
              htmlFor="firstName"
              className="block text-base font-medium mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(event) =>
                handleInputChange("firstName", event.target.value)
              }
              className="w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <Label
              htmlFor="lastName"
              className="block text-base font-medium mb-2"
            >
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(event) =>
                handleInputChange("lastName", event.target.value)
              }
              className="w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Birthday Field */}
          <div>
            <Label
              htmlFor="birthday"
              className="block text-base font-medium mb-2"
            >
              Birthday <span className="text-red-500">*</span>
            </Label>
            <Input
              id="birthday"
              type="date"
              value={formData.birthday}
              onChange={(event) =>
                handleInputChange("birthday", event.target.value)
              }
              className="w-full"
            />
            {errors.birthday && (
              <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
            )}
            {/* Display calculated age if available */}
            {calculatedAge !== null && (
              <p className="text-xs text-gray-500 mt-1">
                Age: {calculatedAge} years
              </p>
            )}
          </div>

          {/* Grade Field */}
          <div>
            <Label htmlFor="grade" className="block text-base font-medium mb-2">
              Grade <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleInputChange("grade", value)}
            >
              <SelectTrigger id="grade" className="w-full">
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
              <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
            )}
          </div>

          {/* 1600m PR Field (Optional) */}
          <div>
            <Label
              htmlFor="time1600m"
              className="block text-base font-medium mb-2"
            >
              1600m PR (Optional)
            </Label>
            <Input
              id="time1600m"
              placeholder="e.g., 5:45.30"
              value={formData.time1600m}
              onChange={(event) =>
                handleInputChange("time1600m", event.target.value)
              }
              className="w-full"
            />
            {errors.time1600m && (
              <p className="text-red-500 text-xs mt-1">{errors.time1600m}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: MM:SS.ss (e.g., 5:45.30)
            </p>
          </div>

          {/* Footer with action buttons */}
          <DialogFooter className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Athlete</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
