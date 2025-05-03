"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { AuthStatus } from "@/components/auth-status";

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
  const [sidebarWidth, setSidebarWidth] = useState(280); // Increased default sidebar width
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const startWidthRef = useRef<number>(280);
  const startPosRef = useRef<number>(0);

  // Minimum and maximum sidebar widths
  const MIN_SIDEBAR_WIDTH = 64; // Width when showing only icons
  const MAX_SIDEBAR_WIDTH = 360; // Increased maximum sidebar width

  // Toggle sidebar between collapsed and expanded
  const toggleSidebar = useCallback(() => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);

    // Set appropriate width based on collapsed state
    if (newCollapsed) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    } else {
      // Expand to previous width or default
      const savedWidth =
        typeof window !== "undefined"
          ? window.localStorage.getItem("sidebarExpandedWidth")
          : null;
      setSidebarWidth(savedWidth ? parseInt(savedWidth, 10) : 280);
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sidebarCollapsed", newCollapsed.toString());
    }
  }, [collapsed, MIN_SIDEBAR_WIDTH]);

  // Check if screen is medium (tablet)
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );

  // Use useEffect to ensure the component is mounted before rendering and load saved width
  useEffect(() => {
    setMounted(true);

    // Try to get saved width from localStorage
    if (typeof window !== "undefined") {
      const savedWidth = window.localStorage.getItem("sidebarWidth");
      const savedCollapsed = window.localStorage.getItem("sidebarCollapsed");

      // Auto-collapse sidebar on medium screens
      if (isMediumScreen) {
        setCollapsed(true);
        setSidebarWidth(MIN_SIDEBAR_WIDTH);
      } else {
        // If we have saved values, use them
        if (savedWidth && !isMediumScreen) {
          const width = parseInt(savedWidth, 10);
          setSidebarWidth(width);
          setCollapsed(
            width <= MIN_SIDEBAR_WIDTH + 20 || savedCollapsed === "true"
          );
        } else {
          setCollapsed(false);
          setSidebarWidth(280);
        }
      }
    }
  }, [isMediumScreen, MIN_SIDEBAR_WIDTH]);

  // Use effect to save sidebar width in localStorage when it changes
  useEffect(() => {
    if (mounted && !isResizing && typeof window !== "undefined") {
      // Don't save width during active resizing (wait until released)
      window.localStorage.setItem("sidebarWidth", sidebarWidth.toString());
      window.localStorage.setItem("sidebarCollapsed", collapsed.toString());
    }
  }, [sidebarWidth, collapsed, mounted, isResizing]);

  // Add effect to save expanded width separately when not collapsed
  useEffect(() => {
    if (
      mounted &&
      !collapsed &&
      !isResizing &&
      sidebarWidth > MIN_SIDEBAR_WIDTH &&
      typeof window !== "undefined"
    ) {
      window.localStorage.setItem(
        "sidebarExpandedWidth",
        sidebarWidth.toString()
      );
    }
  }, [mounted, collapsed, isResizing, sidebarWidth, MIN_SIDEBAR_WIDTH]);

  // Add effect to handle route changes
  useEffect(() => {
    // When route changes, ensure we're maintaining sidebar state
    if (mounted && typeof window !== "undefined") {
      const savedWidth = window.localStorage.getItem("sidebarWidth");
      if (savedWidth) {
        const width = parseInt(savedWidth, 10);
        // Only update if significantly different to avoid unnecessary rerenders
        if (Math.abs(width - sidebarWidth) > 10) {
          setSidebarWidth(width);
        }
      }
    }
  }, [pathname, mounted, sidebarWidth]);

  // Console log for debugging
  useEffect(() => {
    if (mounted && sidebarRef.current) {
      console.log("Sidebar ref:", sidebarRef.current);
      console.log("Current width:", sidebarWidth);
      console.log("Collapsed state:", collapsed);
    }
  }, [mounted, sidebarWidth, collapsed]);

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
      <aside
        ref={sidebarRef}
        style={{
          width: `${sidebarWidth}px`,
          minWidth: collapsed ? `${MIN_SIDEBAR_WIDTH}px` : undefined,
          transition: isResizing ? "none" : "width 0.2s ease-out",
          flex: "none", // Prevent flex resizing
        }}
        className={cn(
          "hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm relative",
          isResizing && "transition-none"
        )}
      >
        <div
          className={cn(
            "border-b border-gray-200 dark:border-gray-700 flex items-center",
            collapsed ? "justify-center p-4" : "px-6 py-3"
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
          onClick={toggleSidebar}
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
                              ? "relative after:absolute after:inset-0 after:rounded-md after:bg-indigo-50 after:z-[-1] dark:after:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                          )}
                        >
                          {link.icon}
                          {sidebarWidth > MIN_SIDEBAR_WIDTH + 20 && (
                            <span className="truncate">{link.label}</span>
                          )}
                        </button>
                      </TooltipTrigger>
                      {sidebarWidth <= MIN_SIDEBAR_WIDTH + 20 && (
                        <TooltipContent side="right">{link.label}</TooltipContent>
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
        {/* Simple, reliable resize handle */}
        <div 
          className="absolute top-0 right-0 w-4 h-full cursor-ew-resize z-20"
          onMouseDown={(e) => {
            e.preventDefault();
            
            // Get initial mouse position
            const initialX = e.clientX;
            const initialWidth = sidebarWidth;
            
            function onMouseMove(moveEvent) {
              // Calculate how far the mouse has moved
              const newWidth = initialWidth + (moveEvent.clientX - initialX);
              
              // Apply constraints
              const constrainedWidth = Math.max(
                MIN_SIDEBAR_WIDTH, 
                Math.min(MAX_SIDEBAR_WIDTH, newWidth)
              );
              
              // Update width directly
              setSidebarWidth(constrainedWidth);
              
              // Update collapsed state
              if (constrainedWidth <= MIN_SIDEBAR_WIDTH + 20) {
                setCollapsed(true);
              } else {
                setCollapsed(false);
              }
            }
            
            function onMouseUp() {
              // Clean up
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
              
              // Save final width
              if (typeof window !== 'undefined') {
                window.localStorage.setItem('sidebarWidth', sidebarWidth.toString());
                if (sidebarWidth > MIN_SIDEBAR_WIDTH + 20) {
                  window.localStorage.setItem('sidebarExpandedWidth', sidebarWidth.toString());
                }
              }
            }
            
            // Add listeners directly to document
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        >
          <div className="w-[3px] h-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-500 dark:hover:bg-indigo-400"></div>
        </div>
      </aside>

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
                          ? "relative after:absolute after:inset-0 after:rounded-md after:bg-indigo-50 after:z-[-1] dark:after:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                      )}
                    >
                      {link.icon}
                      <span className="truncate">{link.label}</span>
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

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header bar */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6 py-3 shadow-sm">
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* Mobile Sidebar Content - Reuse logic? */}
                {/* TODO: Populate mobile sidebar nav */}
                <div className="p-4">Mobile Nav Here</div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Spacer or Left Aligned Items */}
          <div className="flex-1"></div>

          {/* Right Aligned Items (Theme Toggle, Auth Status) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthStatus />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
