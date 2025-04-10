/**
 * Athlete Hooks
 *
 * Custom hooks for managing athlete data:
 * - useAthletes: Fetch and filter athletes
 * - useCreateAthlete: Create new athletes
 * - useUpdateAthlete: Update existing athletes
 * - useDeleteAthlete: Delete athletes
 */

import { useState, useCallback } from "react";
import { Athlete } from "../types";

interface UseAthletesOptions {
  searchQuery?: string;
  gradeFilter?: string;
  activeFilter?: string;
}

interface UseAthletesResult {
  athletes: Athlete[];
  loading: boolean;
  error: string | null;
  fetchAthletes: () => Promise<void>;
}

interface UseCreateAthleteResult {
  createAthlete: (
    athleteData: Omit<Athlete, "id" | "coach_id" | "created_at" | "updated_at">
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for fetching and managing athletes
 *
 * @param searchQuery - Optional search query for filtering by name
 * @param gradeFilter - Optional grade filter
 * @param activeFilter - Optional active status filter
 * @returns Object containing athletes, loading state, and error
 */
export function useAthletes({
  searchQuery,
  gradeFilter,
  activeFilter,
}: UseAthletesOptions = {}): UseAthletesResult {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAthletes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("search", searchQuery);
      if (gradeFilter) queryParams.append("grade", gradeFilter);
      if (activeFilter) queryParams.append("active", activeFilter);

      const response = await fetch(`/api/athletes?${queryParams.toString()}`);
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please sign in to view athletes");
        }
        throw new Error("Failed to fetch athletes");
      }

      const data = await response.json();
      setAthletes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, gradeFilter, activeFilter]);

  return { athletes, loading, error, fetchAthletes };
}

/**
 * Hook for creating new athletes
 *
 * @returns Object containing create function and loading/error states
 */
export function useCreateAthlete(): UseCreateAthleteResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAthlete = async (
    athleteData: Omit<Athlete, "id" | "coach_id" | "created_at" | "updated_at">
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(athleteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create athlete");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAthlete, loading, error };
}

/**
 * Hook for updating existing athletes
 *
 * @returns Object containing update function and loading/error states
 */
export function useUpdateAthlete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAthlete = useCallback(
    async (id: number, athleteData: Partial<Athlete>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/athletes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(athleteData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update athlete: ${response.statusText}`);
        }

        return await response.json();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update athlete"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateAthlete, loading, error };
}

/**
 * Hook for deleting athletes
 *
 * @returns Object containing delete function and loading/error states
 */
export function useDeleteAthlete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAthlete = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/athletes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete athlete: ${response.statusText}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete athlete");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteAthlete, loading, error };
}
