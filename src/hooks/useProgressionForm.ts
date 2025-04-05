import { useState } from "react";

// Importing components and libraries - ProgressionTemplate, WorkoutType, WorkoutMetric types from @/types/progression
import {
  ProgressionTemplate,
  WorkoutType,
  WorkoutMetric,
} from "@/types/progression";

// Importing hooks - useProgressionSteps and useWorkouts from @/hooks
import { useProgressionSteps } from "./useProgressionSteps";
import { useWorkouts } from "./useWorkouts";

// Define the useProgressionForm hook
export function useProgressionForm(initialTemplate?: ProgressionTemplate) {
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

  // Define the state for the errors
  const [errors, setErrors] = useState<string[]>([]);

  // Define the useProgressionSteps hook
  const { steps, addStep, removeStep, updateStep, moveStep } =
    useProgressionSteps(
      initialTemplate?.pattern?.map((value, index) => ({
        id: Date.now() + index,
        week: index + 1,
        value: value.toString(),
        unit: "",
        description: "",
      })) || []
    );

  // Define the useWorkouts hook
  const { workouts, addWorkout, removeWorkout, updateWorkout } = useWorkouts(
    initialTemplate?.workouts || []
  );

  // Define the validate function
  const validate = () => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push("Name is required");
    }

    if (!type) {
      newErrors.push("Type is required");
    }

    if (!metric) {
      newErrors.push("Metric is required");
    }

    if (duration < 1) {
      newErrors.push("Duration must be at least 1 week");
    }

    if (steps.length === 0) {
      newErrors.push("At least one step is required");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Define the getTemplate function
  const getTemplate = (): ProgressionTemplate => ({
    id: initialTemplate?.id || Date.now().toString(),
    name,
    type,
    metric,
    duration,
    description,
    pattern: steps.map((step) => parseFloat(step.value)),
    workouts,
  });

  // Define the reset function
  const reset = () => {
    setName(initialTemplate?.name || "");
    setType((initialTemplate?.type as WorkoutType) || "tempo");
    setMetric((initialTemplate?.metric as WorkoutMetric) || "intensity");
    setDuration(initialTemplate?.duration || 12);
    setDescription(initialTemplate?.description || "");
    setErrors([]);
  };

  // Define the main return function
  return {
    name,
    setName,
    type,
    setType,
    metric,
    setMetric,
    duration,
    setDuration,
    description,
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
    reset,
  };
}
