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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Check if screen is medium (tablet)
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );

  // Use useEffect to ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);

    // Auto-collapse sidebar on medium screens
    if (isMediumScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMediumScreen]);

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

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // If not mounted yet, show a simple loading state
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop sidebar - collapsed or expanded based on screen size */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div
          className={cn(
            "border-b border-gray-200 dark:border-gray-700 flex items-center",
            collapsed ? "justify-center p-4" : "p-6"
          )}
        >
          {collapsed ? (
            <div className="bg-indigo-600 text-white p-1 rounded-md">
              <Zap className="h-5 w-5" />
            </div>
          ) : (
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

        {/* Collapse/Expand button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          )}
        </button>

        <ScrollArea className="flex-1">
          <nav className={cn("grid gap-2 py-4", collapsed ? "px-2" : "px-4")}>
            {routes.map((section, i) => (
              <div key={i} className="mb-6">
                {!collapsed && (
                  <h4 className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {section.heading}
                  </h4>
                )}
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
                              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                          )}
                        >
                          {link.icon}
                          {!collapsed && link.label}
                        </button>
                      </TooltipTrigger>
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
        <div
          className={cn(
            "border-t border-gray-200 dark:border-gray-700 flex items-center",
            collapsed ? "justify-center p-3" : "justify-between p-4"
          )}
        >
          <ThemeToggle />
          {!collapsed && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              v1.0.0
            </span>
          )}
        </div>
      </div>

      {/* Mobile sidebar with sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="md:hidden flex items-center h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
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
        <SheetContent
          side="left"
          className="w-64 p-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
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
          <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
            <nav className="grid gap-2 px-4 py-4">
              {routes.map((section, i) => (
                <div key={i} className="mb-6">
                  <h4 className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {section.heading}
                  </h4>
                  {section.links.map((link, j) => (
                    <button
                      key={j}
                      onClick={() => handleNavigation(link.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              v1.0.0
            </span>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
