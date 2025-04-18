import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coach IQ",
  description: "AI-Powered Training Platform for Coaches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex min-h-screen bg-gray-100 antialiased">
        <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Coach IQ</h2>
          </div>
          <nav className="flex-1 space-y-2">
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1">
              Planning
            </h3>
            <Link
              href="/planning/athletes"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Athletes
            </Link>
            <Link
              href="/planning/training-plan"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Training Plan
            </Link>
            <Link
              href="/planning/plan-builder"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Plan Builder
            </Link>
            <Link
              href="/planning/progression-builder"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Progression Builder
            </Link>

            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mt-4 mb-1">
              Training
            </h3>
            <Link
              href="/training/workout-execution"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Workout Execution
            </Link>
            <Link
              href="/training/workout-results"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Workout Results
            </Link>
            <Link
              href="/training/assistant-coach"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Assistant Coach
            </Link>

            <div className="flex-grow"></div>

            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mt-4 mb-1">
              Application
            </h3>
            <Link
              href="/"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              Settings
            </Link>
            <Link
              href="/about"
              className="block px-2 py-1 rounded hover:bg-gray-700"
            >
              About
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
