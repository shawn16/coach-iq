import { useState } from "react";
import { Step } from "@/types/progression";

// Define the useProgressionSteps hook
export function useProgressionSteps(initialSteps: Step[] = []) {
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  // Define the addStep function
  const addStep = () => {
    const newStep: Step = {
      id: Date.now(),
      week: steps.length + 1,
      value: "",
      unit: "",
      description: "",
    };
    setSteps([...steps, newStep]);
  };

  // Define the removeStep function
  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Define the updateStep function
  const updateStep = (index: number, step: Step) => {
    setSteps(steps.map((s, i) => (i === index ? step : s)));
  };

  // Define the moveStep function
  const moveStep = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    ) {
      return;
    }

    // Define the new steps array
    const newSteps = [...steps];

    // Define the new index
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Swap the steps
    [newSteps[index], newSteps[newIndex]] = [
      newSteps[newIndex],
      newSteps[index],
    ];

    // Update the steps
    setSteps(newSteps);
  };

  // Define the main return function
  return {
    steps,
    addStep,
    removeStep,
    updateStep,
    moveStep,
  };
}
