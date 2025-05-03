"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Simplified version without Dialog component
export function CreatePlanDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationWeeks: "12",
    startDate: new Date().toISOString().slice(0, 10), // Default to today in YYYY-MM-DD format
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit data to the API
      const response = await fetch('/api/training-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          durationWeeks: parseInt(formData.durationWeeks),
          startDate: formData.startDate,
          type: 'standard' // Default type
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create training plan');
      }

      const data = await response.json();
      console.log("Plan created successfully:", data);
      
      // Show success message
      toast.success("Training plan created successfully");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        durationWeeks: "12",
        startDate: new Date().toISOString().slice(0, 10),
      });
      
      // Close dialog
      setIsOpen(false);
      
      // Hard redirect to the training plan page to ensure fresh data load
      window.location.href = "/training-plan";
    } catch (error) {
      console.error("Error creating training plan:", error);
      toast.error("Failed to create training plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <Plus className="h-4 w-4 mr-1" />
        Create New Plan
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-[500px] border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              Create New Training Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fill out the details below to create a new training plan.
            </p>
          </div>

          <div className="grid gap-4 py-4">
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
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
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
                  Creating...
                </>
              ) : (
                "Create Plan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
