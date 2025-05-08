// This file contains the WorkoutEditor component
// Used for creating and editing workouts within training plans

"use client";

import { useState, useEffect } from "react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Workout } from "@/types/training";

/**
 * Schema for validating workout form data
 */
const workoutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string(),
  duration: z.string(),
  intensityLevel: z.string(),
  equipment: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * Type for workout form values
 */
type WorkoutFormValues = z.infer<typeof workoutSchema>;

/**
 * Props for the WorkoutEditor component
 */
interface WorkoutEditorProps {
  initialData?: Partial<Workout>;
  onSave: (data: WorkoutFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Workout intensity level options for selection
 */
const intensityLevels = ["Low", "Moderate", "High", "Very High", "Maximum"];

/**
 * Workout type options for selection
 */
const workoutTypes = [
  "Strength", 
  "Endurance", 
  "Recovery", 
  "Speed", 
  "Technique", 
  "Flexibility",
  "Cross Training",
  "Race Simulation"
];

/**
 * Component for creating and editing workouts
 * Handles form validation and submission
 */
export function WorkoutEditor({ 
  initialData = {}, 
  onSave, 
  onCancel,
  isLoading = false
}: WorkoutEditorProps) {
  // Exercise input management
  const [exerciseInput, setExerciseInput] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);

  // Form setup with validation schema
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      title: initialData.title || "",
      type: initialData.type || "",
      description: initialData.description || "",
      duration: initialData.duration || "",
      intensityLevel: initialData.intensityLevel || "Moderate",
      equipment: initialData.equipment || "",
      notes: initialData.notes || "",
    },
  });

  /**
   * Add an exercise to the list
   */
  const addExercise = () => {
    if (exerciseInput.trim()) {
      setExercises([...exercises, exerciseInput.trim()]);
      setExerciseInput("");
    }
  };

  /**
   * Remove an exercise from the list
   */
  const removeExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  /**
   * Handle form submission
   */
  const onSubmit = (data: WorkoutFormValues) => {
    onSave({
      ...data,
      // Add exercises to the form data
    });
  };

  // Initialize exercises if available in initial data
  useEffect(() => {
    if (initialData.exercises && Array.isArray(initialData.exercises)) {
      setExercises(initialData.exercises);
    }
  }, [initialData.exercises]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Workout title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout title" {...field} />
              </FormControl>
              <FormDescription>
                Give your workout a descriptive title
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Workout type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workoutTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The primary focus of this workout
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Workout description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter workout description" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a description of the workout's purpose
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 45 minutes" {...field} />
              </FormControl>
              <FormDescription>
                Expected length of the workout
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Intensity level */}
        <FormField
          control={form.control}
          name="intensityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensity Level</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intensity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {intensityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                How intense is this workout
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Equipment */}
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment</FormLabel>
              <FormControl>
                <Input placeholder="Equipment needed (optional)" {...field} />
              </FormControl>
              <FormDescription>
                List any equipment required for this workout
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Exercises section */}
        <div className="space-y-4">
          <FormLabel>Exercises</FormLabel>
          <div className="flex gap-2">
            <Input
              value={exerciseInput}
              onChange={(e) => setExerciseInput(e.target.value)}
              placeholder="Add an exercise"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExercise())}
            />
            <Button type="button" onClick={addExercise}>
              Add
            </Button>
          </div>
          
          {/* List of added exercises */}
          {exercises.length > 0 && (
            <div className="mt-2">
              <ul className="space-y-2">
                {exercises.map((exercise, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span>{exercise}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <FormDescription>
            Add specific exercises included in this workout
          </FormDescription>
        </div>
        
        {/* Additional notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional notes (optional)" 
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Any additional guidance for coaches or athletes
              </FormDescription>
            </FormItem>
          )}
        />
        
        {/* Form actions */}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData.id ? "Update Workout" : "Create Workout"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
