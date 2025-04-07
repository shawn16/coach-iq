/**
 * useMessages Hook
 *
 * A custom hook that manages the chat interface between the user and the AI assistant.
 * Handles message state, loading states, and various message-related operations.
 *
 * Features:
 * - Message state management
 * - Auto-scrolling to latest messages
 * - User message handling
 * - AI response generation
 * - Insight generation
 * - Message history clearing
 *
 * State Management:
 * - messages: Array of Message objects
 * - isLoading: Boolean indicating AI processing state
 * - messagesEndRef: Reference to scroll target element
 */

import { useState, useRef } from "react";
import { Message, InsightType } from "../types";
import { generateContextualResponse, generateInsight } from "../utils/ai";

export function useMessages() {
  // State for managing chat messages and loading state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Reference to the end of messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scrolls the messages container to the bottom
   * Used to ensure new messages are visible
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Generates a unique ID for new messages
   * @returns A random string ID
   */
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  /**
   * Handles sending a new user message and generating an AI response
   *
   * Process:
   * 1. Validates input
   * 2. Creates user message
   * 3. Updates message state
   * 4. Generates AI response
   * 5. Updates message state with response
   *
   * @param e - Form submission event
   * @param inputRef - Reference to the input element
   */
  const handleSendMessage = async (
    e: React.FormEvent,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;

    // Create and add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: inputRef.current.value,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    inputRef.current.value = "";

    try {
      // Generate and add AI response
      const response = await generateContextualResponse(userMessage.content);
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles generating and displaying an AI insight
   *
   * Process:
   * 1. Sets loading state
   * 2. Generates insight based on type
   * 3. Creates and adds insight message
   *
   * @param insightType - Type of insight to generate
   */
  const handleInsightClick = async (insightType: InsightType) => {
    setIsLoading(true);
    try {
      const insight = await generateInsight(insightType);
      const insightMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: insight,
        timestamp: new Date(),
        referenced: {
          type: insightType,
          data: insight,
        },
      };
      setMessages((prev) => [...prev, insightMessage]);
    } catch (error) {
      console.error("Error generating insight:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clears all messages from the chat history
   */
  const handleClearMemory = () => {
    setMessages([]);
  };

  // Expose hook interface
  return {
    messages, // Current message history
    isLoading, // Loading state indicator
    messagesEndRef, // Reference for auto-scrolling
    handleSendMessage, // Function to send new messages
    handleInsightClick, // Function to generate insights
    handleClearMemory, // Function to clear message history
    scrollToBottom, // Function to scroll to latest message
  };
}
