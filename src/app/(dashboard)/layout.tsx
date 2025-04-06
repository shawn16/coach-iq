"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  Dumbbell,
  LineChart,
  Menu,
  Settings,
  Trophy,
  Users,
  Flag,
  Zap,
  Info,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * DashboardLayout Component
 *
 * This component serves as the main layout for the dashboard area of the application.
 * It provides a responsive sidebar navigation system with the following features:
 *
 * Key Features:
 * - Responsive sidebar that collapses on tablet-sized screens
 * - Mobile-friendly navigation with slide-out menu
 * - Theme toggle support (light/dark mode)
 * - Organized navigation sections (Planning, Training, Performance, Settings)
 * - Tooltips for collapsed navigation items
 *
 * Layout Structure:
 * - Desktop: Side-by-side sidebar and content
 * - Tablet: Collapsed sidebar with icons only
 * - Mobile: Full-width content with hamburger menu
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation and state management
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // Controls mobile menu state
  const [mounted, setMounted] = useState(false); // Handles hydration
  const [collapsed, setCollapsed] = useState(false); // Controls sidebar collapse state

  // Responsive design hook for tablet detection
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );

  /**
   * Initialization and responsive behavior setup
   * - Sets mounted state for hydration
   * - Handles automatic sidebar collapse on tablet screens
   */
  useEffect(() => {
    setMounted(true);
    setCollapsed(isMediumScreen);
  }, [isMediumScreen]);

  /**
   * Navigation Configuration
   * Defines the structure of the sidebar navigation menu
   * Each section contains:
   * - heading: Section title
   * - links: Array of navigation items with href, label, and themed icons
   */
  const routes = [
    {
      heading: "PLANNING",
      links: [
        {
          href: "/training-plan",
          label: "Training Plan",
          icon: <ClipboardList className="h-5 w-5 text-indigo-500" />,
        },
        {
          href: "/define-progressions",
          label: "Progression Builder",
          icon: <LineChart className="h-5 w-5 text-blue-500" />,
        },
        {
          href: "/training-plan-builder",
          label: "Training Plan Builder",
          icon: <Calendar className="h-5 w-5 text-purple-500" />,
        },
      ],
    },
    {
      heading: "TRAINING",
      links: [
        {
          href: "/create-workout",
          label: "Workout Execution",
          icon: <Dumbbell className="h-5 w-5 text-emerald-500" />,
        },
        {
          href: "/workout-results",
          label: "Workout Results",
          icon: <BarChart3 className="h-5 w-5 text-rose-500" />,
        },
        {
          href: "/athletes",
          label: "Athletes",
          icon: <Users className="h-5 w-5 text-amber-500" />,
        },
        {
          href: "/assistant-coach",
          label: "Assistant Coach",
          icon: <Zap className="h-5 w-5 text-cyan-500" />,
        },
      ],
    },
    {
      heading: "PERFORMANCE",
      links: [
        {
          href: "/team-leaderboard",
          label: "Team Leaderboard",
          icon: <Trophy className="h-5 w-5 text-yellow-500" />,
        },
        {
          href: "/create-race-plan",
          label: "Create Race Plan",
          icon: <Flag className="h-5 w-5 text-red-500" />,
        },
      ],
    },
    {
      heading: "SETTINGS",
      links: [
        {
          href: "/settings",
          label: "Settings",
          icon: <Settings className="h-5 w-5 text-slate-500" />,
        },
        {
          href: "/about",
          label: "About",
          icon: <Info className="h-5 w-5 text-gray-500" />,
        },
      ],
    },
  ];

  /**
   * Handles navigation between pages
   * - Closes the mobile menu if open
   * - Navigates to the specified route
   */
  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-card border-r border-border shadow-sm transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            "border-b border-border flex items-center",
            collapsed ? "justify-center p-4" : "p-6"
          )}
        >
          {collapsed ? (
            // Collapsed state - show only icon
            <div className="bg-indigo-600 text-white p-1 rounded-md">
              <Zap className="h-5 w-5" />
            </div>
          ) : (
            // Expanded state - show full logo
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400"
            >
              <div className="bg-indigo-600 text-white p-1 rounded-md">
                <Zap className="h-5 w-5" />
              </div>
              CoachIQ
            </button>
          )}
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 -right-3 bg-card border border-border rounded-full p-1 shadow-sm hover:bg-muted z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Navigation Menu */}
        <ScrollArea className="flex-1">
          <nav className={cn("grid gap-2 py-4", collapsed ? "px-2" : "px-4")}>
            {routes.map((section, i) => (
              <div key={i} className="mb-6">
                {/* Section Heading - only shown when expanded */}
                {!collapsed && (
                  <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    {section.heading}
                  </h4>
                )}
                {/* Navigation Links */}
                {section.links.map((link, j) => (
                  <TooltipProvider key={j} delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className={cn(
                            "flex items-center gap-3 rounded-md py-2.5 text-sm font-medium transition-colors w-full",
                            collapsed ? "justify-center px-2" : "px-3",
                            pathname === link.href
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-accent/50"
                          )}
                        >
                          {link.icon}
                          {!collapsed && link.label}
                        </button>
                      </TooltipTrigger>
                      {/* Show tooltips only in collapsed state */}
                      {collapsed && (
                        <TooltipContent side="right">
                          {link.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer Section */}
        <div
          className={cn(
            "border-t border-border flex items-center",
            collapsed ? "justify-center p-3" : "justify-between p-4"
          )}
        >
          <ThemeToggle />
          {!collapsed && (
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center h-16 border-b border-border bg-card px-4">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </SheetTrigger>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400"
          >
            <div className="bg-indigo-600 text-white p-1 rounded-md">
              <Zap className="h-5 w-5" />
            </div>
            CoachIQ
          </button>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        <SheetContent
          side="left"
          className="w-64 p-0 bg-card border-r border-border"
        >
          {/* Mobile Menu Header */}
          <div className="p-6 border-b border-border">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
              className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400"
            >
              <div className="bg-indigo-600 text-white p-1 rounded-md">
                <Zap className="h-5 w-5" />
              </div>
              CoachIQ
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
            <nav className="grid gap-2 px-4 py-4">
              {routes.map((section, i) => (
                <div key={i} className="mb-6">
                  <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    {section.heading}
                  </h4>
                  {section.links.map((link, j) => (
                    <button
                      key={j}
                      onClick={() => handleNavigation(link.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors w-full",
                        pathname === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
