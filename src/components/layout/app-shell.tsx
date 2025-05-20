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
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Training Plan",
        href: "/training-plan",
        icon: ClipboardCheck,
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Training Plan Builder",
        href: "/training-plan-builder",
        icon: Calendar,
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Progression Builder",
        href: "/progression-builder",
        icon: LineChart,
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
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
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Workout Results",
        href: "/workout-results",
        icon: BarChart2,
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Assistant Coach",
        href: "/assistant-coach",
        icon: Zap,
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
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
        iconColor: "text-muted-foreground",
        bgColor: "bg-muted/50",
      },
      {
        title: "About",
        href: "/about",
        icon: Info,
        iconColor: "text-muted-foreground",
        bgColor: "bg-muted/50",
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
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
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
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              {routes.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-1">
                  {isExpanded && section.title && (
                    <h3 className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <div
                            className={cn(
                              "mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md",
                              isActive ? item.bgColor : "bg-muted/50"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-4 w-4",
                                isActive ? item.iconColor : "text-muted-foreground"
                              )}
                            />
                          </div>
                          {isExpanded && <span className="truncate">{item.title}</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
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
