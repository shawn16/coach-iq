"use client";

// Importing components and libraries - useState from react
import { useState } from "react";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing components and libraries - Dialog component from shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Importing components and libraries - Input component from shadcn/ui
import { Input } from "@/components/ui/input";

// Importing components and libraries - Lucide icons
import { Plus } from "lucide-react";

// Define the props interface for the CustomTypeDialog component
interface CustomTypeDialogProps {
  onAdd: (name: string, description: string) => void;
}

// Define the CustomTypeDialog component
export function CustomTypeDialog({ onAdd }: CustomTypeDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  // Define the handleSubmit function
  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), description.trim());
      setName("");
      setDescription("");
      setOpen(false);
    }
  };

  // Define the main return function
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Render the dialog trigger */}
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Type
        </Button>
      </DialogTrigger>
      {/* Render the dialog content */}
      <DialogContent>
        {/* Render the dialog header */}
        <DialogHeader>
          <DialogTitle>Add Custom Workout Type</DialogTitle>
          <DialogDescription>
            Create a new custom workout type with a name and description.
          </DialogDescription>
        </DialogHeader>
        {/* Render the form */}
        <div className="space-y-4 py-4">
          {/* Render the name input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter type name"
            />
          </div>
          {/* Render the description input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter type description"
            />
          </div>
        </div>
        {/* Render the dialog footer */}
        <DialogFooter>
          {/* Render the cancel button */}
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* Render the add type button */}
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Add Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
