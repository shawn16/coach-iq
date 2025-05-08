"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the available colors for phases
const phaseColors = [
  {
    name: "Blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
    value: "blue",
  },
  {
    name: "Green",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-300",
    value: "green",
  },
  {
    name: "Red",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
    value: "red",
  },
  {
    name: "Purple",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-300",
    value: "purple",
  },
  {
    name: "Amber",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-800 dark:text-amber-300",
    value: "amber",
  },
  {
    name: "Gray",
    bg: "bg-gray-50 dark:bg-gray-800/40",
    text: "text-gray-800 dark:text-gray-300",
    value: "gray",
  },
  {
    name: "Indigo",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-800 dark:text-indigo-300",
    value: "indigo",
  },
  {
    name: "Pink",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    text: "text-pink-800 dark:text-pink-300",
    value: "pink",
  },
];

export interface PhaseData {
  name: string;
  color: string;
}

interface PhaseEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phaseData: PhaseData) => void;
  initialPhase: string;
  initialColor?: string;
}

export function PhaseEditorDialog({
  isOpen,
  onClose,
  onSave,
  initialPhase,
  initialColor = "gray",
}: PhaseEditorDialogProps) {
  // Find the initial color object based on initialColor or default to gray
  const findInitialColor = () => {
    let colorValue = initialColor;
    
    // Try to determine color from initialPhase if no initialColor is explicitly provided
    if (initialColor === "gray") {
      if (initialPhase.includes("Transition")) colorValue = "blue";
      else if (initialPhase.includes("Summer")) colorValue = "green";
      else if (initialPhase.includes("OFF")) colorValue = "red";
      else if (initialPhase.includes("Relays") || initialPhase.includes("Inv")) colorValue = "purple";
    }
    
    return phaseColors.find(color => color.value === colorValue) || phaseColors[5]; // Default to gray
  };

  const [phaseName, setPhaseName] = useState(initialPhase);
  const [selectedColor, setSelectedColor] = useState(findInitialColor());

  const handleSave = () => {
    onSave({
      name: phaseName,
      color: `${selectedColor.bg} ${selectedColor.text}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Phase</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phase-name" className="text-right">
              Phase Name
            </Label>
            <Input
              id="phase-name"
              value={phaseName}
              onChange={(e) => setPhaseName(e.target.value)}
              className="col-span-3"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Color</Label>
            <div className="col-span-3 grid grid-cols-4 gap-2">
              {phaseColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 rounded-md flex items-center justify-center ${color.bg} ${color.text} ${
                    selectedColor.value === color.value
                      ? "ring-2 ring-offset-2 ring-indigo-500"
                      : ""
                  }`}
                >
                  <span className="text-xs">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Preview</Label>
            <div className="col-span-3">
              <div className={`px-2 py-1 rounded text-xs font-medium inline-block ${selectedColor.bg} ${selectedColor.text}`}>
                {phaseName}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}