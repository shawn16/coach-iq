import { Info } from "lucide-react";
import { Label } from "./label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

// Props interface for the FormFieldWithTooltip component
interface FormFieldWithTooltipProps {
  // Label text for the form field
  label: string;
  // Tooltip text that appears when hovering over the info icon
  tooltipText: string;
  // The form field component (Input, Select, DatePicker, etc.)
  children: React.ReactNode;
  // Optional HTML id for the form field
  id?: string;
  // Whether to show a required asterisk (*)
  required?: boolean;
}

// A reusable form field component that includes a label and tooltip
export function FormFieldWithTooltip({
  label,
  tooltipText,
  children,
  id,
  required,
}: FormFieldWithTooltipProps) {
  return (
    <div>
      {/* Label with optional required asterisk */}
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center gap-1">
        {/* The actual form field (passed as children) */}
        {children}
        {/* Tooltip with info icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-gray-400 cursor-help flex-shrink-0" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
