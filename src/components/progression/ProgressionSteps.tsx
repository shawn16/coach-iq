"use client";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing components and libraries - Input component from shadcn/ui
import { Input } from "@/components/ui/input";

// Importing components and libraries - Textarea component from shadcn/ui
import { Textarea } from "@/components/ui/textarea";
import { Step } from "@/types/progression";
import { ChevronsUp, ChevronsDown, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the props interface for the ProgressionSteps component
interface ProgressionStepsProps {
  steps: Step[];
  onAddStep: () => void;
  onRemoveStep: (id: number) => void;
  onUpdateStep: (id: number, field: string, value: string) => void;
  onMoveStep: (id: number, direction: "up" | "down") => void;
}

// Define the ProgressionSteps component
export function ProgressionSteps({
  steps,
  onAddStep,
  onRemoveStep,
  onUpdateStep,
  onMoveStep,
}: ProgressionStepsProps) {
  // Define the main return function
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Progression Steps</h3>
        <Button onClick={onAddStep} variant="outline" size="sm">
          Add Step
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Week
                    </label>
                    <Input
                      type="number"
                      value={step.week}
                      onChange={(e) =>
                        onUpdateStep(step.id, "week", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Value
                    </label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="text"
                        value={step.value}
                        onChange={(e) =>
                          onUpdateStep(step.id, "value", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        value={step.unit}
                        onChange={(e) =>
                          onUpdateStep(step.id, "unit", e.target.value)
                        }
                        className="w-16"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <Textarea
                    value={step.description}
                    onChange={(e) =>
                      onUpdateStep(step.id, "description", e.target.value)
                    }
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMoveStep(step.id, "up")}
                  disabled={index === 0}
                >
                  <ChevronsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMoveStep(step.id, "down")}
                  disabled={index === steps.length - 1}
                >
                  <ChevronsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveStep(step.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Export the ProgressionSteps component as the default export
export default ProgressionSteps;
