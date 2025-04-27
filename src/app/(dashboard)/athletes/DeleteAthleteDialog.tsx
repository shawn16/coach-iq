// This file defines the DeleteAthleteDialog component, which provides a confirmation dialog for deleting an athlete.
// It uses a modal dialog design to ensure users are aware of the irreversible nature of the deletion action.
// The component integrates with the application's state to display the athlete's name, handle deletion logic, and show error messages if the process fails.
// It is a reusable and accessible UI component that enhances user experience by providing clear feedback and options for critical actions.

// Import React to use JSX and define functional components.
import React from "react";

// Import components from the alert-dialog UI library.
// These components are used to create a modal dialog with a consistent design.
import {
  AlertDialog, // The main wrapper for the dialog.
  AlertDialogAction, // Represents the action button (e.g., confirm delete).
  AlertDialogCancel, // Represents the cancel button.
  AlertDialogContent, // The container for the dialog's content.
  AlertDialogDescription, // A description providing more details about the dialog's purpose.
  AlertDialogFooter, // The footer section of the dialog, typically containing buttons.
  AlertDialogHeader, // The header section of the dialog, typically containing the title.
  AlertDialogTitle, // The title of the dialog.
} from "@/components/ui/alert-dialog";

// Define the props (properties) that the DeleteAthleteDialog component expects.
// This ensures type safety and helps developers understand what data the component needs.
interface DeleteAthleteDialogProps {
  isOpen: boolean; // Controls whether the dialog is visible or not.
  onClose: () => void; // Function to close the dialog.
  onConfirm: () => void; // Function to confirm the deletion action.
  isDeleting: boolean; // Indicates whether the deletion process is ongoing.
  error: string | null; // Holds any error message related to the deletion process.
  athleteName: string | null; // The name of the athlete to be deleted (if available).
}

// Define the DeleteAthleteDialog component as a functional React component.
// This component displays a confirmation dialog for deleting an athlete.
export const DeleteAthleteDialog: React.FC<DeleteAthleteDialogProps> = ({
  isOpen, // Whether the dialog is open.
  onClose, // Function to close the dialog.
  onConfirm, // Function to confirm the deletion.
  isDeleting, // Whether the deletion is in progress.
  error, // Any error message to display.
  athleteName, // The name of the athlete being deleted.
}) => {
  return (
    // The AlertDialog component wraps the entire dialog and controls its visibility.
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {/* The main content of the dialog. */}
      <AlertDialogContent>
        {/* The header section of the dialog, containing the title and description. */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {/* Provide a warning about the irreversible nature of the action. */}
            This action cannot be undone. This will permanently delete the
            athlete {athleteName && `"${athleteName}"`} and remove their data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Display an error message if one exists. */}
        {error && (
          <p className="text-sm text-red-600 text-center">Error: {error}</p>
        )}

        {/* The footer section of the dialog, containing the cancel and confirm buttons. */}
        <AlertDialogFooter>
          {/* Cancel button to close the dialog without taking any action. */}
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          {/* Confirm button to proceed with the deletion. */}
          <AlertDialogAction
            onClick={onConfirm} // Trigger the onConfirm function when clicked.
            disabled={isDeleting} // Disable the button if the deletion is in progress.
            className="bg-red-600 hover:bg-red-700" // Apply styling for a destructive action.
          >
            {/* Show a loading state if the deletion is in progress. */}
            {isDeleting ? "Deleting..." : "Yes, delete athlete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Next Step Suggestion: Add animations or transitions to improve the user experience.

// Common Beginner Mistake: Forgetting to handle the case where `athleteName` is null or undefined.
// Always validate optional props before using them to avoid runtime errors.