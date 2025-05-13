"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
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
  Users,
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
import { AuthStatus } from "@/components/auth-status";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Toggle sidebar between collapsed and expanded states
  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
    
    // Save preference to localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sidebarExpanded", (!isExpanded).toString());
    }
  }, [isExpanded]);

  // Use useEffect to load saved state and set mounted
  useEffect(() => {
    setMounted(true);

    // Load saved state
    if (typeof window !== "undefined") {
      const savedExpanded = window.localStorage.getItem("sidebarExpanded");
      
      if (savedExpanded !== null) {
        setIsExpanded(savedExpanded === "true");
      } else {
        // Default expanded on large screens, collapsed on medium/small
        setIsExpanded(isDesktop);
      }
    }
  }, [isDesktop]);
  
  // Use effect to close mobile sidebar on route changes
  useEffect(() => {
    if (!isDesktop) {
      setOpen(false);
    }
  }, [pathname, isDesktop]);

  // Update the routes array to move Athletes to the PLANNING section
  const routes = [
    {
      heading: "PLANNING",
      links: [
        {
          href: "/athletes",
          label: "Athletes",
          icon: <Users className="h-5 w-5 text-amber-500" />,
        },
        {
          href: "/training-plan",
          label: "Training Plan",
          icon: <ClipboardList className="h-5 w-5 text-indigo-500" />,
        },
        {
          href: "/training-plan-builder",
          label: "Training Plan Builder",
          icon: <Calendar className="h-5 w-5 text-purple-500" />,
        },
        {
          href: "/define-progressions",
          label: "Progression Builder",
          icon: <LineChart className="h-5 w-5 text-blue-500" />,
        },
      ],
    },
    {
      heading: "TRAINING",
      links: [
        {
          href: "/workout-execution",
          label: "Workout Execution",
          icon: <Dumbbell className="h-5 w-5 text-emerald-500" />,
        },
        {
          href: "/workout-results",
          label: "Workout Results",
          icon: <BarChart3 className="h-5 w-5 text-rose-500" />,
        },
        {
          href: "/assistant-coach",
          label: "Assistant Coach",
          icon: <Zap className="h-5 w-5 text-cyan-500" />,
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

  // Don't render until component is mounted to prevent hydration issues
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-20 hidden border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 md:flex md:flex-col",
          isExpanded ? "w-[240px]" : "w-[64px]"
        )}
      >
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-l-full p-1 shadow-sm z-50"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {/* Logo and title */}
        <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-700">
              <Zap className="h-5 w-5 text-white" />
            </div>
            {isExpanded && (
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Coach IQ
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-2">
          <nav className="grid gap-4">
            {routes.map((section, i) => (
              <div key={i} className="grid gap-1">
                {isExpanded && (
                  <h4 className="mb-1 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {section.heading}
                  </h4>
                )}
                {section.links.map((link, j) => {
                  const isActive = pathname === link.href;
                  return isExpanded ? (
                    <Button
                      key={j}
                      asChild
                      variant="ghost"
                      className={cn(
                        "justify-start gap-2 px-3 py-2 text-gray-700 dark:text-gray-300",
                        isActive &&
                          "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
                      )}
                    >
                      <a href={link.href}>
                        {link.icon}
                        <span>{link.label}</span>
                      </a>
                    </Button>
                  ) : (
                    <TooltipProvider key={j}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-10 w-10 text-gray-700 dark:text-gray-300",
                              isActive &&
                                "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
                            )}
                          >
                            <a href={link.href}>{link.icon}</a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{link.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* User info */}
        <div className="mt-auto flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            {isExpanded && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  <AuthStatus />
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute left-4 top-3.5 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          {/* Mobile sidebar content */}
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-700">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Coach IQ</span>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
            <nav className="grid gap-2 p-4">
              {routes.map((section, i) => (
                <div key={i} className="grid gap-1">
                  <h4 className="mb-1 px-2 text-xs font-semibold text-gray-500">
                    {section.heading}
                  </h4>
                  {section.links.map((link, j) => {
                    const isActive = pathname === link.href;
                    return (
                      <Button
                        key={j}
                        asChild
                        variant="ghost"
                        className={cn(
                          "justify-start gap-2",
                          isActive && "bg-gray-100 dark:bg-gray-800",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <a href={link.href}>
                          {link.icon}
                          <span>{link.label}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-auto", 
        isDesktop ? (isExpanded ? "md:pl-[240px]" : "md:pl-[64px]") : ""
      )}>
        <div className="flex min-h-screen flex-col">
          {/* Top header for mobile */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-900 px-4 md:px-6 md:h-16">
            <div className="md:hidden" />
            <div className="ml-auto flex items-center gap-2">
              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
