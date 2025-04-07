/**
 * useMediaQuery Hook
 *
 * A React hook that tracks the state of a CSS media query.
 * Useful for responsive design and conditional rendering based on viewport size.
 *
 * Features:
 * - Real-time media query matching
 * - Automatic cleanup of event listeners
 * - Initial state synchronization
 * - Memoized event handler
 *
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean - Whether the media query currently matches
 *
 * Example:
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * return isMobile ? <MobileView /> : <DesktopView />;
 * ```
 */

"use client";

import { useState, useEffect, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  // State to track whether the media query matches
  const [matches, setMatches] = useState(false);

  /**
   * Event handler for media query changes
   *
   * Updates the matches state when the media query condition changes.
   * Memoized with useCallback to prevent unnecessary re-renders.
   *
   * @param e - MediaQueryListEvent containing the new match state
   */
  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  /**
   * Effect to set up and clean up media query listener
   *
   * 1. Creates a MediaQueryList object for the given query
   * 2. Sets initial matches state
   * 3. Adds change event listener
   * 4. Returns cleanup function to remove listener
   *
   * Dependencies:
   * - query: Re-runs if the media query string changes
   * - handleChange: Re-runs if the handler function changes
   */
  useEffect(() => {
    const media = window.matchMedia(query);

    // Update the state initially
    setMatches(media.matches);

    // Add the listener
    media.addEventListener("change", handleChange);

    // Clean up
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [query, handleChange]);

  return matches;
}
