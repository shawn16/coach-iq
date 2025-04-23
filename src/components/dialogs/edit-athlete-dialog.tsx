"use client";

import * as React from "react";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { parseTimeToMilliseconds } from "@/lib/utils";
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
interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string; // Assuming API returns string
  grade: number;
  time_1600m: number;
  projected_5k?: string;
  projected_3200m?: string;
  projected_800m?: string;
}

// Interface for the data sent to the API for updating
interface UpdateApiAthleteData {
  first_name: string;
  last_name: string;
  birthday: string | null; // Expecting yyyy-MM-dd string
  grade: number;
  time_1600m?: number | null; // Milliseconds
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

    // Validate and parse time string from the form data
    const time1600mMs = parseTimeToMilliseconds(formData.time_1600m_str);
    if (formData.time_1600m_str && time1600mMs === null) {
      setApiError("Invalid 1600m time format. Use MM:SS.ms");
      setIsSubmitting(false);
      return;
    }

    // Prepare data for API (format date, parse grade)
    const apiData: UpdateApiAthleteData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      birthday: formData.birthday
        ? format(formData.birthday, "yyyy-MM-dd")
        : null,
      grade: parseInt(formData.grade, 10),
      time_1600m: time1600mMs ?? null,
    };

    console.log("Submitting updated athlete (API data):", apiData);

    try {
      const response = await fetch(`/api/athletes/${athlete.id}`, {
        method: "PUT",
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

  // Prepare initialData for the AthleteForm
  const initialFormData = {
    first_name: athlete.first_name,
    last_name: athlete.last_name,
    birthday: athlete.birthday, // Pass the original string/date
    grade: athlete.grade,
    time_1600m: athlete.time_1600m,
  };

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
          submitButtonText="Save Changes" // Specific button text
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
