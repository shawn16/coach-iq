// This file contains the EditTrainingPlanDialog component
// Provides a dialog form UI for editing existing training plans

"use client";

import { useEffect, useState } from "react";
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
import { Loader2, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { addDays, format } from "date-fns";

// Props for the EditTrainingPlanDialog component
interface EditTrainingPlanDialogProps {
  planId: string;
  initialData: {
    title: string;
    description: string;
    startDate: string;
    durationWeeks?: number;
    duration?: string;
    planType?: string;
  };
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

/**
 * Dialog component for editing existing training plans
 * Allows modification of plan details, dates, and duration
 */
export function EditTrainingPlanDialog({
  planId,
  initialData,
  open,
  onClose,
  onUpdateSuccess,
}: EditTrainingPlanDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract duration in weeks from duration string if needed (e.g., "12 weeks" -> 12)
  const extractDurationWeeks = (durationStr: string) => {
    const match = durationStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 12;
  };

  // Form state for the training plan data
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    durationWeeks: initialData.durationWeeks?.toString() || 
                  (initialData.duration ? extractDurationWeeks(initialData.duration).toString() : "12"),
    startDate: initialData.startDate ? 
               typeof initialData.startDate === 'string' && initialData.startDate.includes('T') ? 
               initialData.startDate.split('T')[0] : 
               new Date(initialData.startDate).toISOString().slice(0, 10) : 
               new Date().toISOString().slice(0, 10),
    planType: initialData.planType || "xc", // Default to Cross Country if not specified
  });

  /**
   * Updates form data when inputs change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Calculates end date based on start date and duration
   */
  const calculateEndDate = () => {
    const startDate = new Date(formData.startDate);
    const durationWeeks = parseInt(formData.durationWeeks);
    const endDate = addDays(startDate, durationWeeks * 7 - 1); // -1 because end date is inclusive
    
    return format(endDate, "MMM d, yyyy");
  };

  /**
   * Submits the form to update the training plan
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit data to the API
      const response = await fetch(`/api/training-plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          durationWeeks: parseInt(formData.durationWeeks),
          planType: formData.planType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update training plan');
      }

      await response.json();
      
      // Show success message
      toast.success("Training plan updated successfully");
      
      // Call onUpdateSuccess callback to refresh data
      onUpdateSuccess();
      
      // Close dialog using the onClose prop
      onClose();
    } catch (error) {
      console.error("Error updating training plan:", error);
      toast.error("Failed to update training plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-indigo-500" />
            Edit Training Plan
          </DialogTitle>
          <Button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onClose}
            variant="ghost"
            size="sm"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="title"
              className="text-right text-gray-700 dark:text-gray-300"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Spring Season Preparation"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="col-span-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Brief description of this training plan"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="startDate"
              className="text-right text-gray-700 dark:text-gray-300"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="col-span-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="durationWeeks"
              className="text-right text-gray-700 dark:text-gray-300"
            >
              Duration (weeks)
            </Label>
            <Input
              id="durationWeeks"
              name="durationWeeks"
              type="number"
              min="1"
              max="52"
              value={formData.durationWeeks}
              onChange={handleInputChange}
              className="col-span-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="planType"
              className="text-right text-gray-700 dark:text-gray-300"
            >
              Plan Type
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.planType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, planType: value }))}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xc">Cross Country</SelectItem>
                  <SelectItem value="track">Track</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right text-gray-700 dark:text-gray-300">
              End Date
            </div>
            <div className="col-span-3 text-gray-600 dark:text-gray-400">
              {calculateEndDate()}
            </div>
          </div>
          
          <div className="pt-2 text-sm text-amber-600 dark:text-amber-400">
            Note: Changing the start date or duration will update the training schedule dates.
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-2">
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
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}