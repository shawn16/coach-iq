"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
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

interface CreateWorkoutSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (workoutData: WorkoutLibrary) => void;
}

interface WorkoutFormData {
  name: string;
  type: string;
  category: string;
  duration: string;
  description: string;
}

const workoutTypes = [
  "Tempo Run",
  "Interval",
  "Long Run",
  "Fartlek",
  "Recovery",
  "Strength",
  "Race",
];

const categories = [
  "Endurance Support",
  "Direct Endurance",
  "Specific Endurance",
  "Direct Speed",
  "Speed Support",
];

/**
 * Sheet component for creating new workouts
 */
export function CreateWorkoutSheet({
  open,
  onOpenChange,
  onSave,
}: CreateWorkoutSheetProps) {
  const [formData, setFormData] = useState<WorkoutFormData>({
    name: "",
    type: "",
    category: "",
    duration: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Make API call to create workout
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorFromServer = await response.json();
        console.error("Server error response:", errorFromServer);
        const message = errorFromServer.details || errorFromServer.error || 'Failed to create workout';
        throw new Error(message);
      }

      const workout = await response.json();
      onSave(workout);
      
      // Clear form and show success message
      setFormData({
        name: "",
        type: "",
        category: "",
        duration: "",
        description: "",
      });
      toast.success('Workout created successfully');

      onOpenChange(false);

    } catch (error) {
      console.error('Error creating workout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create workout';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Create New Workout</SheetTitle>
          <SheetDescription>
            Define a new workout to add to your training library
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-8">
          <div className="space-y-2">
            <Label htmlFor="name">Workout Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., 400m Interval Session"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
                required
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
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 30-45 min"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
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
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the purpose and benefits of this workout..."
              className="h-24"
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-gray-700 dark:text-gray-300"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Workout"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
