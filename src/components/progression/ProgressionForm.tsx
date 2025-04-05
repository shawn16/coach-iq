"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Importing components and libraries - Select component from shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importing components and libraries - Lucide icons
import { AlertCircle } from "lucide-react";

// Importing hooks - useProgressionForm from @/hooks
import { useProgressionForm } from "@/hooks/useProgressionForm";

// Importing components - ProgressionSteps, WorkoutBuilder, ProgressionChart from @/components/progression
import { ProgressionSteps } from "./ProgressionSteps";
import { WorkoutBuilder } from "./WorkoutBuilder";
import { ProgressionChart } from "./ProgressionChart";
import {
  ProgressionTemplate,
  WorkoutType,
  WorkoutMetric,
} from "@/types/progression";

// Define the props interface for the ProgressionForm component
interface ProgressionFormProps {
  initialTemplate?: ProgressionTemplate;
  onSave: (template: ProgressionTemplate) => void;
  onCancel: () => void;
}

// Define the ProgressionForm component
export function ProgressionForm({
  initialTemplate,
  onSave,
  onCancel,
}: ProgressionFormProps) {
  // Define the state for the name
  const [name, setName] = useState(initialTemplate?.name || "");

  // Define the state for the type
  const [type, setType] = useState<WorkoutType>(
    (initialTemplate?.type as WorkoutType) || "tempo"
  );

  // Define the state for the metric
  const [metric, setMetric] = useState<WorkoutMetric>(
    (initialTemplate?.metric as WorkoutMetric) || "intensity"
  );

  // Define the state for the duration
  const [duration, setDuration] = useState(initialTemplate?.duration || 12);

  // Define the state for the description
  const [description, setDescription] = useState(
    initialTemplate?.description || ""
  );
    setDescription,
    steps,
    addStep,
    removeStep,
    updateStep,
    moveStep,
    workouts,
    addWorkout,
    removeWorkout,
    updateWorkout,
    errors,
    validate,
    getTemplate,
  } = useProgressionForm(initialTemplate);

  // Define the handleSave function
  const handleSave = () => {
    if (validate()) {
      onSave(getTemplate());
    }
  };

  // Define the main return function
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter template name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as WorkoutType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tempo">Tempo</SelectItem>
              <SelectItem value="interval">Interval</SelectItem>
              <SelectItem value="long_run">Long Run</SelectItem>
              <SelectItem value="fartlek">Fartlek</SelectItem>
              <SelectItem value="recovery_run">Recovery Run</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Metric</label>
          <Select
            value={metric}
            onValueChange={(value) => setMetric(value as WorkoutMetric)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intensity">Intensity</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (weeks)</label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={1}
            placeholder="Enter duration"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter template description"
        />
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render the ProgressionSteps component */}
      <ProgressionSteps
        steps={steps}
        onAdd={addStep}
        onRemove={removeStep}
        onUpdate={updateStep}
        onMove={moveStep}
      />

      {/* Render the WorkoutBuilder component */}
      <WorkoutBuilder
        workouts={workouts}
        onAdd={addWorkout}
        onRemove={removeWorkout}
        onUpdate={updateWorkout}
      />

      {/* Render the ProgressionChart component */}
      <ProgressionChart steps={steps} metric={metric} />

      {/* Render the Save and Cancel buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
