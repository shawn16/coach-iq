"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Users, ClipboardCheck, Calendar, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SimpleAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  console.log("SimpleAppShell rendering with pathname:", pathname);

  const navItems = [
    { name: "Athletes", href: "/athletes", icon: Users },
    { name: "Training Plan", href: "/training-plan", icon: ClipboardCheck },
    { name: "Plan Builder", href: "/plan-builder", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 bg-[#6941C6] rounded-md">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl md:inline-block text-[#6941C6]">
            Coach IQ
          </span>
        </Link>
        <div className="flex-1"></div>
        <ThemeToggle />
      </header>

      <div className="flex flex-1">
        {/* Fixed width sidebar */}
        <aside className="fixed inset-y-0 left-0 z-20 mt-16 w-64 border-r bg-white overflow-y-auto hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content with margin to account for sidebar */}
        <main className="flex-1 p-4 md:p-6 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
