/**
 * Providers Component
 *
 * A wrapper component that provides essential context providers to the application.
 * This component combines multiple providers to handle authentication and theming.
 * It must be marked as a client component due to its interactive nature.
 *
 * Key Features:
 * - Authentication state management via NextAuth
 * - Theme management (light/dark/system)
 * - Client-side interactivity support
 *
 * Provider Order:
 * 1. SessionProvider (outermost) - Handles auth state
 * 2. ThemeProvider (inner) - Manages theme preferences
 */

"use client"; // Mark as client component for interactive features

import { SessionProvider } from "next-auth/react"; // Authentication context provider
import { ThemeProvider } from "@/components/theme-provider"; // Theme management provider

/**
 * Providers Component
 *
 * Wraps the application with necessary context providers in the correct order.
 * The order of providers is important as some providers may depend on others.
 *
 * Configuration:
 * - SessionProvider: Manages authentication state across the app
 * - ThemeProvider:
 *   - Uses CSS classes for theme application
 *   - Defaults to system theme preference
 *   - Enables system theme detection
 *   - Disables transitions on theme change to prevent flicker
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be wrapped with providers
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class" // Use CSS classes for theme application
        defaultTheme="system" // Default to system theme preference
        enableSystem // Enable system theme detection
        disableTransitionOnChange // Prevent transition flicker on theme change
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
