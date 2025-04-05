import { useState } from "react";

// Define the CustomWorkoutDialogState type
interface CustomWorkoutDialogState {
  name: string;
  type: string;
  description: string;
  duration: string;
  distance: string;
  pace: string;
  intensity: string;
  notes: string;
  errors: string[];
}

// Define the useCustomWorkoutDialog hook
export function useCustomWorkoutDialog() {
  // Define the state for the custom workout dialog
  const [state, setState] = useState<CustomWorkoutDialogState>({
    name: "",
    type: "",
    description: "",
    duration: "",
    distance: "",
    pace: "",
    intensity: "",
    notes: "",
    errors: [],
  });

  // Define the validate function
  const validate = () => {
    const errors: string[] = [];

    if (!state.name) {
      errors.push("Name is required");
    }

    if (!state.type) {
      errors.push("Type is required");
    }

    if (!state.duration) {
      errors.push("Duration is required");
    } else if (isNaN(parseInt(state.duration))) {
      errors.push("Duration must be a number");
    } else if (parseInt(state.duration) < 1) {
      errors.push("Duration must be at least 1 minute");
    }

    if (state.distance && isNaN(parseFloat(state.distance))) {
      errors.push("Distance must be a number");
    }

    if (state.intensity) {
      const intensity = parseInt(state.intensity);
      if (isNaN(intensity)) {
        errors.push("Intensity must be a number");
      } else if (intensity < 1 || intensity > 10) {
        errors.push("Intensity must be between 1 and 10");
      }
    }

    setState((prev) => ({ ...prev, errors }));
    return errors.length === 0;
  };

  // Define the getWorkout function
  const getWorkout = () => {
    return {
      name: state.name,
      type: state.type,
      description: state.description,
      duration: parseInt(state.duration),
      distance: state.distance ? parseFloat(state.distance) : undefined,
      pace: state.pace || undefined,
      intensity: state.intensity ? parseInt(state.intensity) : undefined,
      notes: state.notes || undefined,
    };
  };

  // Define the reset function
  const reset = () => {
    setState({
      name: "",
      type: "",
      description: "",
      duration: "",
      distance: "",
      pace: "",
      intensity: "",
      notes: "",
      errors: [],
    });
  };

  // Define the main return function
  return {
    state,
    setState,
    validate,
    getWorkout,
    reset,
  };
}
