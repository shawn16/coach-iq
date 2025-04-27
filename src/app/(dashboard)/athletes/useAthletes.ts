// The main purpose of the `useAthletes` file is to provide a custom React hook for managing and fetching athlete data from an API.
// It encapsulates the logic for handling API requests, managing loading states, and error handling, making it reusable across different components.
// The hook uses TypeScript to ensure type safety and consistency in the data structure, which is particularly useful for maintaining reliable and predictable code.
// It also demonstrates best practices for working with asynchronous operations and React state management.

import { useState, useEffect } from "react"; // React hooks for managing state and side effects

// Define the structure of an Athlete object using TypeScript's interface feature.
// This helps ensure that the data we work with has a consistent shape.
interface Athlete {
  id: string; // Unique identifier for the athlete
  first_name: string; // Athlete's first name
  last_name: string; // Athlete's last name
  birthday: string; // Athlete's date of birth
  grade: number; // Athlete's grade level (e.g., school grade)
  time_1600m: number; // Athlete's time for a 1600m run (in seconds or minutes)
  projected_5k?: string; // Optional: Projected time for a 5k run
  projected_3200m?: string; // Optional: Projected time for a 3200m run
  projected_800m?: string; // Optional: Projected time for an 800m run
}

// Custom React hook to manage and fetch athlete data from an API.
// Hooks are reusable functions that encapsulate logic and state management.
export function useAthletes() {
  // State to store the list of athletes fetched from the API.
  const [athletes, setAthletes] = useState<Athlete[]>([]); // Initially, the list is empty.

  // State to track whether the data is currently being loaded.
  const [isLoading, setIsLoading] = useState(true); // Starts as true because we fetch data on mount.

  // State to store any error messages that occur during the fetch process.
  const [error, setError] = useState<string | null>(null); // Null means no error initially.

  // useEffect is a React hook that runs side effects in functional components.
  // Here, it ensures that the fetchAthletes function is called when the component using this hook mounts.
  useEffect(() => {
    fetchAthletes(); // Fetch athletes when the hook is used.
  }, []); // Empty dependency array means this runs only once, like componentDidMount.

  // Function to fetch athlete data from the API.
  // This function is asynchronous because it involves network requests.
  const fetchAthletes = async () => {
    try {
      setIsLoading(true); // Indicate that loading is in progress.

      // Make a GET request to the API endpoint for athletes.
      const response = await fetch("/api/athletes");

      // Check if the response status is not OK (e.g., 404 or 500).
      if (!response.ok) {
        // Attempt to parse the error message from the response.
        const errorData = await response.json().catch(() => ({})); // Catch ensures no crash if JSON parsing fails.
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}` // Use the error message or fallback to status.
        );
      }

      // Parse the JSON data from the response.
      const data = await response.json();

      // Check if the data is an array (as expected).
      if (Array.isArray(data)) {
        setAthletes(data); // Update the state with the fetched athletes.
        setError(null); // Clear any previous errors.
      } else {
        // Log an error if the data format is unexpected.
        console.error("API did not return an array:", data);
        setError("Received invalid data format from server."); // Set an error message.
        setAthletes([]); // Clear the athletes list to avoid displaying invalid data.
      }
    } catch (err) {
      // Handle any errors that occur during the fetch process.
      console.error("Failed to fetch athletes:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred" // Provide a user-friendly error message.
      );
      setAthletes([]); // Clear the athletes list in case of an error.
    } finally {
      setIsLoading(false); // Indicate that loading is complete, regardless of success or failure.
    }
  };

  // Return the state and functions so they can be used in components.
  return { athletes, isLoading, error, fetchAthletes }; // This makes the hook reusable.

  // Next Step Suggestion: Add caching or pagination to optimize data fetching for large datasets.
  // Caching can reduce redundant API calls, and pagination can improve performance for large datasets.
}

// Common Beginner Mistake: Forgetting to handle the case where the API returns an unexpected data format.
// Always validate the data before using it to avoid runtime errors.