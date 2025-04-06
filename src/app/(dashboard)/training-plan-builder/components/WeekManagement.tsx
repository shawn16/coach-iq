"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

/**
 * Props for the WeekManagement component
 * @interface WeekManagementProps
 * @property {number} weeks - The current number of weeks in the training plan
 * @property {(weeks: number) => void} onWeeksChange - Callback function to handle week count changes
 * @property {(weekId: number) => void} onRemoveWeek - Callback function to handle week removal
 * @property {(weekId: number, direction: "up" | "down") => void} onMoveWeek - Callback function to handle week reordering
 */
interface WeekManagementProps {
  weeks: number;
  onWeeksChange: (weeks: number) => void;
  onRemoveWeek: (weekId: number) => void;
  onMoveWeek: (weekId: number, direction: "up" | "down") => void;
}

/**
 * WeekManagement Component
 *
 * A component for managing the number of weeks in a training plan and their order.
 * Features:
 * - Add/remove weeks from the plan
 * - Reorder weeks using up/down buttons
 * - Input field for direct week count modification
 * - Visual representation of week management controls
 *
 * The component provides three main functionalities:
 * 1. Week Count Management:
 *    - Input field for direct week count modification
 *    - Add/remove week buttons
 * 2. Week Reordering:
 *    - Up/down buttons for each week
 *    - Visual indicators for week position
 * 3. Week Removal:
 *    - Delete button for each week
 *    - Confirmation handling
 *
 * @component
 * @param {WeekManagementProps} props - The props for the WeekManagement component
 * @returns {JSX.Element} A card containing week management controls
 */
export function WeekManagement({
  weeks,
  onWeeksChange,
  onRemoveWeek,
  onMoveWeek,
}: WeekManagementProps) {
  // State for managing the week count input field
  const [weekInput, setWeekInput] = useState(weeks.toString());

  /**
   * Handles changes to the week count input field
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input
   */
  const handleWeekInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeekInput(value);
    const numWeeks = parseInt(value, 10);
    if (!isNaN(numWeeks) && numWeeks > 0) {
      onWeeksChange(numWeeks);
    }
  };

  /**
   * Handles adding a new week to the plan
   */
  const handleAddWeek = () => {
    const newWeeks = weeks + 1;
    setWeekInput(newWeeks.toString());
    onWeeksChange(newWeeks);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Week Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Week Count Input Section */}
          <div className="space-y-2">
            <Label htmlFor="weeks">Number of Weeks</Label>
            <div className="flex items-center gap-2">
              <Input
                id="weeks"
                type="number"
                min="1"
                value={weekInput}
                onChange={handleWeekInputChange}
                className="w-24"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddWeek}
                title="Add Week"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week List Section */}
          <div className="space-y-2">
            <Label>Week Order</Label>
            <div className="space-y-2">
              {Array.from({ length: weeks }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <span>Week {index + 1}</span>
                  <div className="flex items-center gap-2">
                    {/* Week Movement Controls */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMoveWeek(index, "up")}
                      disabled={index === 0}
                      title="Move Week Up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMoveWeek(index, "down")}
                      disabled={index === weeks - 1}
                      title="Move Week Down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    {/* Week Removal Control */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveWeek(index)}
                      disabled={weeks === 1}
                      title="Remove Week"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
