"use client";

// Importing components and libraries
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardList, Users, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/FeatureCard";
import { Carousel } from "@/components/Carousel";
import {
  buttonBaseClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/styles/button";

// Main component for the home page
export default function Home() {
  // Card data - defines the content and styling for each feature card
  const cards = [
    {
      title: "Training Plan",
      description: "Create and manage training plans for your athletes",
      content:
        "Develop structured training programs, apply progressions, and track workouts over time.",
      icon: ClipboardList,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      href: "/training-plan",
      buttonText: "View Plans",
    },
    {
      title: "Athletes",
      description: "Manage athlete profiles and track their progress",
      content:
        "Maintain detailed athlete records, set goals, and analyze performance metrics.",
      icon: Users,
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      href: "/team-pace-chart",
      buttonText: "View Athletes",
    },
    {
      title: "Workout Results",
      description: "Record and analyze workout performance data",
      content:
        "Capture detailed workout metrics, view trends, and gain insights from AI-powered analysis.",
      icon: BarChart3,
      iconBg: "bg-rose-100 dark:bg-rose-900/50",
      href: "/workout-results",
      buttonText: "View Results",
    },
  ];

  // Main render function
  return (
    <div className="container mx-auto p-6">
      {/* Welcome section with increased bottom margin */}
      <div className="flex flex-col items-start gap-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome to CoachIQ
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your all-in-one platform for training management and athlete
          development
        </p>
      </div>

      {/* Subtle divider */}
      <div className="w-full h-px bg-gray-200 dark:bg-gray-700 opacity-60 mb-10"></div>

      {/* Mobile Carousel View (< 768px) - Shows cards in a carousel for mobile devices */}
      <div className="md:hidden">
        <Carousel
          items={cards.map((card) => (
            <FeatureCard
              key={card.title}
              {...card}
              buttonClass={cn(buttonBaseClass, primaryButtonClass)}
            />
          ))}
        />
      </div>

      {/* Tablet View (2-column grid) - Shows cards in a 2-column grid for tablets */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 sm:gap-8">
        {cards.map((card) => (
          <FeatureCard
            key={card.title}
            {...card}
            buttonClass={cn(buttonBaseClass, primaryButtonClass)}
          />
        ))}
      </div>

      {/* Desktop View (3-column grid) - Shows cards in a 3-column grid for desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card) => (
          <FeatureCard
            key={card.title}
            {...card}
            buttonClass={cn(buttonBaseClass, primaryButtonClass)}
          />
        ))}
      </div>

      {/* Assistant Coach section with adjusted visual prominence */}
      <div className="mt-16 p-6 bg-gradient-to-r from-indigo-500/90 to-purple-600/90 rounded-lg shadow-sm hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-600/90 hover:to-purple-700/90 transition-all duration-300 cursor-pointer text-white">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-5 w-5" />
          <h2 className="text-xl font-semibold">AI Assistant Coach</h2>
        </div>
        <p className="text-indigo-100 mb-4">
          Get personalized training recommendations and insights powered by AI
        </p>
        <Button
          asChild
          className={cn(
            "w-full sm:w-auto",
            buttonBaseClass,
            secondaryButtonClass,
            "!text-white !border-white hover:!bg-white/10"
          )}
        >
          <Link href="/assistant-coach">Try Assistant Coach →</Link>
        </Button>
      </div>
    </div>
  );
}
