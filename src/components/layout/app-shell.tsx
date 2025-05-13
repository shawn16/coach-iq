"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  Settings,
  Users,
  Zap,
  ClipboardCheck,
  BarChart2,
  Info,
  Calendar,
  LineChart,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

const routes = [
  {
    title: "PLANNING",
    items: [
      {
        title: "Athletes",
        href: "/athletes",
        icon: Users,
        iconColor: "text-amber-500",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
      },
      {
        title: "Training Plan",
        href: "/training-plan",
        icon: ClipboardCheck,
        iconColor: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
      },
      {
        title: "Training Plan Builder",
        href: "/training-plan-builder",
        icon: Calendar,
        iconColor: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
      },
      {
        title: "Progression Builder",
        href: "/progression-builder",
        icon: LineChart,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
      },
    ],
  },
  {
    title: "TRAINING",
    items: [
      {
        title: "Workout Execution",
        href: "/workout-execution",
        icon: Dumbbell,
        iconColor: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
      },
      {
        title: "Workout Results",
        href: "/workout-results",
        icon: BarChart2,
        iconColor: "text-rose-500",
        bgColor: "bg-rose-50 dark:bg-rose-900/20",
      },
      {
        title: "Assistant Coach",
        href: "/assistant-coach",
        icon: Zap,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        iconColor: "text-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-800/30",
      },
      {
        title: "About",
        href: "/about",
        icon: Info,
        iconColor: "text-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-800/30",
      },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  // Toggle sidebar between expanded and collapsed states
  const toggleSidebar = useCallback(() => {
    if (isDesktop) {
      setIsExpanded((prev) => !prev);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  }, [isSidebarOpen, isDesktop]);

  // Handle sidebar visibility on route changes and screen size changes
  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [pathname, isDesktop]);

  return (
    <div className="flex min-h-screen w-full flex-col" key="app-shell-wrapper">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 md:px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-purple-50 hover:text-[#6941C6] dark:hover:bg-purple-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 bg-[#6941C6] dark:bg-[#6941C6] rounded-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl md:inline-block text-[#6941C6] dark:text-[#6941C6]">
              Coach IQ
            </span>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 relative">
        {isSidebarOpen && !isDesktop && (
          <div
            className="fixed inset-0 z-10 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Fixed width sidebar without resize functionality */}
        <aside
          className={cn(
            "flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950",
            isDesktop ? "relative h-[calc(100vh-4rem)]" : "fixed h-[calc(100vh-4rem)] mt-16",
            isDesktop ? (isExpanded ? "w-[280px]" : "w-[68px]") : "w-[280px]",
            !isDesktop && !isSidebarOpen && "-translate-x-full"
          )}
        >
          {/* Toggle arrow button */}
          {isDesktop && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="absolute right-0 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-l-full p-1 shadow-sm z-50"
              style={{ transform: "translateX(50%)" }}
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isExpanded ? (
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}

          <ScrollArea className="h-full">
            <nav className={cn("grid gap-1 py-4", !isExpanded ? "px-2" : "px-4")}>
              {routes.map((section, i) => (
                <div key={i} className="mb-6">
                  {isExpanded && (
                    <h4 className="mb-2 px-2 text-sm font-medium text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                    </h4>
                  )}
                  <div className="grid gap-1">
                    {section.items.map((item, j) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={j}
                          href={item.href}
                          title={item.title}
                          className={cn(
                            "flex items-center gap-3 text-sm font-medium transition-colors rounded-md",
                            !isExpanded ? "justify-center px-0 py-2" : "px-3 py-2",
                            isActive
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                          )}
                        >
                          <div
                            className={cn(
                              "flex flex-shrink-0 items-center justify-center rounded-md",
                              item.bgColor,
                              !isExpanded ? "h-10 w-10" : "h-8 w-8"
                            )}
                          >
                            <Icon className={cn("h-5 w-5", item.iconColor)} />
                          </div>
                          {isExpanded && (
                            <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-base">
                              {item.title}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main content with margin that adjusts based on sidebar state */}
        <main
          className={cn(
            "flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-all duration-300 ease-in-out",
            isDesktop ? (isExpanded ? "ml-[280px]" : "ml-[68px]") : "mt-16"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
