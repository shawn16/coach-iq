// This file contains the CreatePlanDialog component
// Provides a dialog form UI for creating new training plans

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // Updated to use sonner instead of shadcn toast
import { AssignAthletesDialog } from "@/components/assign-athletes-dialog";
import { PlanType } from "@/types/training";

/**
 * Dialog component for creating new training plans
 * Includes form fields for all required and optional plan details
 */
export function CreatePlanDialog() {
  // State for the dialog open/close
  const [open, setOpen] = useState(false);
  
  // Router for navigation after successful creation
  const router = useRouter();
  
  // Form state for the training plan data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationWeeks: "12", // Default duration
    startDate: new Date(),
    type: "endurance" as PlanType,
    planType: "xc", // Default to cross country
  });
  
  // Selected athletes to assign to the plan
  const [selectedAthletes, setSelectedAthletes] = useState<number[]>([]);
  
  // Dialog states
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates form data when inputs change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles the training plan type selection
   */
  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as PlanType }));
  };

  /**
   * Handles the plan sub-type selection (xc, track, etc.)
   */
  const handlePlanTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, planType: value }));
  };

  /**
   * Updates start date when selected from calendar
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, startDate: date }));
      setShowDatePicker(false);
    }
  };

  /**
   * Updates selected athletes when assignment dialog closes
   */
  const handleAthleteAssignment = (athleteIds: number[]) => {
    setSelectedAthletes(athleteIds);
    setIsAssignDialogOpen(false);
  };

  /**
   * Submits the form to create a new training plan
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/training-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          athleteIds: selectedAthletes,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create training plan");
      }
      
      // Parse the response but don't assign to unused variable
      await response.json();
      
      // Updated to use sonner's API correctly
      toast.success("Training plan created", {
        description: `Successfully created ${formData.title}`,
      });
      
      setOpen(false);
      router.refresh();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        durationWeeks: "12",
        startDate: new Date(),
        type: "endurance",
        planType: "xc",
      });
      setSelectedAthletes([]);
      
    } catch (error) {
      console.error("Error creating training plan:", error);
      // Updated to use sonner's API correctly
      toast.error("Error", {
        description: "Failed to create training plan. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Main trigger button for the dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">Create New Training Plan</DialogTitle>
          </DialogHeader>
          
          {/* Form for training plan creation */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Plan Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Summer Training Plan"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the training plan"
                  rows={3}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="durationWeeks" className="text-sm font-medium">Duration (Weeks)</Label>
                  <Input
                    id="durationWeeks"
                    name="durationWeeks"
                    type="number"
                    min="1"
                    max="52"
                    value={formData.durationWeeks}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-10 mt-1",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Training Focus</Label>
                  <Select
                    value={formData.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select training focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="speed">Speed</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="marathon">Marathon</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Plan Type</Label>
                  <Select
                    value={formData.planType}
                    onValueChange={handlePlanTypeChange}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xc">Cross Country</SelectItem>
                      <SelectItem value="track">Track</SelectItem>
                      <SelectItem value="road">Road Racing</SelectItem>
                      <SelectItem value="trail">Trail Running</SelectItem>
                      <SelectItem value="general">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Assign athletes section */}
              <div className="space-y-1 pt-2">
                <Label className="text-sm font-medium">Athletes</Label>
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/20">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedAthletes.length} athletes selected
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAssignDialogOpen(true)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Form actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 bg-primary hover:bg-primary/90"
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
        </DialogContent>
      </Dialog>
      
      {/* Dialog for athlete assignment */}
      <AssignAthletesDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        onSelect={handleAthleteAssignment}
        initialSelected={selectedAthletes}
      />
    </>
  );
}
