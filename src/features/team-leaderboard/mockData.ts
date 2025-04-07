/**
 * Mock Data for Team Leaderboard
 *
 * This file contains sample athlete data for development and testing purposes.
 * The data is structured to demonstrate various scenarios and edge cases:
 *
 * Groups:
 * - Balanced distribution across Varsity/JV and Boys/Girls teams
 * - Each group has multiple representatives for testing filters
 *
 * Performance Metrics:
 * - Volume: Training volume in miles (range: 75-120)
 * - Completion: Workout completion percentage (range: 62-95%)
 * - Accuracy: Pace accuracy percentage (range: 65-92%)
 *
 * Special Cases:
 * - Top 3 by volume: John (120), Sarah (115), Michael (110)
 * - Below 70% completion: Jennifer (68%), William (65%), Amanda (62%)
 * - Above 90% accuracy: John (92%), Sarah (90%)
 *
 * Trends:
 * - "up": Improving performance
 * - "down": Declining performance
 * - "same": Stable performance
 *
 * Note: Avatar URLs use pravatar.cc for consistent, unique avatars per athlete
 */

import { Athlete } from "./types";

/**
 * Mock athlete data array
 * Athletes are ordered by volume (highest to lowest) to simulate
 * the default sorting state of the leaderboard
 */
export const mockAthletes: Athlete[] = [
  {
    id: 1,
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=1", // Varsity boy, top performer
    group: "Varsity Boys",
    volume: 120, // Highest volume
    completion: 95, // Excellent completion
    accuracy: 92, // High accuracy
    trend: "up",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=2", // Varsity girl, strong performer
    group: "Varsity Girls",
    volume: 115, // Second highest volume
    completion: 88,
    accuracy: 90, // High accuracy
    trend: "up",
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=3", // JV boy showing promise
    group: "JV Boys",
    volume: 110, // Third highest volume
    completion: 85,
    accuracy: 87,
    trend: "same",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=4", // JV girl with good metrics
    group: "JV Girls",
    volume: 105,
    completion: 82,
    accuracy: 85,
    trend: "down",
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "https://i.pravatar.cc/150?img=5", // Varsity boy needing attention
    group: "Varsity Boys",
    volume: 100,
    completion: 78,
    accuracy: 80,
    trend: "down",
  },
  {
    id: 6,
    name: "Jessica Lee",
    avatar: "https://i.pravatar.cc/150?img=6", // Varsity girl, stable performance
    group: "Varsity Girls",
    volume: 95,
    completion: 75,
    accuracy: 78,
    trend: "same",
  },
  {
    id: 7,
    name: "Robert Taylor",
    avatar: "https://i.pravatar.cc/150?img=7", // JV boy showing improvement
    group: "JV Boys",
    volume: 90,
    completion: 72,
    accuracy: 75,
    trend: "up",
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    avatar: "https://i.pravatar.cc/150?img=8", // JV girl needing support
    group: "JV Girls",
    volume: 85,
    completion: 68, // Below 70% threshold
    accuracy: 70,
    trend: "down",
  },
  {
    id: 9,
    name: "William Anderson",
    avatar: "https://i.pravatar.cc/150?img=9", // Varsity boy struggling
    group: "Varsity Boys",
    volume: 80,
    completion: 65, // Below 70% threshold
    accuracy: 68,
    trend: "same",
  },
  {
    id: 10,
    name: "Amanda White",
    avatar: "https://i.pravatar.cc/150?img=10", // Varsity girl with potential
    group: "Varsity Girls",
    volume: 75,
    completion: 62, // Below 70% threshold
    accuracy: 65,
    trend: "up", // Despite low numbers, showing improvement
  },
];
