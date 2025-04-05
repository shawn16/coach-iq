"use client";

// Importing components and libraries - useState from react
import { useState } from "react";

// Importing components and libraries - Button component from shadcn/ui
import { Button } from "@/components/ui/button";

// Importing types - ProgressionTemplate type from @/types/progression
import { ProgressionTemplate } from "@/types/progression";

// Importing components and libraries - ProgressionTemplateCard component
import { ProgressionTemplateCard } from "@/components/progression/ProgressionTemplateCard";

// Importing components and libraries - ProgressionForm component
import { ProgressionForm } from "@/components/progression/ProgressionForm";

// Importing components and libraries - CustomTypeDialog component
import { CustomTypeDialog } from "@/components/progression/CustomTypeDialog";
import { FloatingActionButton } from "@/components/progression/FloatingActionButton";

// Importing custom hook - useProgressionTemplates from @/hooks/useProgressionTemplates
import { useProgressionTemplates } from "@/hooks/useProgressionTemplates";

// Define the ProgressionsPage component
export default function ProgressionsPage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProgressionTemplate | null>(null);

  // Define the state for the custom type dialog
  const [isCustomTypeDialogOpen, setIsCustomTypeDialogOpen] = useState(false);

  // Define the state for the form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Define the useProgressionTemplates hook
  const { templates, addTemplate, updateTemplate } = useProgressionTemplates();

  // Define the handleAddTemplate function
  const handleAddTemplate = () => {
    setIsFormOpen(true);
    setSelectedTemplate(null);
  };

  // Define the handleEditTemplate function
  const handleEditTemplate = (template: ProgressionTemplate) => {
    setSelectedTemplate(template);
    setIsFormOpen(true);
  };

  // Define the handleSaveTemplate function
  const handleSaveTemplate = (template: ProgressionTemplate) => {
    if (selectedTemplate) {
      updateTemplate(template.id, template);
    } else {
      addTemplate(template);
    }
    setIsFormOpen(false);
    setSelectedTemplate(null);
  };

  // Define the handleAddCustomType function
  const handleAddCustomType = (name: string, description: string) => {
    const newTemplate: ProgressionTemplate = {
      id: Date.now().toString(),
      name,
      type: "custom",
      metric: "custom",
      duration: 0,
      description,
      pattern: [],
    };
    addTemplate(newTemplate);
    setIsCustomTypeDialogOpen(false);
  };

  // Define the main return function
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Progression Templates</h1>
        <Button
          onClick={() => setIsCustomTypeDialogOpen(true)}
          variant="outline"
        >
          Add Custom Type
        </Button>
      </div>

      {/* Render the templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <ProgressionTemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={() => handleEditTemplate(template)}
          />
        ))}
      </div>

      {/* Render the form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
            <ProgressionForm
              template={
                selectedTemplate || {
                  id: "",
                  name: "",
                  type: "",
                  metric: "",
                  duration: 0,
                  description: "",
                  pattern: [],
                }
              }
              onSave={handleSaveTemplate}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedTemplate(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Render the custom type dialog */}
      <CustomTypeDialog
        isOpen={isCustomTypeDialogOpen}
        onClose={() => setIsCustomTypeDialogOpen(false)}
        onSave={handleAddCustomType}
      />

      {/* Render the floating action button */}
      <FloatingActionButton onClick={handleAddTemplate} />
    </div>
  );
}
