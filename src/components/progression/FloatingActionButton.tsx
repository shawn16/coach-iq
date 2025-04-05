"use client";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing components and libraries - Lucide icons
import { Plus } from "lucide-react";

// Define the props interface for the FloatingActionButton component
interface FloatingActionButtonProps {
  onClick: () => void;
}

// Define the FloatingActionButton component
export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  // Define the main return function
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg"
    >
      {/* Render the plus icon */}
      <Plus className="w-6 h-6" />
    </Button>
  );
}
