"use client";

import { useState, useEffect, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

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
