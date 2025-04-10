/**
 * Root Layout Component
 *
 * This is the top-level layout component that wraps the entire application.
 * It provides the foundational structure and essential providers for all pages.
 *
 * Key Features:
 * - Global styles and font configuration
 * - Theme provider setup for light/dark mode
 * - Authentication provider integration
 * - Responsive container layout
 * - SEO metadata configuration
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Google's Inter font for consistent typography
import "./globals.css"; // Global styles including Tailwind CSS utilities

// Configure the Inter font with Latin character subset
// This enables font optimization and ensures consistent typography across the app
const inter = Inter({ subsets: ["latin"] });

/**
 * Application Metadata
 *
 * Defines SEO-related metadata for the application
 * These values are used by Next.js for generating appropriate meta tags
 */
export const metadata: Metadata = {
  title: "CoachIQ",
  description: "Athlete management platform for coaches",
};

/**
 * RootLayout Component
 *
 * The root layout component that:
 * 1. Sets up the basic HTML structure
 * 2. Configures theme support
 * 3. Handles font loading
 * 4. Provides authentication context
 * 5. Ensures consistent layout across all pages
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import "./globals.css";
