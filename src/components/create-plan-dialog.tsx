"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the props interface for the CreatePlanDialog component
interface CreatePlanDialogProps {
  onPlanCreated: () => void;
}
// CreatePlanDialog component - A reusable dialog component for creating a new training plan
export function CreatePlanDialog({ onPlanCreated }: CreatePlanDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "12",
    startDate: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the form data to the console
    console.log("Creating plan:", formData);
    setIsSubmitting(false);

    // Call the callback to notify parent component
    onPlanCreated();

    // Navigate to training plan page
    router.push("/training-plan");
  };

  // Render the component
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="h-4 w-4 mr-1" />
          Create New Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Training Plan</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new training plan.
          </DialogDescription>
        </DialogHeader>
        {/* Define the form */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Define the title input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Spring Season Preparation"
                required
              />
            </div>
            {/* Define the description input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Brief description of this training plan"
              />
            </div>
            {/* Define the start date input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* Define the duration input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (weeks)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="52"
                value={formData.duration}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          {/* Define the footer */}
          <DialogFooter>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Export the CreatePlanDialog component as the default export
export default CreatePlanDialog;
