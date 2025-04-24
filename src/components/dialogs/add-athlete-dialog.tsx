"use client";

import * as React from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AthleteForm, AthleteFormData } from "@/components/forms/athlete-form";

// Interface for the data sent to API - Align with backend payload
interface ApiPayload {
  first_name: string;
  last_name: string;
  birthday: string; // Expecting yyyy-MM-dd string
  grade: number;
  time_1600m_str: string; // Expecting mandatory string format
}

// Props remain the same, but callback data might change based on API needs
interface AddAthleteDialogProps {
  trigger?: React.ReactNode;
  onAthleteAdded?: () => void; // Simple callback, no data needed
}

const ATHLETE_FORM_ID = "add-athlete-form"; // Unique ID for the form

export function AddAthleteDialog({
  trigger,
  onAthleteAdded,
}: AddAthleteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  // This function is passed to AthleteForm's onSubmit prop
  const handleFormSubmit = async (formData: AthleteFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    // Remove redundant time parsing - Form already validates format
    // Backend will parse the string

    // Validate birthday exists (although form should ensure this)
    if (!formData.birthday) {
      setApiError("Birthday data missing from form.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data for API - Ensure structure matches backend expectations
    const apiData: ApiPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      birthday: format(formData.birthday, "yyyy-MM-dd"), // Format Date to string
      grade: parseInt(formData.grade, 10),
      time_1600m_str: formData.time_1600m_str, // Send the validated string
    };

    console.log("Submitting new athlete (API payload):", apiData);

    try {
      const response = await fetch("/api/athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to add athlete (HTTP ${response.status})`
        );
      }

      // Success
      setOpen(false); // Close dialog
      if (onAthleteAdded) {
        onAthleteAdded(); // Trigger refresh
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" />
            Add Athlete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Athlete
          </DialogTitle>
        </DialogHeader>

        {/* Use the reusable form component */}
        {/* We need to link the submit button in the footer to this form */}
        <AthleteForm
          formId={ATHLETE_FORM_ID}
          onSubmit={handleFormSubmit}
          apiError={apiError}
          isSubmitting={isSubmitting}
          key={open ? "athlete-form-open" : "athlete-form-closed"}
        />

        {/* Dialog Footer is kept here to control cancel/submit actions */}
        <DialogFooter className="gap-2 sm:justify-end pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          {/* This button triggers the form submission via the form's onSubmit */}
          <Button
            type="submit"
            form={ATHLETE_FORM_ID}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Athlete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Need to modify AthleteForm to accept and use the form="..." id
// Alternatively, trigger form submission programmatically from this button's onClick
