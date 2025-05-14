// This file contains shared utility functions and constants used across the training modules.

// Define a mapping for workout types to icon names
export const workoutTypeToIconMap: { [key: string]: string } = {
  "Tempo Run": "Gauge",
  "Intervals": "Zap", // Assuming "Intervals" is a possible type
  "Fartlek": "Shuffle", // Example
  "Easy Run": "Footprints", // Example
  "Long Run": "Route", // Example
  "Recovery Run": "Bed", // Example
  "Strength Training": "Dumbbell", // Example
  "Cross Training": "Bike", // Example
  "Race": "Trophy", // Example
  "Other": "Activity", // Default for other types
  // Add more mappings as needed
};

/**
 * Helper function to format dates to match the expected format in the UI
 * Converts Date objects to "Month Day, Year" format (e.g., "Jan 15, 2023")
 *
 * @param date - The Date object to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
