"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  Send,
  Lightbulb,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Trash2,
  Calendar,
  BarChart3,
  Heart,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Add this after the imports
import { keyframes } from "@emotion/react"

// Add keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// Add this to your styles
const styles = {
  fadeIn: {
    animation: `${fadeIn} 0.3s ease-out forwards`,
  },
}

// Define interfaces for the data sources
interface TrainingPlan {
  nextRace: {
    name: string
    date: string
    daysUntil: number
    type: string
    distance: string
  }
  upcomingWorkouts: Array<{
    id: string
    name: string
    date: string
    type: string
    description: string
  }>
  seasonPhase: string
  focusAreas: string[]
}

interface WorkoutResult {
  recentWorkouts: Array<{
    id: string
    name: string
    date: string
    completion: number
    performance: "above_expected" | "as_expected" | "below_expected"
    notes: string
  }>
  teamPerformance: {
    trend: "improving" | "stable" | "declining"
    strengths: string[]
    weaknesses: string[]
    topPerformers: string[]
    strugglingAthletes: string[]
  }
  individualHighlights: Array<{
    athleteName: string
    highlight: string
  }>
}

interface CoachingPhilosophy {
  corePrinciples: string[]
  teamValues: string[]
  nonNegotiables: string[]
  developmentFocus: string[]
  communicationStyle: string
}

// Message type definition
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  referenced?: {
    type: "training_plan" | "workout_result" | "coaching_philosophy"
    data: string
  }
}

export default function AssistantCoachPage() {
  // State for insights panel toggle
  const [showInsightsPanel, setShowInsightsPanel] = useState(false)

  // Sample data for the integrated sources
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan>({
    nextRace: {
      name: "City Championships",
      date: "2023-05-15",
      daysUntil: 12,
      type: "Championship",
      distance: "5K",
    },
    upcomingWorkouts: [
      {
        id: "w1",
        name: "Threshold Tempo Run",
        date: "2023-05-04",
        type: "tempo",
        description: "25min continuous @ tempo pace",
      },
      {
        id: "w2",
        name: "Race Simulation",
        date: "2023-05-08",
        type: "interval",
        description: "2x1600m @ 5K pace + 4x400m @ 1600m pace",
      },
      {
        id: "w3",
        name: "Easy Recovery Run",
        date: "2023-05-11",
        type: "recovery",
        description: "40min easy + strides",
      },
    ],
    seasonPhase: "Competition Phase",
    focusAreas: ["Race-specific endurance", "Speed endurance", "Mental preparation"],
  })

  const [workoutResults, setWorkoutResults] = useState<WorkoutResult>({
    recentWorkouts: [
      {
        id: "r1",
        name: "Tuesday Interval Session",
        date: "2023-04-25",
        completion: 92,
        performance: "above_expected",
        notes: "Team performed well on the 400m repeats, showing good recovery between intervals.",
      },
      {
        id: "r2",
        name: "Hill Repeats",
        date: "2023-04-28",
        completion: 85,
        performance: "below_expected",
        notes: "Athletes struggled with maintaining form on the later repetitions.",
      },
      {
        id: "r3",
        name: "Long Run",
        date: "2023-04-30",
        completion: 90,
        performance: "as_expected",
        notes: "Good steady effort throughout, though some athletes reported fatigue.",
      },
    ],
    teamPerformance: {
      trend: "improving",
      strengths: ["Endurance base", "Team cohesion", "Recovery between workouts"],
      weaknesses: ["Hill running technique", "Race starts", "Finishing kick"],
      topPerformers: ["James Lee", "Alex Johnson", "Charlotte Lewis"],
      strugglingAthletes: ["Isabella Rodriguez", "William Garcia", "Ava Thompson"],
    },
    individualHighlights: [
      {
        athleteName: "James Lee",
        highlight: "Consistent improvement in tempo runs, now 15 seconds faster per mile than last month.",
      },
      {
        athleteName: "Isabella Rodriguez",
        highlight: "Struggling with hill workouts, showing signs of potential iron deficiency.",
      },
      {
        athleteName: "Charlotte Lewis",
        highlight: "Excellent progress in speed workouts, ready for more challenging intervals.",
      },
    ],
  })

  const [coachingPhilosophy, setCoachingPhilosophy] = useState<CoachingPhilosophy>({
    corePrinciples: [
      "Athlete-centered development",
      "Process over outcomes",
      "Long-term athletic development",
      "Balance between challenge and recovery",
    ],
    teamValues: ["Accountability", "Resilience", "Support", "Excellence", "Growth mindset"],
    nonNegotiables: [
      "Respect for teammates and coaches",
      "Consistent attendance",
      "Honest communication",
      "Full effort in workouts",
    ],
    developmentFocus: ["Technical efficiency", "Tactical awareness", "Mental toughness", "Physical literacy"],
    communicationStyle: "Direct but supportive, emphasizing growth opportunities",
  })

  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content: `Hello Coach! I'm your AI assistant. I see your next race is the ${trainingPlan.nextRace.name} in ${trainingPlan.nextRace.daysUntil} days. How can I help you today with your coaching needs?`,
      timestamp: new Date(),
    },
  ])

  // State for input message
  const [inputMessage, setInputMessage] = useState("")

  // State for loading status
  const [isLoading, setIsLoading] = useState(false)

  // Ref for scrolling to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Generate a unique ID for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: generateContextualResponse(inputMessage, messages),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Handle clicking an insight button
  const handleInsightClick = (insightType: string) => {
    let promptTemplate = ""

    // Set the appropriate prompt template based on the insight type
    switch (insightType) {
      case "Training Insights":
        promptTemplate = "What are some key training principles that apply to the current training phase?"
        break
      case "Philosophy in Action":
        promptTemplate = "How can I apply my coaching philosophy to solve the current coaching challenge?"
        break
      case "Team Culture & Motivation":
        promptTemplate = "How do I build a strong culture around the specific team value?"
        break
      case "Tiny Little Transitions":
        promptTemplate =
          "What's a small but effective adjustment I can make to the current challenge to create better results?"
        break
      default:
        promptTemplate = `Generate insights about ${insightType}`
    }

    // Add user message with the prompt template
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: promptTemplate,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: generateInsight(insightType, messages),
        timestamp: new Date(),
        referenced: {
          type:
            insightType === "Training Insights"
              ? "training_plan"
              : insightType === "Philosophy in Action"
                ? "coaching_philosophy"
                : insightType === "Team Culture & Motivation"
                  ? "coaching_philosophy"
                  : "workout_result",
          data: insightType,
        },
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle clearing the chat history
  const handleClearMemory = () => {
    // Create a new welcome message with current data
    const welcomeMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: `Hello Coach! I'm your AI assistant. I see your next race is the ${trainingPlan.nextRace.name} in ${trainingPlan.nextRace.daysUntil} days. How can I help you today with your coaching needs?`,
      timestamp: new Date(),
    }

    // Reset messages to just the welcome message
    setMessages([welcomeMessage])
  }

  // Generate contextual responses based on the conversation history and integrated data
  const generateContextualResponse = (message: string, conversationHistory: Message[]) => {
    // Check for keywords in the message to determine context
    const lowerMessage = message.toLowerCase()

    // Race-related queries
    if (
      lowerMessage.includes("race") ||
      lowerMessage.includes("competition") ||
      lowerMessage.includes("championship")
    ) {
      return `Based on your upcoming ${trainingPlan.nextRace.name} in ${trainingPlan.nextRace.daysUntil} days, I'd recommend focusing on race-specific preparation. 

Your team's recent performance in the ${workoutResults.recentWorkouts[0].name} showed ${workoutResults.recentWorkouts[0].performance === "above_expected" ? "strong" : workoutResults.recentWorkouts[0].performance === "as_expected" ? "solid" : "some challenges with"} execution. 

Given your coaching philosophy emphasis on "${coachingPhilosophy.corePrinciples[1]}", I suggest implementing race simulation workouts that focus on pacing strategy and mental preparation. Would you like me to suggest a specific workout plan for the next 10 days leading up to the race?`
    }

    // Workout-related queries
    else if (
      lowerMessage.includes("workout") ||
      lowerMessage.includes("training") ||
      lowerMessage.includes("session")
    ) {
      return `Looking at your upcoming workouts, I see you have a ${trainingPlan.upcomingWorkouts[0].name} scheduled for ${trainingPlan.upcomingWorkouts[0].date}. 

Based on your team's recent performance trends, which show ${workoutResults.teamPerformance.trend === "improving" ? "improvement" : workoutResults.teamPerformance.trend === "stable" ? "stability" : "some decline"}, you might want to ${workoutResults.teamPerformance.trend === "improving" ? "continue challenging them" : workoutResults.teamPerformance.trend === "stable" ? "add some variety" : "focus on fundamentals"}.

Your coaching philosophy emphasizes ${coachingPhilosophy.corePrinciples[0]}, so consider allowing athletes some input on the execution of the ${trainingPlan.upcomingWorkouts[0].type} workout to increase buy-in and motivation.`
    }

    // Athlete-related queries
    else if (lowerMessage.includes("athlete") || lowerMessage.includes("runner") || lowerMessage.includes("team")) {
      const topPerformer = workoutResults.teamPerformance.topPerformers[0]
      const strugglingAthlete = workoutResults.teamPerformance.strugglingAthletes[0]

      return `Your team currently has some standout performers like ${topPerformer}, who's excelling in recent workouts. 

I've also noticed that ${strugglingAthlete} has been struggling, particularly with ${workoutResults.recentWorkouts.find((w) => w.performance === "below_expected")?.name || "recent workouts"}.

Given your coaching philosophy's focus on "${coachingPhilosophy.corePrinciples[2]}", you might consider some individualized adjustments while maintaining team cohesion. Would you like specific recommendations for either supporting struggling athletes or appropriately challenging your top performers?`
    }

    // Philosophy-related queries
    else if (
      lowerMessage.includes("philosophy") ||
      lowerMessage.includes("principle") ||
      lowerMessage.includes("value")
    ) {
      return `Your coaching philosophy centers around ${coachingPhilosophy.corePrinciples.join(", ")}, with team values of ${coachingPhilosophy.teamValues.join(", ")}.

As you prepare for the ${trainingPlan.nextRace.name}, this is a good time to reinforce your "${coachingPhilosophy.teamValues[1]}" value, especially given the challenges some athletes faced in the recent ${workoutResults.recentWorkouts.find((w) => w.performance === "below_expected")?.name || "workouts"}.

Would you like to discuss specific ways to integrate your philosophical approach into the upcoming ${trainingPlan.seasonPhase} training sessions?`
    }

    // Check for context in conversation history
    const lastFewMessages = conversationHistory.slice(-3)
    const recentTopics = lastFewMessages.map((m) => m.content.toLowerCase())

    if (recentTopics.some((topic) => topic.includes("race") || topic.includes("competition"))) {
      return `Continuing our discussion about racing, with the ${trainingPlan.nextRace.name} approaching in ${trainingPlan.nextRace.daysUntil} days, it's important to balance final preparations with adequate recovery.

Your team's strengths in ${workoutResults.teamPerformance.strengths[0]} and ${workoutResults.teamPerformance.strengths[1]} should be leveraged, while being mindful of the challenges with ${workoutResults.teamPerformance.weaknesses[0]}.

This aligns with your coaching principle of "${coachingPhilosophy.corePrinciples[3]}" - finding that optimal balance before competition.`
    }

    // Default responses with integrated data
    const responses = [
      `Based on your team's recent performances, I notice ${workoutResults.teamPerformance.strengths[0]} is a strength, while ${workoutResults.teamPerformance.weaknesses[0]} needs attention. Given your focus on "${coachingPhilosophy.corePrinciples[0]}", how would you like to address this balance in the upcoming ${trainingPlan.upcomingWorkouts[0].name}?`,

      `With the ${trainingPlan.nextRace.name} coming up in ${trainingPlan.nextRace.daysUntil} days, your current ${trainingPlan.seasonPhase} training should emphasize ${trainingPlan.focusAreas[0]} and ${trainingPlan.focusAreas[1]}. How does this align with your coaching philosophy of "${coachingPhilosophy.corePrinciples[1]}"?`,

      `I've noticed that ${workoutResults.individualHighlights[0].athleteName} has been ${workoutResults.individualHighlights[0].highlight} This seems to align well with your coaching emphasis on "${coachingPhilosophy.developmentFocus[0]}". Would you like to discuss how to further develop this strength?`,

      `Your upcoming workout, ${trainingPlan.upcomingWorkouts[0].name}, will be important preparation for the ${trainingPlan.nextRace.name}. Given your team's recent ${workoutResults.teamPerformance.trend} trend, how would you like to approach this session to reinforce your "${coachingPhilosophy.teamValues[1]}" team value?`,

      `Looking at your coaching non-negotiables like "${coachingPhilosophy.nonNegotiables[0]}" and the upcoming ${trainingPlan.seasonPhase} phase, what specific aspects of the next few workouts would you like to emphasize to reinforce these principles?`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Generate insights based on the selected category and conversation context
  const generateInsight = (insightType: string, conversationHistory: Message[]) => {
    switch (insightType) {
      case "Training Insights":
        return `**Key Training Principles for ${trainingPlan.seasonPhase}**

1. **Race-Specific Preparation**: With the ${trainingPlan.nextRace.name} in ${trainingPlan.nextRace.daysUntil} days, focus on ${trainingPlan.focusAreas[0]} and ${trainingPlan.focusAreas[1]}. Your upcoming ${trainingPlan.upcomingWorkouts[1].name} workout is perfectly timed for this purpose.

2. **Balanced Intensity Management**: Your team's recent performance in ${workoutResults.recentWorkouts[0].name} showed ${workoutResults.recentWorkouts[0].performance === "above_expected" ? "strong execution" : "some challenges"}. Consider ${workoutResults.recentWorkouts[0].performance === "above_expected" ? "maintaining this intensity" : "adjusting the intensity slightly"} for optimal adaptation.

3. **Individual Response Monitoring**: Pay special attention to ${workoutResults.teamPerformance.strugglingAthletes[0]} who has been struggling with ${workoutResults.recentWorkouts.find((w) => w.performance === "below_expected")?.name || "recent workouts"}. Their recovery metrics may indicate a need for modification.

4. **Technical Efficiency Under Fatigue**: Given that "${workoutResults.teamPerformance.weaknesses[0]}" is a team weakness, incorporate technical focus during the later portions of your ${trainingPlan.upcomingWorkouts[0].name} session to address this under fatigue conditions.`

      case "Philosophy in Action":
        return `**Applying Your Coaching Philosophy to Current Challenges**

1. **${coachingPhilosophy.corePrinciples[0]} in Practice**: As you prepare for the ${trainingPlan.nextRace.name}, involve athletes in designing portions of the ${trainingPlan.upcomingWorkouts[1].name} workout, particularly the pacing strategy. This reinforces autonomy while maintaining structure.

2. **Embodying "${coachingPhilosophy.teamValues[1]}"**: Your team's challenges with ${workoutResults.recentWorkouts.find((w) => w.performance === "below_expected")?.name || "recent workouts"} present an opportunity to demonstrate resilience. Frame feedback around effort and process improvements rather than outcomes.

3. **Balancing "${coachingPhilosophy.corePrinciples[2]}"**: While focusing on the upcoming competition, maintain perspective on long-term development, especially for athletes like ${workoutResults.teamPerformance.strugglingAthletes[0]} who may need modified approaches.

4. **Communication Consistency**: Your "${coachingPhilosophy.communicationStyle}" approach should be applied consistently across all athletes, from ${workoutResults.teamPerformance.topPerformers[0]} to ${workoutResults.teamPerformance.strugglingAthletes[0]}, maintaining your non-negotiable of "${coachingPhilosophy.nonNegotiables[2]}".`

      case "Team Culture & Motivation":
        return `**Building Strong Team Culture Around "${coachingPhilosophy.teamValues[0]}" and "${coachingPhilosophy.teamValues[1]}"**

1. **Value Recognition**: With ${trainingPlan.nextRace.daysUntil} days until the ${trainingPlan.nextRace.name}, highlight athletes who exemplify your core values. Consider recognizing ${workoutResults.teamPerformance.topPerformers[0]} for demonstrating "${coachingPhilosophy.teamValues[0]}" in recent sessions.

2. **Peer Leadership Development**: Establish a mentoring relationship between ${workoutResults.teamPerformance.topPerformers[0]} and ${workoutResults.teamPerformance.strugglingAthletes[0]} to address challenges with ${workoutResults.teamPerformance.weaknesses[0]} while building team cohesion.

3. **Shared Challenge Experience**: Design the upcoming ${trainingPlan.upcomingWorkouts[1].name} workout to include elements that require collaboration, not just individual effort, reinforcing your "${coachingPhilosophy.teamValues[2]}" value.

4. **Pre-Competition Ritual**: Develop a team ritual before the ${trainingPlan.nextRace.name} that reinforces your "${coachingPhilosophy.nonNegotiables[0]}" principle and creates a sense of team identity heading into competition.`

      case "Tiny Little Transitions":
        return `**Small Adjustments for Better Results in ${trainingPlan.seasonPhase}**

1. **Workout Introduction Framing**: Begin the upcoming ${trainingPlan.upcomingWorkouts[0].name} by explicitly connecting it to the ${trainingPlan.nextRace.name} and how it develops ${trainingPlan.focusAreas[0]}. This 60-second explanation will improve athlete buy-in.

2. **Recovery Interval Positioning**: During the ${trainingPlan.upcomingWorkouts[1].name}, have athletes gather in a circle during recovery rather than dispersing. This maintains focus while allowing physiological recovery and reinforces your "${coachingPhilosophy.teamValues[2]}" value.

3. **Feedback Timing Adjustment**: Provide technical feedback on ${workoutResults.teamPerformance.weaknesses[0]} immediately for newer athletes, but wait until after the workout for experienced athletes like ${workoutResults.teamPerformance.topPerformers[0]}.

4. **Pre-Race Preparation Micro-Habit**: Implement a standardized 2-minute visualization exercise before the ${trainingPlan.nextRace.name} that aligns with your "${coachingPhilosophy.developmentFocus[2]}" focus area. This small addition can significantly impact race-day performance.`

      default:
        return "I don't have specific insights on that topic yet, but I'd be happy to discuss it further if you'd like to share more details about what you're looking for."
    }
  }

  // Format message content with markdown-like syntax
  const formatMessageContent = (content: string) => {
    // Handle bold text
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Handle lists
    formattedContent = formattedContent.replace(/\n(\d+\.\s.*?)(?=\n|$)/g, "<br/><li>$1</li>")
    formattedContent = formattedContent.replace(/\n(\*\s.*?)(?=\n|$)/g, "<br/><li>$1</li>")

    // Handle paragraphs
    formattedContent = formattedContent.replace(/\n\n/g, "<br/><br/>")
    formattedContent = formattedContent.replace(/\n/g, "<br/>")

    return formattedContent
  }

  // Get icon for referenced data type
  const getReferencedIcon = (type: "training_plan" | "workout_result" | "coaching_philosophy") => {
    switch (type) {
      case "training_plan":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "workout_result":
        return <BarChart3 className="h-4 w-4 text-purple-500" />
      case "coaching_philosophy":
        return <Heart className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  // Get label for referenced data type
  const getReferencedLabel = (type: "training_plan" | "workout_result" | "coaching_philosophy") => {
    switch (type) {
      case "training_plan":
        return "Training Plan"
      case "workout_result":
        return "Workout Results"
      case "coaching_philosophy":
        return "Coaching Philosophy"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-start gap-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Assistant Coach</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your AI-powered coaching assistant to help with training plans, philosophy, and team management
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Insights and Quick Actions */}
        <div className={`${showInsightsPanel ? "w-full lg:w-1/3" : "w-full lg:w-64"} flex flex-col gap-4`}>
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="font-semibold text-gray-900 dark:text-gray-50">Assistant Settings</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="insights-toggle" className="text-gray-700 dark:text-gray-300">
                      Show Insights Panel
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Enable quick access to AI coaching insights
                    </p>
                  </div>
                  <Switch id="insights-toggle" checked={showInsightsPanel} onCheckedChange={setShowInsightsPanel} />
                </div>

                <Separator />

                <div className="pt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 hover:border-red-200 dark:hover:border-red-800"
                          onClick={handleClearMemory}
                        >
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Clear Memory
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset the conversation and clear chat history</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Integration Summary */}
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-semibold text-gray-900 dark:text-gray-50">Training Context</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">Next Race</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {trainingPlan.nextRace.name} ({trainingPlan.nextRace.distance}) - {trainingPlan.nextRace.daysUntil}{" "}
                    days away
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">Season Phase</p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    {trainingPlan.seasonPhase}
                  </Badge>
                </div>

                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">Next Workout</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {trainingPlan.upcomingWorkouts[0].name} ({trainingPlan.upcomingWorkouts[0].date})
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">Team Performance</p>
                  <p className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <span>Trend:</span>
                    <Badge
                      className={`${
                        workoutResults.teamPerformance.trend === "improving"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          : workoutResults.teamPerformance.trend === "stable"
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {workoutResults.teamPerformance.trend}
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights Panel - Only visible when toggle is ON */}
          {showInsightsPanel && (
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <h2 className="font-semibold text-gray-900 dark:text-gray-50">Quick Insights</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="justify-start border-gray-200 dark:border-gray-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-200"
                    onClick={() => handleInsightClick("Training Insights")}
                  >
                    <Zap className="h-4 w-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                    Training Insights
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
                    onClick={() => handleInsightClick("Philosophy in Action")}
                  >
                    <BookOpen className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Philosophy in Action
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200"
                    onClick={() => handleInsightClick("Team Culture & Motivation")}
                  >
                    <Users className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Team Culture & Motivation
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 hover:border-green-200 dark:hover:border-green-800 transition-all duration-200"
                    onClick={() => handleInsightClick("Tiny Little Transitions")}
                  >
                    <ArrowRight className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    Tiny Little Transitions
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Chat Interface */}
        <div className={`flex-1 flex flex-col ${showInsightsPanel ? "" : "lg:ml-4"}`}>
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm flex-1">
            <CardContent className="p-0 flex flex-col h-[calc(100vh-13rem)]">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar
                          className={
                            message.role === "assistant"
                              ? "bg-cyan-100 dark:bg-cyan-900"
                              : "bg-indigo-100 dark:bg-indigo-900"
                          }
                        >
                          <AvatarFallback>
                            {message.role === "assistant" ? (
                              <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                            ) : (
                              "C"
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg p-4 transform transition-all duration-300 ease-in-out ${
                            message.role === "user"
                              ? "bg-indigo-100 dark:bg-indigo-900/50 text-gray-900 dark:text-gray-50"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                          }`}
                        >
                          <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                          />

                          {message.referenced && (
                            <div className="mt-2 flex items-center gap-1 text-xs">
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 py-0 h-5 bg-gray-50 dark:bg-gray-700"
                              >
                                {getReferencedIcon(message.referenced.type)}
                                <span>{getReferencedLabel(message.referenced.type)}</span>
                              </Badge>
                            </div>
                          )}

                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="bg-cyan-100 dark:bg-cyan-900">
                          <AvatarFallback>
                            <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                            <div
                              className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Separator />

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
                <Input
                  placeholder="Ask me anything about coaching..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

