"use client";

import * as React from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AthleteForm, AthleteFormData } from "@/components/forms/athlete-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

      const newAthlete = await response.json(); // Get new athlete data if needed

      // Success
      toast.success(
        `Athlete "${apiData.first_name} ${apiData.last_name}" added successfully!`
      );
      setOpen(false); // Close dialog
      if (onAthleteAdded) {
        onAthleteAdded(); // Trigger refresh
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setApiError(errorMessage); // Show error in dialog if needed
      toast.error(`Failed to add athlete: ${errorMessage}`); // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            variant="default" 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Athlete</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
        {/* Overlay - using the overlay from the Dialog component */}
        
        {/* Dialog Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Add New Athlete
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter the athlete's information below.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <AthleteForm
            formId={ATHLETE_FORM_ID}
            onSubmit={handleFormSubmit}
            apiError={apiError}
            isSubmitting={isSubmitting}
            key={open ? "athlete-form-open" : "athlete-form-closed"}
            className="space-y-4"
          />
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          <div className="flex justify-end space-x-3 w-full">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="outline"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form={ATHLETE_FORM_ID}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : 'Add Athlete'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Need to modify AthleteForm to accept and use the form="..." id
// Alternatively, trigger form submission programmatically from this button's onClick
