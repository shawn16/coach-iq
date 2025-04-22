"use client";

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
import {
  ClipboardList,
  Users,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  // State for carousel on mobile
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Button style constants for consistency
  const primaryButtonClass =
    "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent font-medium transition-colors";
  const secondaryButtonClass =
    "bg-transparent hover:bg-indigo-50 text-indigo-600 border-2 border-indigo-600 font-medium transition-all dark:hover:bg-indigo-950";
  const buttonBaseClass =
    "h-10 px-4 py-2 rounded-md inline-flex items-center justify-center";

  // Card data
  const cards = [
    {
      title: "Training Plan",
      description: "Create and manage training plans for your athletes",
      content:
        "Develop structured training programs, apply progressions, and track workouts over time.",
      icon: (
        <ClipboardList className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      ),
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      href: "/training-plan",
      buttonText: "View Plans",
    },
    {
      title: "Athletes",
      description: "Manage athlete profiles and track their progress",
      content:
        "Maintain detailed athlete records, set goals, and analyze performance metrics.",
      icon: <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      href: "/athletes",
      buttonText: "View Athletes",
    },
    {
      title: "Workout Results",
      description: "Record and analyze workout performance data",
      content:
        "Capture detailed workout metrics, view trends, and gain insights from AI-powered analysis.",
      icon: <BarChart3 className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      iconBg: "bg-rose-100 dark:bg-rose-900/50",
      href: "/workout-results",
      buttonText: "View Results",
    },
  ];

  // Handle carousel navigation
  const nextCard = () => {
    setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

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

      {/* Mobile Carousel View (< 768px) */}
      <div className="md:hidden">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeCardIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex flex-col h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`${card.iconBg} p-2 rounded-md`}>
                          {card.icon}
                        </div>
                        <CardTitle className="text-gray-900 dark:text-gray-50">
                          {card.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 dark:text-gray-300">
                        {card.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center pt-4">
                      <Button
                        asChild
                        className={cn(
                          "w-40",
                          buttonBaseClass,
                          primaryButtonClass
                        )}
                      >
                        <Link href={card.href}>{card.buttonText} →</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevCard}
              className="rounded-full border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCardIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeCardIndex === index
                      ? "bg-indigo-600 dark:bg-indigo-400"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-indigo-400 dark:hover:bg-indigo-500"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextCard}
              className="rounded-full border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tablet View (2-column grid) */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 sm:gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex flex-col"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${card.iconBg} p-2 rounded-md`}>
                  {card.icon}
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-50">
                  {card.title}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 dark:text-gray-300">{card.content}</p>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Button
                asChild
                className={cn("w-40", buttonBaseClass, primaryButtonClass)}
              >
                <Link href={card.href}>{card.buttonText} →</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Desktop View (3-column grid) */}
      <div className="hidden lg:grid grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex flex-col"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${card.iconBg} p-2 rounded-md`}>
                  {card.icon}
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-50">
                  {card.title}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 dark:text-gray-300">{card.content}</p>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Button
                asChild
                className={cn("w-40", buttonBaseClass, primaryButtonClass)}
              >
                <Link href={card.href}>{card.buttonText} →</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Assistant Coach section with adjusted visual prominence */}
      <div className="mt-16 p-6 bg-gradient-to-r from-indigo-500/90 to-purple-600/90 rounded-lg shadow-sm hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-600/90 hover:to-purple-700/90 transition-all duration-300 cursor-pointer text-white">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Assistant Coach</h2>
        </div>
        <p className="text-sm mb-4">
          Your AI-powered coaching assistant. Get personalized training
          recommendations, analyze workout data, and optimize your coaching
          strategy.
        </p>
        <Button
          asChild
          className={cn(
            "w-40",
            buttonBaseClass,
            secondaryButtonClass,
            "bg-transparent text-white border-white hover:bg-white/20 hover:text-white"
          )}
        >
          <Link href="/assistant-coach">Try Assistant Coach →</Link>
        </Button>
      </div>
    </div>
  );
}
