import { useState, useEffect } from "react";

// Importing components and libraries - ProgressionTemplate type from @/types/progression
import { ProgressionTemplate } from "@/types/progression";

// Define the STORAGE_KEY constant
const STORAGE_KEY = "progressionTemplates";

// Define the useProgressionTemplates hook
export function useProgressionTemplates() {
  const [templates, setTemplates] = useState<ProgressionTemplate[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Define the useEffect hook
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  }, [templates]);

  // Define the addTemplate function
  const addTemplate = (template: ProgressionTemplate) => {
    setTemplates([...templates, template]);
  };

  // Define the updateTemplate function
  const updateTemplate = (id: string, template: ProgressionTemplate) => {
    setTemplates(templates.map((t) => (t.id === id ? template : t)));
  };

  // Define the deleteTemplate function
  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  // Define the getTemplate function
  const getTemplate = (id: string) => {
    return templates.find((t) => t.id === id);
  };

  // Define the getTemplatesByType function
  const getTemplatesByType = (type: string) => {
    return templates.filter((t) => t.type === type);
  };

  // Define the getTemplatesByMetric function
  const getTemplatesByMetric = (metric: string) => {
    return templates.filter((t) => t.metric === metric);
  };

  // Define the getTemplatesByDuration function
  const getTemplatesByDuration = (duration: number) => {
    return templates.filter((t) => t.duration === duration);
  };

  // Define the main return function
  return {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    getTemplatesByType,
    getTemplatesByMetric,
    getTemplatesByDuration,
  };
}
