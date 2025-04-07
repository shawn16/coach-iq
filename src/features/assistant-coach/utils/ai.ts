/**
 * AI Utility Functions
 *
 * Contains functions for generating AI responses and insights.
 * Currently uses sample data but designed to be replaced with actual AI service calls.
 *
 * Functions:
 * - generateContextualResponse: Generates responses based on user messages
 * - generateInsight: Generates detailed insights for specific topics
 *
 * Note: These are placeholder implementations that will be replaced with
 * actual AI service integrations in the future.
 */

import { InsightType } from "../types";
import {
  SAMPLE_TRAINING_PLAN,
  SAMPLE_WORKOUT_RESULTS,
  SAMPLE_COACHING_PHILOSOPHY,
} from "../config";

/**
 * Generates a contextual response based on the user's message
 *
 * Analyzes the message content and returns relevant information from sample data.
 * In a production environment, this would call an AI service for dynamic responses.
 *
 * @param message - The user's input message
 * @returns Promise<string> - A contextual response based on the message content
 *
 * Response Types:
 * - Training-related: Returns training plan focus areas and next race info
 * - Performance-related: Returns team performance trends and analysis
 * - Philosophy-related: Returns coaching principles and focus areas
 * - Default: Returns a general help message
 */
export async function generateContextualResponse(
  message: string
): Promise<string> {
  // In a real implementation, this would call an AI service
  // For now, we'll return a simple response based on the message content
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("training") || lowerMessage.includes("workout")) {
    return `Based on the current training plan, we're focusing on ${SAMPLE_TRAINING_PLAN.focusAreas.join(
      ", "
    )}. The next race is ${SAMPLE_TRAINING_PLAN.nextRace.name} in ${
      SAMPLE_TRAINING_PLAN.nextRace.daysUntil
    } days.`;
  }

  if (
    lowerMessage.includes("performance") ||
    lowerMessage.includes("results")
  ) {
    return `The team's performance is ${
      SAMPLE_WORKOUT_RESULTS.teamPerformance.trend
    }. Key strengths include ${SAMPLE_WORKOUT_RESULTS.teamPerformance.strengths.join(
      ", "
    )}. Areas for improvement are ${SAMPLE_WORKOUT_RESULTS.teamPerformance.weaknesses.join(
      ", "
    )}.`;
  }

  if (
    lowerMessage.includes("philosophy") ||
    lowerMessage.includes("approach")
  ) {
    return `Our coaching philosophy emphasizes ${SAMPLE_COACHING_PHILOSOPHY.corePrinciples.join(
      ", "
    )}. We focus on ${SAMPLE_COACHING_PHILOSOPHY.developmentFocus.join(", ")}.`;
  }

  return "I'm here to help with training plans, workout results, and coaching philosophy. What would you like to know more about?";
}

/**
 * Generates detailed insights for a specific topic
 *
 * Returns formatted insights based on the requested type using sample data.
 * In a production environment, this would call an AI service for dynamic insights.
 *
 * @param insightType - The type of insight to generate
 * @returns Promise<string> - Formatted insights for the requested type
 *
 * Insight Types:
 * - training_plan: Upcoming races, season phase, focus areas, and workouts
 * - workout_result: Team trends, top performers, areas needing attention
 * - coaching_philosophy: Core principles, team values, development focus
 */
export async function generateInsight(
  insightType: InsightType
): Promise<string> {
  // In a real implementation, this would call an AI service
  // For now, we'll return sample insights based on the type
  switch (insightType) {
    case "training_plan":
      return `Current Training Plan Insights:
- Next Race: ${SAMPLE_TRAINING_PLAN.nextRace.name} (${
        SAMPLE_TRAINING_PLAN.nextRace.daysUntil
      } days away)
- Season Phase: ${SAMPLE_TRAINING_PLAN.seasonPhase}
- Focus Areas: ${SAMPLE_TRAINING_PLAN.focusAreas.join(", ")}
- Upcoming Workouts: ${SAMPLE_TRAINING_PLAN.upcomingWorkouts
        .map((w) => `${w.name} on ${w.date}`)
        .join(", ")}`;

    case "workout_result":
      return `Recent Workout Results:
- Team Trend: ${SAMPLE_WORKOUT_RESULTS.teamPerformance.trend}
- Top Performers: ${SAMPLE_WORKOUT_RESULTS.teamPerformance.topPerformers.join(
        ", "
      )}
- Areas Needing Attention: ${SAMPLE_WORKOUT_RESULTS.teamPerformance.weaknesses.join(
        ", "
      )}
- Recent Highlights: ${SAMPLE_WORKOUT_RESULTS.individualHighlights
        .map((h) => `${h.athleteName}: ${h.highlight}`)
        .join("\n")}`;

    case "coaching_philosophy":
      return `Coaching Philosophy Overview:
- Core Principles: ${SAMPLE_COACHING_PHILOSOPHY.corePrinciples.join(", ")}
- Team Values: ${SAMPLE_COACHING_PHILOSOPHY.teamValues.join(", ")}
- Development Focus: ${SAMPLE_COACHING_PHILOSOPHY.developmentFocus.join(", ")}
- Communication Style: ${SAMPLE_COACHING_PHILOSOPHY.communicationStyle}`;

    default:
      return "No insights available for this type.";
  }
}
