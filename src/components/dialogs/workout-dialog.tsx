"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { WorkoutLibrary } from "@/types/training";

interface WorkoutFormData {
  name: string;
  type: string;
  category: string;
  duration: string;
  description: string;
}

const defaultFormData = {
  name: "",
  type: "",
  category: "",
  duration: "",
  description: "",
};

const workoutTypes = [
  "Tempo Run",
  "Interval",
  "Long Run",
  "Fartlek",
  "Recovery",
  "Strength",
];

const categories = [
  "Endurance Support",
  "Direct Endurance",
  "Specific Endurance",
  "Direct Speed",
  "Speed Support",
];

interface WorkoutDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (workout: WorkoutLibrary) => void;
  initialValues?: Partial<WorkoutFormData> & { id?: string };
  dialogTitle?: string;
  submitButtonText?: string;
  isEditMode?: boolean;
}

export function WorkoutDialog({
  open,
  onClose,
  onSave,
  initialValues = {},
  dialogTitle = "Create New Workout",
  submitButtonText = "Create Workout",
  isEditMode = false,
}: WorkoutDialogProps) {
  const isMounted = useRef(true);
  const [formData, setFormData] = useState<WorkoutFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      if (isEditMode && initialValues && Object.keys(initialValues).length > 0) {
        setFormData({
          name: initialValues.name || "",
          type: initialValues.type || "",
          category: initialValues.category || "",
          duration: initialValues.duration || "",
          description: initialValues.description || "",
        });
      } else {
        setFormData(defaultFormData);
      }
    }
  }, [open, isEditMode, initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;
      if (isEditMode && initialValues?.id) {
        response = await fetch(`/api/workouts/${initialValues.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            id: initialValues.id,
          }),
        });
      } else {
        response = await fetch("/api/workouts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to ${isEditMode ? "update" : "create"} workout`
        );
      }

      const workout = await response.json();
      toast.success(
        isEditMode ? "Workout updated successfully" : "Workout created successfully"
      );

      if (isMounted.current) {
        onSave(workout);
        setIsSubmitting(false);

        // Small delay before closing to ensure state updates complete
        setTimeout(() => {
          if (isMounted.current) {
            onClose();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isEditMode ? "update" : "create"} workout`
      );
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isSubmitting) {
          // Ensure dropdowns are closed before dialog closes
          setTypeOpen(false);
          setCategoryOpen(false);
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details of this workout"
              : "Add a new workout to your library"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., 400m Interval Session"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Workout Type</Label>
                <Select
                  name="type"
                  open={typeOpen}
                  onOpenChange={setTypeOpen}
                  value={formData.type}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, type: value }));
                    setTypeOpen(false);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  placeholder="e.g., 45 minutes"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                open={categoryOpen}
                onOpenChange={setCategoryOpen}
                value={formData.category}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, category: value }));
                  setCategoryOpen(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe the workout..."
                className="h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Saving..." : "Creating..."}
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Convenience exports with pre-configured props
export function CreateWorkoutDialog(
  props: Omit<WorkoutDialogProps, "isEditMode" | "dialogTitle" | "submitButtonText">
) {
  return <WorkoutDialog {...props} isEditMode={false} />;
}

export function EditWorkoutDialog(
  props: Omit<WorkoutDialogProps, "isEditMode" | "dialogTitle" | "submitButtonText" | "initialValues"> &
  { workout?: WorkoutLibrary }
) {
  return (
    <WorkoutDialog
      {...props}
      isEditMode={true}
      dialogTitle="Edit Workout"
      submitButtonText="Save Changes"
      initialValues={props.workout}
    />
  );
}
