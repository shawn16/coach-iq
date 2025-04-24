"use client";

import * as React from "react";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
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
import { AthleteForm, AthleteFormData } from "@/components/forms/athlete-form"; // Import the form

// Interface for the existing athlete data received as prop
// Align with the actual data structure if needed
interface Athlete {
  id: string | number; // Allow number if ID is int
  first_name: string;
  last_name: string;
  birthday: string; // Expecting YYYY-MM-DD string from API/table
  grade: number;
  time_1600m: number; // Expecting milliseconds from API/table
  // Add other fields if present in the prop
}

// Interface for the data sent to the API for updating - Align with backend
interface UpdateApiPayload {
  first_name: string;
  last_name: string;
  birthday: string; // Expecting yyyy-MM-dd string
  grade: number;
  time_1600m_str: string; // Expecting mandatory string format MM:SS.ms
}

// Define the props for the EditAthleteDialog component
interface EditAthleteDialogProps {
  athlete: Athlete;
  trigger?: React.ReactNode;
  onAthleteUpdated?: () => void; // Callback after updating
}

const EDIT_ATHLETE_FORM_ID = "edit-athlete-form"; // Unique ID for the form

export function EditAthleteDialog({
  athlete,
  trigger,
  onAthleteUpdated,
}: EditAthleteDialogProps) {
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
    const apiData: UpdateApiPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      birthday: format(formData.birthday, "yyyy-MM-dd"), // Format Date to string
      grade: parseInt(formData.grade, 10),
      time_1600m_str: formData.time_1600m_str, // Send the validated string
    };

    console.log(
      `Submitting updated athlete ${athlete.id} (API payload):`,
      apiData
    );

    try {
      // Ensure athlete.id is converted to string if needed for URL
      const response = await fetch(`/api/athletes/${athlete.id.toString()}`, {
        method: "PUT", // Use PUT method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to update athlete (HTTP ${response.status})`
        );
      }

      // Success
      setOpen(false); // Close dialog
      if (onAthleteUpdated) {
        onAthleteUpdated(); // Trigger refresh
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

  // Memoize initialFormData to prevent unnecessary re-renders of AthleteForm's useEffect
  const initialFormData = React.useMemo(() => {
    console.log("Recalculating initialFormData for memo"); // Add log for debugging memo
    return {
      first_name: athlete.first_name,
      last_name: athlete.last_name,
      birthday: athlete.birthday,
      grade: athlete.grade.toString(),
      time_1600m: athlete.time_1600m,
    };
  }, [athlete]); // Dependency array includes the athlete prop

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Athlete
          </DialogTitle>
          <DialogDescription>
            Update the details for {athlete.first_name} {athlete.last_name}.
          </DialogDescription>
        </DialogHeader>

        {/* Use the reusable form component, passing initial data */}
        <AthleteForm
          formId={EDIT_ATHLETE_FORM_ID} // Unique ID
          initialData={initialFormData}
          onSubmit={handleFormSubmit}
          apiError={apiError}
          isSubmitting={isSubmitting}
          // Reset form via key when dialog opens OR when the athlete prop changes
          key={open ? `edit-athlete-${athlete.id}` : "edit-athlete-closed"}
        />

        {/* Dialog Footer is kept here */}
        <DialogFooter className="gap-2 sm:justify-end pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form={EDIT_ATHLETE_FORM_ID} // Link button to the form
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
