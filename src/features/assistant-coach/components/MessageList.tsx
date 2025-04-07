/**
 * MessageList Component
 *
 * A component that renders a chat-like interface for messages between the user and AI assistant.
 * Features message bubbles with avatars, timestamps, and reference indicators.
 *
 * Key Features:
 * - User/Assistant message distinction
 * - Avatar display
 * - Timestamp formatting
 * - Reference badges for insights
 * - Responsive layout
 * - Dark mode support
 *
 * Message Types:
 * - User messages (right-aligned, indigo background)
 * - Assistant messages (left-aligned, gray background)
 * - Referenced insights (with icons and labels)
 */

import { Message } from "../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Brain, Calendar, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Props interface for the MessageList component
 * @property messages - Array of Message objects to display
 * @property messagesEndRef - Reference to the end of the message list for auto-scrolling
 */
interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  /**
   * Returns the appropriate icon for a referenced insight type
   * @param type - Type of insight being referenced
   * @returns JSX element with the corresponding icon
   */
  const getReferencedIcon = (
    type: "training_plan" | "workout_result" | "coaching_philosophy"
  ) => {
    switch (type) {
      case "training_plan":
        return <Calendar className="h-4 w-4" />;
      case "workout_result":
        return <BarChart3 className="h-4 w-4" />;
      case "coaching_philosophy":
        return <Brain className="h-4 w-4" />;
    }
  };

  /**
   * Returns the display label for a referenced insight type
   * @param type - Type of insight being referenced
   * @returns String label for the insight type
   */
  const getReferencedLabel = (
    type: "training_plan" | "workout_result" | "coaching_philosophy"
  ) => {
    switch (type) {
      case "training_plan":
        return "Training Plan";
      case "workout_result":
        return "Workout Results";
      case "coaching_philosophy":
        return "Coaching Philosophy";
    }
  };

  return (
    // Main container with scrolling and spacing
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        // Message container with conditional alignment
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* Assistant avatar (left side) */}
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          )}

          {/* Message content container */}
          <div
            className={`flex flex-col gap-1 ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Message bubble with role-based styling */}
            <div
              className={`rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {message.content}
            </div>

            {/* Reference badge for insights */}
            {message.referenced && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs"
              >
                {getReferencedIcon(message.referenced.type)}
                {getReferencedLabel(message.referenced.type)}
              </Badge>
            )}

            {/* Timestamp */}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(message.timestamp, "h:mm a")}
            </span>
          </div>

          {/* User avatar (right side) */}
          {message.role === "user" && (
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {/* Auto-scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
}
