// Importing components and libraries - Step type from @/types/progression
"use client";

// Importing components and libraries - Step type from @/types/progression
import { Step } from "@/types/progression";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing components and libraries - Input component from shadcn/ui
import { Input } from "@/components/ui/input";

// Importing components and libraries - Lucide icons
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

// Define the props interface for the ProgressionSteps component
interface ProgressionStepsProps {
  steps: Step[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, step: Step) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}

// Define the ProgressionSteps component
export function ProgressionSteps({
  steps,
  onAdd,
  onRemove,
  onUpdate,
  onMove,
}: ProgressionStepsProps) {
  // Define the main return function
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Progression Steps</h3>
        <Button onClick={onAdd} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      {/* Render the steps */}
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={step.week}
                onChange={(e) =>
                  onUpdate(index, { ...step, week: parseInt(e.target.value) })
                }
                placeholder="Week"
                min={1}
              />
              <Input
                type="text"
                value={step.value}
                onChange={(e) =>
                  onUpdate(index, { ...step, value: e.target.value })
                }
                placeholder="Value"
              />
              <Input
                type="text"
                value={step.description}
                onChange={(e) =>
                  onUpdate(index, { ...step, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>

            {/* Render the move buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove(index, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove(index, "down")}
                disabled={index === steps.length - 1}
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
              {/* Render the remove button */}
              <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the ProgressionSteps component as the default export
export default ProgressionSteps;
