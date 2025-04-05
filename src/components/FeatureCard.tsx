import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the props interface for the FeatureCard component
interface FeatureCardProps {
  title: string;
  description: string;
  content: string;
  icon: LucideIcon;
  iconBg: string;
  href: string;
  buttonText: string;
  buttonClass: string;
}

// FeatureCard component - A reusable card component for displaying features
export function FeatureCard({
  title,
  description,
  content,
  icon: Icon,
  iconBg,
  href,
  buttonText,
  buttonClass,
}: FeatureCardProps) {
  return (
    // Card container with hover effects and transitions
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex flex-col h-full">
      {/* Card header with icon and title */}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {/* Icon container with background color */}
          <div className={`${iconBg} p-2 rounded-md`}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-gray-900 dark:text-gray-50">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Card content with main text */}
      <CardContent className="flex-grow">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </CardContent>

      {/* Card footer with action button */}
      <CardFooter className="flex justify-center pt-4">
        <Button asChild className={cn("w-40", buttonClass)}>
          <Link href={href}>{buttonText} →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
