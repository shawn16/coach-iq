import { LucideIcon } from "lucide-react";
import { CardHeader, CardTitle } from "./card";

// Props interface for the CardHeaderWithIcon component
interface CardHeaderWithIconProps {
  // The icon to display (must be a Lucide icon component)
  icon: LucideIcon;
  // The title text to display
  title: string;
  // Optional description text
  description?: string;
  // Color theme for the icon background (e.g., 'blue', 'green', 'purple')
  colorTheme?: string;
  // Optional right-aligned content (e.g., buttons)
  rightContent?: React.ReactNode;
}

// A reusable card header component that displays an icon, title, and optional description
export function CardHeaderWithIcon({
  icon: Icon,
  title,
  description,
  colorTheme = "blue",
  rightContent,
}: CardHeaderWithIconProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Icon container with dynamic color theme */}
          <div className={`bg-${colorTheme}-50 dark:bg-${colorTheme}-950/50 p-2 rounded-lg`}>
            <Icon className={`h-6 w-6 text-${colorTheme}-600`} strokeWidth={1.5} />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              {title}
            </CardTitle>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
        {/* Optional right-aligned content */}
        {rightContent}
      </div>
    </CardHeader>
  );
}
