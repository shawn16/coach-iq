"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  LineChart,
  Plus,
  Save,
  Trash2,
  ChevronDown,
  Copy,
  BarChart3,
  Percent,
  HelpCircle,
  AlertCircle,
  Pencil,
  Eye,
  ChevronsUp,
  ChevronsDown,
  Calendar,
  Clock,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Add these imports at the top of the file
import { useMediaQuery } from "@/hooks/use-media-query"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination as SwiperPagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ProgressionTemplate {
  id: string
  name: string
  type: string
  metric: string
  duration: number
  description: string
  pattern: number[]
  workoutType?: string
  progress?: number
  status?: string
}

const progressionTemplates: ProgressionTemplate[] = [
  {
    id: "1",
    name: "Linear Intensity Progression",
    type: "linear",
    metric: "intensity",
    duration: 12,
    description: "Gradually increases intensity from 60% to 95% over 12 weeks",
    pattern: [60, 63, 66, 70, 74, 78, 82, 86, 90, 93, 95, 90],
    workoutType: "tempo",
    progress: 75,
    status: "active",
  },
  {
    id: "2",
    name: "Wave Volume Progression",
    type: "wave",
    metric: "volume",
    duration: 8,
    description: "Alternates between high and low volume weeks for recovery",
    pattern: [60, 75, 65, 80, 70, 85, 75, 90],
    workoutType: "long_run",
    progress: 50,
    status: "active",
  },
  {
    id: "3",
    name: "Step Intensity Progression",
    type: "step",
    metric: "intensity",
    duration: 10,
    description: "Increases intensity in steps with plateaus for adaptation",
    pattern: [60, 60, 70, 70, 70, 80, 80, 90, 90, 95],
    workoutType: "interval",
    progress: 30,
    status: "active",
  },
  {
    id: "4",
    name: "Pyramid Volume Progression",
    type: "pyramid",
    metric: "volume",
    duration: 12,
    description: "Builds volume to a peak then gradually reduces for taper",
    pattern: [50, 60, 70, 80, 90, 100, 100, 90, 80, 70, 60, 50],
    workoutType: "long_run",
    progress: 0,
    status: "draft",
  },
  {
    id: "5",
    name: "Distance Build-up",
    type: "linear",
    metric: "distance",
    duration: 16,
    description: "Gradually increases running distance for marathon preparation",
    pattern: [10, 12, 14, 16, 14, 18, 20, 16, 22, 24, 26, 20, 28, 30, 20, 42],
    workoutType: "long_run",
    progress: 0,
    status: "draft",
  },
  {
    id: "6",
    name: "Tempo Run Progression",
    type: "wave",
    metric: "intensity",
    duration: 8,
    description: "Progresses tempo run intensity with recovery weeks",
    pattern: [75, 80, 85, 80, 85, 90, 85, 95],
    workoutType: "tempo",
    progress: 100,
    status: "completed",
  },
  {
    id: "7",
    name: "1600m Pace Progression",
    type: "linear",
    metric: "intensity",
    duration: 10,
    description: "Gradually increases 1600m pace workout intensity",
    pattern: [70, 75, 80, 85, 87, 90, 92, 95, 97, 100],
    workoutType: "interval",
    progress: 0,
    status: "draft",
  },
  {
    id: "8",
    name: "Fartlek Progression",
    type: "step",
    metric: "volume",
    duration: 8,
    description: "Increases fartlek workout volume in steps",
    pattern: [60, 60, 75, 75, 90, 90, 100, 85],
    workoutType: "fartlek",
    progress: 25,
    status: "active",
  },
  {
    id: "9",
    name: "Race Season Taper",
    type: "pyramid",
    metric: "volume",
    duration: 6,
    description: "Reduces volume while maintaining intensity for race peaking",
    pattern: [100, 90, 80, 70, 60, 50],
    workoutType: "interval",
    progress: 0,
    status: "draft",
  },
  {
    id: "10",
    name: "Base Building Phase",
    type: "linear",
    metric: "volume",
    duration: 8,
    description: "Gradually builds aerobic base with increasing volume",
    pattern: [50, 55, 60, 65, 70, 75, 80, 85],
    workoutType: "long_run",
    progress: 0,
    status: "draft",
  },
  {
    id: "11",
    name: "Speed Development",
    type: "wave",
    metric: "intensity",
    duration: 6,
    description: "Focuses on developing speed with alternating intensity",
    pattern: [70, 85, 75, 90, 80, 95],
    workoutType: "interval",
    progress: 0,
    status: "draft",
  },
  {
    id: "12",
    name: "Recovery Block",
    type: "step",
    metric: "volume",
    duration: 4,
    description: "Structured recovery period with gradually increasing volume",
    pattern: [40, 50, 60, 70],
    workoutType: "recovery_run",
    progress: 0,
    status: "draft",
  },
]

export default function DefineProgressionsPage() {
  const router = useRouter()
  const [progressionType, setProgressionType] = useState("linear")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [workoutCategory, setWorkoutCategory] = useState("intensity")
  const [progressionName, setProgressionName] = useState("12-Week Intensity Progression")
  const [progressionDescription, setProgressionDescription] = useState(
    "Gradually increases intensity from 60% to 95% over 12 weeks",
  )
  const [steps, setSteps] = useState([
    { id: 1, week: 1, value: "60", unit: "%", description: "Base level - moderate intensity" },
    { id: 2, week: 2, value: "65", unit: "%", description: "Slight increase from base" },
    { id: 3, week: 3, value: "70", unit: "%", description: "Continued gradual increase" },
    { id: 4, week: 4, value: "75", unit: "%", description: "Moderate intensity" },
    { id: 5, week: 5, value: "80", unit: "%", description: "Approaching high intensity" },
    { id: 6, week: 6, value: "85", unit: "%", description: "High intensity" },
    { id: 7, week: 7, value: "90", unit: "%", description: "Very high intensity" },
    { id: 8, week: 8, value: "95", unit: "%", description: "Peak intensity" },
    { id: 9, week: 9, value: "85", unit: "%", description: "Taper - reduced intensity" },
    { id: 10, week: 10, value: "75", unit: "%", description: "Further reduction for recovery" },
    { id: 11, week: 11, value: "65", unit: "%", description: "Light week before competition" },
    { id: 12, week: 12, value: "100", unit: "%", description: "Competition/peak performance" },
  ])

  // Add new state for workout type
  const [workoutType, setWorkoutType] = useState("tempo")

  // Add new state for workout format
  const [workoutFormat, setWorkoutFormat] = useState("distance")

  // Remove this state declaration
  const [progressionTypes] = useState([
    "Endurance",
    "Threshold",
    "Recovery",
    "Speed",
    "Speed-Endurance",
    "Strength",
    "Technique/Form",
    "Race-Specific",
  ])
  const [showCustomTypeInput, setShowCustomTypeInput] = useState(false)
  const [customProgressionType, setCustomProgressionType] = useState("")
  const [showCustomWorkoutInput, setShowCustomWorkoutInput] = useState(false)
  const [customWorkoutType, setCustomWorkoutType] = useState("")
  const [isProgressionSaved, setIsProgressionSaved] = useState(false)

  // New state for validation
  const [customTypeError, setCustomTypeError] = useState("")
  const [customWorkoutError, setCustomWorkoutError] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingProgressionType, setPendingProgressionType] = useState("")

  // Add this with the other state declarations
  const [showConfirmation, setShowConfirmation] = useState(false)

  // First, add these new state variables after the other state declarations
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([])
  const [workoutsByWeek, setWorkoutsByWeek] = useState<{
    [week: number]: {
      id: number
      reps: string
      distance: string
      pace: string
      recovery: string
      description: string
    }[]
  }>({
    1: [
      {
        id: 1,
        reps: "6",
        distance: "400m",
        pace: "75%",
        recovery: "90sec",
        description: "Base level - moderate intensity",
      },
      { id: 2, reps: "4", distance: "800m", pace: "70%", recovery: "2min", description: "Endurance builder" },
    ],
    2: [
      { id: 3, reps: "8", distance: "400m", pace: "80%", recovery: "90sec", description: "Slight increase from base" },
    ],
    3: [
      { id: 4, reps: "6", distance: "600m", pace: "80%", recovery: "2min", description: "Continued gradual increase" },
    ],
    4: [{ id: 5, reps: "5", distance: "1000m", pace: "75%", recovery: "3min", description: "Moderate intensity" }],
  })

  // Add these state variables after the other state declarations
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [activeTemplates, setActiveTemplates] = useState<number>(0)
  const [completedTemplates, setCompletedTemplates] = useState<number>(0)
  const [draftTemplates, setDraftTemplates] = useState<number>(0)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [hoveredDescription, setHoveredDescription] = useState<string | null>(null)
  const descriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-collapse custom input fields after a delay
  const [pendingProgressionTypeTimer, setPendingProgressionTypeTimer] = useState<NodeJS.Timeout | null>(null)

  // Add this useEffect to calculate template statistics
  useEffect(() => {
    const active = progressionTemplates.filter((t) => t.status === "active").length
    const completed = progressionTemplates.filter((t) => t.status === "completed").length
    const draft = progressionTemplates.filter((t) => t.status === "draft").length

    setActiveTemplates(active)
    setCompletedTemplates(completed)
    setDraftTemplates(draft)
  }, [])

  useEffect(() => {
    if (pendingProgressionType) {
      if (pendingProgressionTypeTimer) {
        clearTimeout(pendingProgressionTypeTimer)
      }
      setPendingProgressionTypeTimer(
        setTimeout(() => {
          setShowCustomTypeInput(false)
        }, 500),
      )
    }
    return () => {
      if (pendingProgressionTypeTimer) {
        clearTimeout(pendingProgressionTypeTimer)
      }
    }
  }, [pendingProgressionType])

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map((step) => step.id)) + 1 : 1
    const newWeek = steps.length > 0 ? Math.max(...steps.map((step) => step.week)) + 1 : 1
    setSteps([...steps, { id: newId, week: newWeek, value: "50", unit: "%", description: "" }])
  }

  const removeStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const updateStep = (id: number, field: string, value: string | number) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const moveStep = (id: number, direction: "up" | "down") => {
    const index = steps.findIndex((step) => step.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === steps.length - 1)) {
      return
    }

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap the steps
    const temp = newSteps[index]
    newSteps[index] = newSteps[targetIndex]
    newSteps[targetIndex] = temp

    // Update week numbers to match new order
    newSteps.forEach((step, idx) => {
      step.week = idx + 1
    })

    setSteps(newSteps)
  }

  const getProgressionData = () => {
    return {
      labels: steps.map((step) => `Week ${step.week}`),
      datasets: [
        {
          data: steps.map((step) => Number.parseFloat(step.value)),
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(99, 102, 241)",
          pointRadius: 4,
          tension: progressionType === "linear" ? 0 : 0.4,
        },
      ],
    }
  }

  const renderChart = () => {
    const data = getProgressionData()
    const maxValue = Math.max(...data.datasets[0].data) * 1.1
    const minValue = Math.min(...data.datasets[0].data) * 0.9

    return (
      <div className="w-full h-64 relative">
        {/* Chart background grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-gray-200 dark:border-gray-700 h-1/5"></div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-600 dark:text-gray-400 pr-2">
          <div>100%</div>
          <div>75%</div>
          <div>50%</div>
          <div>25%</div>
          <div>0%</div>
        </div>

        {/* Chart line */}
        <div className="absolute inset-0 ml-8 mr-2 mt-2 mb-6">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Area under the line */}
            <path
              d={`
                M0,${100 - ((data.datasets[0].data[0] - minValue) / (maxValue - minValue)) * 100}
                ${data.datasets[0].data
                  .map((value, index) => {
                    const x = (index / (data.datasets[0].data.length - 1)) * 100
                    const y = 100 - ((value - minValue) / (maxValue - minValue)) * 100
                    return `L${x},${y}`
                  })
                  .join(" ")}
                L100,${100 - ((data.datasets[0].data[data.datasets[0].data.length - 1] - minValue) / (maxValue - minValue)) * 100}
                L100,100 L0,100 Z
              `}
              fill="url(#lineGradient)"
              opacity="0.5"
            />

            {/* Line */}
            <path
              d={`
                M0,${100 - ((data.datasets[0].data[0] - minValue) / (maxValue - minValue)) * 100}
                ${data.datasets[0].data
                  .map((value, index) => {
                    const x = (index / (data.datasets[0].data.length - 1)) * 100
                    const y = 100 - ((value - minValue) / (maxValue - minValue)) * 100
                    return `L${x},${y}`
                  })
                  .join(" ")}
              `}
              fill="none"
              stroke="rgb(99, 102, 241)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.datasets[0].data.map((value, index) => {
              const x = (index / (data.datasets[0].data.length - 1)) * 100
              const y = 100 - ((value - minValue) / (maxValue - minValue)) * 100
              return (
                <g key={index}>
                  <circle cx={`${x}%`} cy={`${y}%`} r="4" fill="white" stroke="rgb(99, 102, 241)" strokeWidth="2" />
                  <circle cx={`${x}%`} cy={`${y}%`} r="8" fill="rgb(99, 102, 241)" opacity="0.2" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-8 right-2 bottom-0 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          {data.labels.map((label, index) => (
            <div key={index} className="text-center" style={{ width: `${100 / data.labels.length}%` }}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Function to generate workout examples based on the progression
  const generateWorkoutExamples = () => {
    const examples = steps.map((step) => {
      let workout = ""
      const value = Number.parseFloat(step.value)

      if (workoutType === "tempo") {
        workout = `${Math.round(20 + ((value - 60) / 40) * 10)}min@${value}%`
      } else if (workoutType === "interval") {
        const reps = Math.round(4 + ((value - 60) / 40) * 4)
        workout = `${reps}x400m@${value}% w/90sec rest`
      } else if (workoutType === "long_run") {
        const distance = Math.round(8 + ((value - 60) / 40) * 6)
        workout = `${distance}mi@${value}%`
      } else if (workoutType === "fartlek") {
        const totalTime = Math.round(15 + ((value - 60) / 40) * 15)
        workout = `1-2-3-2-1 w/equal rest (${totalTime}min total)`
      }

      return {
        week: step.week,
        value: step.value,
        workout,
      }
    })

    return examples
  }

  // Add this function to get workout types based on progression type
  const getWorkoutTypesByProgressionType = (type: string) => {
    switch (type.toLowerCase()) {
      case "endurance":
        return ["Long Run", "Easy Run", "Steady State", "Progression Run"]
      case "threshold":
        return ["Tempo Run", "Cruise Intervals", "Threshold Intervals"]
      case "recovery":
        return ["Recovery Run", "Active Recovery", "Cross Training"]
      case "speed":
        return ["Track Repeats", "Hill Sprints", "Flying 30s", "Strides"]
      case "speed-endurance":
        return ["Interval Training", "Fartlek", "Ladder Workout"]
      case "strength":
        return ["Hill Repeats", "Circuit Training", "Weight Training", "Plyometrics"]
      case "technique/form":
        return ["Drills", "Form Work", "Technique Session", "Strides"]
      case "race-specific":
        return ["Race Simulation", "Pace Work", "Race Strategy Session"]
      default:
        return ["Custom Workout", "General Training", "Specialized Session"]
    }
  }

  // Validation function for custom progression type
  const validateCustomProgressionType = (value: string) => {
    // Check for empty value
    if (!value.trim()) {
      setCustomTypeError("Progression type cannot be empty")
      return false
    }

    // Check for invalid characters
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
      setCustomTypeError("Only letters, numbers, spaces, and hyphens are allowed")
      return false
    }

    // Check for duplicate (case-insensitive)
    const lowerCaseValue = value.trim().toLowerCase()
    if (progressionTypes.some((type) => type.toLowerCase() === lowerCaseValue)) {
      setCustomTypeError("This progression type already exists")
      return false
    }

    // Also check if it matches the custom type (if any)
    if (customProgressionType && customProgressionType.toLowerCase() === lowerCaseValue) {
      setCustomTypeError("This progression type already exists")
      return false
    }

    setCustomTypeError("")
    return true
  }

  // Validation function for custom workout type
  const validateCustomWorkoutType = (value: string) => {
    // Check for empty value
    if (!value.trim()) {
      setCustomWorkoutError("Workout type cannot be empty")
      return false
    }

    // Check for invalid characters
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
      setCustomWorkoutError("Only letters, numbers, spaces, and hyphens are allowed")
      return false
    }

    // Check for duplicate (case-insensitive)
    const lowerCaseValue = value.trim().toLowerCase()
    const currentWorkoutTypes = getWorkoutTypesByProgressionType(progressionType)

    if (currentWorkoutTypes.some((type) => type.toLowerCase() === lowerCaseValue)) {
      setCustomWorkoutError("This workout type already exists")
      return false
    }

    // Also check if it matches the custom type (if any)
    if (customWorkoutType && customWorkoutType.toLowerCase() === lowerCaseValue) {
      setCustomWorkoutError("This workout type already exists")
      return false
    }

    setCustomWorkoutError("")
    return true
  }

  // Handle adding custom progression type
  const handleAddCustomProgressionType = () => {
    if (validateCustomProgressionType(customProgressionType)) {
      setPendingProgressionType(customProgressionType.toLowerCase())
      setShowConfirmDialog(true)
    }
  }

  // Confirm adding custom progression type
  const confirmAddCustomProgressionType = () => {
    // Set the progression type to the pending value (auto-select)
    setProgressionType(pendingProgressionType)
    // Hide the custom input field
    setShowCustomTypeInput(false)
    // Clear the input field
    setCustomProgressionType("")
    // Close the confirmation dialog
    setShowConfirmDialog(false)
  }

  // Handle adding custom workout type
  const handleAddCustomWorkoutType = () => {
    if (validateCustomWorkoutType(customWorkoutType)) {
      const newWorkoutType = customWorkoutType.trim().toLowerCase().replace(/\s+/g, "_")
      // Auto-select the new workout type
      setWorkoutType(newWorkoutType)
      // Hide the custom input field
      setShowCustomWorkoutInput(false)
      // Clear the input field
      setCustomWorkoutType("")
    }
  }

  // Save progression and apply to training plan
  const saveProgression = () => {
    // In a real app, this would save to a database
    setIsProgressionSaved(true)
    // Show confirmation message
    setShowConfirmation(true)
    // Hide confirmation message after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 3000)
    alert("Progression saved successfully!")
  }

  const applyToTrainingPlan = () => {
    // In a real app, this would navigate to the training plan builder with this progression
    router.push("/training-plan-builder")
  }

  // Add this function to toggle expanded weeks

  // Add this function to add a workout to a specific week
  const addWorkoutToWeek = (week: number) => {
    const currentWeekWorkouts = workoutsByWeek[week] || []
    const newId =
      Math.max(
        0,
        ...Object.values(workoutsByWeek)
          .flat()
          .map((w) => w.id),
      ) + 1

    // Create a new workout with default values
    const newWorkout = {
      id: newId,
      reps: "4",
      distance: "400m",
      pace: "75%",
      recovery: "90sec",
      description: "New workout step",
    }

    // Add the new workout to the week
    setWorkoutsByWeek({
      ...workoutsByWeek,
      [week]: [...currentWeekWorkouts, newWorkout],
    })

    // Auto-expand the week when adding a new workout
    if (!expandedWeeks.includes(week)) {
      setExpandedWeeks([...expandedWeeks, week])
    }

    // Scroll to the bottom of the week's content to show the new workout
    setTimeout(() => {
      const weekElement = document.getElementById(`week-${week}`)
      if (weekElement) {
        const weekBottom = weekElement.getBoundingClientRect().bottom
        window.scrollTo({
          top: window.scrollY + weekBottom - window.innerHeight + 100,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  // Add this function to remove a workout
  const removeWorkout = (week: number, workoutId: number) => {
    const currentWeekWorkouts = workoutsByWeek[week] || []
    const updatedWorkouts = currentWeekWorkouts.filter((w) => w.id !== workoutId)

    // If this was the last workout in the week, remove the week entirely
    if (updatedWorkouts.length === 0) {
      const updatedWorkoutsByWeek = { ...workoutsByWeek }
      delete updatedWorkoutsByWeek[week]
      setWorkoutsByWeek(updatedWorkoutsByWeek)
    } else {
      setWorkoutsByWeek({
        ...workoutsByWeek,
        [week]: updatedWorkouts,
      })
    }
  }

  // Add this function to update a workout field
  const updateWorkoutField = (week: number, workoutId: number, field: string, value: string) => {
    const currentWeekWorkouts = workoutsByWeek[week] || []
    const updatedWorkouts = currentWeekWorkouts.map((workout) =>
      workout.id === workoutId ? { ...workout, [field]: value } : workout,
    )

    setWorkoutsByWeek({
      ...workoutsByWeek,
      [week]: updatedWorkouts,
    })
  }

  // Add this function to add a new week
  const addNewWeek = () => {
    const existingWeeks = Object.keys(workoutsByWeek).map(Number)
    const newWeekNumber = existingWeeks.length > 0 ? Math.max(...existingWeeks) + 1 : 1

    setWorkoutsByWeek({
      ...workoutsByWeek,
      [newWeekNumber]: [],
    })

    // Auto-expand the new week
    setExpandedWeeks([...expandedWeeks, newWeekNumber])
  }

  // First, add a function to generate a workout summary from a workout object
  // Add this function after the other utility functions and before the return statement

  // Add this function to generate a workout summary
  const generateWorkoutSummary = (workout: {
    reps: string
    distance: string
    pace: string
    recovery: string
  }) => {
    return `${workout.reps}x${workout.distance} @${workout.pace} w/ ${workout.recovery}`
  }

  // Add this function to generate a week summary
  const generateWeekSummary = (
    workouts: {
      id: number
      reps: string
      distance: string
      pace: string
      recovery: string
      description: string
    }[],
  ) => {
    if (workouts.length === 0) return "No workouts"

    if (workouts.length === 1) {
      return generateWorkoutSummary(workouts[0])
    }

    return `${generateWorkoutSummary(workouts[0])} + ${workouts.length - 1} more...`
  }

  // Add this function after the other utility functions
  const scrollToWeek = useCallback((weekNumber: number) => {
    const weekElement = document.getElementById(`week-${weekNumber}`)
    if (weekElement) {
      // Use a small timeout to allow the animation to start
      setTimeout(() => {
        const yOffset = -20 // Small offset to give some breathing room
        const y = weekElement.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }, 50)
    }
  }, [])

  // Modify the toggleWeekExpansion function to include scroll restoration
  const toggleWeekExpansion = useCallback(
    (week: number) => {
      if (expandedWeeks.includes(week)) {
        setExpandedWeeks(expandedWeeks.filter((w) => w !== week))
      } else {
        setExpandedWeeks([...expandedWeeks, week])
        // Scroll to the week after expanding
        scrollToWeek(week)
      }
    },
    [expandedWeeks, scrollToWeek],
  )

  // Add function to expand all weeks
  const expandAllWeeks = useCallback(() => {
    const allWeeks = Object.keys(workoutsByWeek).map(Number)
    setExpandedWeeks(allWeeks)
  }, [workoutsByWeek])

  // Add function to collapse all weeks
  const collapseAllWeeks = useCallback(() => {
    setExpandedWeeks([])
  }, [])

  // Handle description hover
  const handleDescriptionHover = (description: string) => {
    if (descriptionTimeoutRef.current) {
      clearTimeout(descriptionTimeoutRef.current)
    }
    descriptionTimeoutRef.current = setTimeout(() => {
      setHoveredDescription(description)
    }, 500)
  }

  // Handle description hover end
  const handleDescriptionHoverEnd = () => {
    if (descriptionTimeoutRef.current) {
      clearTimeout(descriptionTimeoutRef.current)
    }
    setHoveredDescription(null)
  }

  // Add this function to render the template cards based on screen size
  const renderTemplateCards = (templates: ProgressionTemplate[]) => {
    if (isMobile) {
      return (
        <div className="mt-4">
          <Swiper
            modules={[Navigation, SwiperPagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="progression-swiper"
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id} className="pb-4">
                <ProgressionCard
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={() => setSelectedTemplate(template.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )
    }

    return (
      <div className="progression-grid">
        {templates.map((template) => (
          <ProgressionCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => setSelectedTemplate(template.id)}
          />
        ))}
      </div>
    )
  }

  function ProgressionCard({
    template,
    isSelected,
    onSelect,
  }: {
    template: ProgressionTemplate
    isSelected: boolean
    onSelect: () => void
  }) {
    const maxValue = Math.max(...template.pattern)

    return (
      <Card
        className={`progression-card border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
          isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }`}
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-md ${
                  template.type === "linear"
                    ? "bg-indigo-100 dark:bg-indigo-900/50"
                    : template.type === "wave"
                      ? "bg-blue-100 dark:bg-blue-900/50"
                      : template.type === "step"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : "bg-purple-100 dark:bg-purple-900/50"
                }`}
              >
                {template.metric === "intensity" ? (
                  <Percent
                    className={`h-6 w-6 ${
                      template.type === "linear"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : template.type === "wave"
                          ? "text-blue-600 dark:text-blue-400"
                          : template.type === "step"
                            ? "text-green-600 dark:text-green-400"
                            : "text-purple-600 dark:text-purple-400"
                    }`}
                  />
                ) : (
                  <BarChart3
                    className={`h-6 w-6 ${
                      template.type === "linear"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : template.type === "wave"
                          ? "text-blue-600 dark:text-blue-400"
                          : template.type === "step"
                            ? "text-green-600 dark:text-green-400"
                            : "text-purple-600 dark:text-purple-400"
                    }`}
                  />
                )}
              </div>
              <div>
                <CardTitle className="text-base font-bold text-gray-900 dark:text-gray-50 line-clamp-1">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 capitalize text-xs">
                  {template.type} • {template.metric} • {template.duration} weeks
                </CardDescription>
              </div>
            </div>
            {template.status && (
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                template.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : template.status === "completed"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
              }`}
                >
                  {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
          {template.progress !== undefined && template.progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{template.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full ${
                    template.progress < 30 ? "bg-blue-500" : template.progress < 70 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${template.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="h-16 mb-2 flex items-end">
            {template.pattern.map((value, index) => {
              const height = (value / maxValue) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full max-w-[6px] rounded-t-sm mx-auto ${
                      template.type === "linear"
                        ? "bg-indigo-500"
                        : template.type === "wave"
                          ? "bg-blue-500"
                          : template.type === "step"
                            ? "bg-green-500"
                            : "bg-purple-500"
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              )
            })}
          </div>
          <div className="relative">
            <p
              className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 min-h-[2.5rem]"
              onMouseEnter={() => handleDescriptionHover(template.description)}
              onMouseLeave={handleDescriptionHoverEnd}
            >
              {template.description}
            </p>
            {hoveredDescription === template.description && (
              <div className="absolute z-10 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-w-xs">
                {template.description}
              </div>
            )}
          </div>
        </CardContent>

        <div className="flex flex-wrap items-center gap-2 mt-2 px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="h-5 w-5 mr-1" />
                  <span className="text-xs">{template.duration} weeks</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duration: {template.duration} weeks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span className="text-xs">Year-round</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Season: Year-round</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="h-5 w-5 mr-1" />
                  <span className="text-xs">All levels</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Athlete Level: All levels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <CardFooter className="pt-2 card-footer">
          <div className="card-actions">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="action-button border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Copy className="h-4 w-4 action-icon" />
                    <span className="button-text">Duplicate</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate this progression</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="action-button border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Eye className="h-4 w-4 action-icon" />
                    <span className="button-text">View</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View progression details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" className="action-button bg-blue-600 hover:bg-blue-700 text-white">
                    <Pencil className="h-4 w-4 action-icon" />
                    <span className="button-text">Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit this progression</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    )
  }

  const FloatingActionButton = () => {
    if (!isMobile) return null

    return (
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 z-10"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>
    )
  }

  // Calculate pagination values
  const totalItems = progressionTemplates.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Get current items for pagination
  const currentItems = progressionTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Define Progressions
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Create and manage training progressions for your athletes
          </p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white h-10"
            onClick={saveProgression}
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">Progression Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Add this right after the opening div of the CardContent in the main Progression Details card */}
              {showConfirmation && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-green-700 dark:text-green-300 flex items-center">
                  <div className="bg-green-100 dark:bg-green-800/30 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  Progression details updated successfully.
                </div>
              )}
              {/* Card-based layout for form elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Progression Name Card */}
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      Progression Name
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      id="progression-name"
                      value={progressionName}
                      onChange={(e) => setProgressionName(e.target.value)}
                      placeholder="e.g., 12-Week Intensity Progression"
                      className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base"
                    />
                  </CardContent>
                </Card>

                {/* Duration Card */}
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Duration (weeks)
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">
                              Defines the length of progression, typically aligned with training cycles.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Input
                      id="progression-duration"
                      type="number"
                      value={steps.length}
                      onChange={(e) => {
                        const newLength = Number.parseInt(e.target.value)
                        if (newLength > steps.length) {
                          // Add steps
                          const stepsToAdd = newLength - steps.length
                          const newSteps = [...steps]
                          for (let i = 0; i < stepsToAdd; i++) {
                            const newId = Math.max(...newSteps.map((step) => step.id)) + 1
                            const newWeek = Math.max(...newSteps.map((step) => step.week)) + 1
                            newSteps.push({ id: newId, week: newWeek, value: "50", unit: "%", description: "" })
                          }
                          setSteps(newSteps)
                        } else if (newLength < steps.length && newLength > 0) {
                          // Remove steps from the end
                          setSteps(steps.slice(0, newLength))
                        }
                      }}
                      min="1"
                      max="52"
                      className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base"
                    />
                  </CardContent>
                </Card>

                {/* Progression Type Card */}
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                      Progression Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select value={progressionType} onValueChange={setProgressionType} disabled={isProgressionSaved}>
                      <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base">
                        <SelectValue placeholder="Select progression type" />
                      </SelectTrigger>
                      <SelectContent>
                        {progressionTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                        {customProgressionType && (
                          <SelectItem value={customProgressionType.toLowerCase()}>{customProgressionType}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {!isProgressionSaved && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full text-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        onClick={() => setShowCustomTypeInput(!showCustomTypeInput)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Custom Type
                      </Button>
                    )}
                    {showCustomTypeInput && !isProgressionSaved && (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={customProgressionType}
                          onChange={(e) => {
                            setCustomProgressionType(e.target.value)
                            if (e.target.value.trim()) {
                              validateCustomProgressionType(e.target.value)
                            } else {
                              setCustomTypeError("")
                            }
                          }}
                          placeholder="Enter custom progression type"
                          className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base ${
                            customTypeError ? "border-red-500" : ""
                          }`}
                        />
                        {customTypeError && (
                          <div className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {customTypeError}
                          </div>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={handleAddCustomProgressionType}
                          disabled={!!customTypeError || !customProgressionType}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Workout Type Card */}
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Workout Type
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Workouts are filtered based on Progression Type</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select
                      value={workoutType}
                      onValueChange={setWorkoutType}
                      disabled={isProgressionSaved || !progressionType || progressionType === ""}
                    >
                      <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base">
                        <SelectValue placeholder="Select workout type" />
                      </SelectTrigger>
                      <SelectContent>
                        {getWorkoutTypesByProgressionType(progressionType).map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "_")}>
                            {type}
                          </SelectItem>
                        ))}
                        {customWorkoutType && (
                          <SelectItem value={customWorkoutType.toLowerCase().replace(/\s+/g, "_")}>
                            {customWorkoutType}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {!isProgressionSaved && progressionType && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full text-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        onClick={() => setShowCustomWorkoutInput(!showCustomWorkoutInput)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Custom Workout
                      </Button>
                    )}
                    {showCustomWorkoutInput && !isProgressionSaved && progressionType && (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={customWorkoutType}
                          onChange={(e) => {
                            setCustomWorkoutType(e.target.value)
                            if (e.target.value.trim()) {
                              validateCustomWorkoutType(e.target.value)
                            } else {
                              setCustomWorkoutError("")
                            }
                          }}
                          placeholder="Enter custom workout type"
                          className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 text-base ${
                            customWorkoutError ? "border-red-500" : ""
                          }`}
                        />
                        {customWorkoutError && (
                          <div className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {customWorkoutError}
                          </div>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={handleAddCustomWorkoutType}
                          disabled={!!customWorkoutError || !customWorkoutType}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Description Card */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="progression-description"
                    value={progressionDescription}
                    onChange={(e) => setProgressionDescription(e.target.value)}
                    placeholder="Describe the purpose and application of this progression..."
                    className="min-h-[100px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-base"
                  />
                </CardContent>
              </Card>

              {/* Progression Steps Card */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Progression Steps
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400 mr-3">
                          Total Weeks: {Object.keys(workoutsByWeek).length}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Total Workouts: {Object.values(workoutsByWeek).flat().length}
                        </span>
                      </div>
                    </div>
                    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center gap-2`}>
                      {!isMobile ? (
                        <>
                          <Button
                            onClick={expandAllWeeks}
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <ChevronsDown className="h-4 w-4 mr-1" />
                            Expand All
                          </Button>
                          <Button
                            onClick={collapseAllWeeks}
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <ChevronsUp className="h-4 w-4 mr-1" />
                            Collapse All
                          </Button>
                        </>
                      ) : (
                        <div className="flex gap-2 mb-2">
                          <Button
                            onClick={expandAllWeeks}
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 h-8 px-2"
                          >
                            <ChevronsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={collapseAllWeeks}
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 h-8 px-2"
                          >
                            <ChevronsUp className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Button
                        onClick={addNewWeek}
                        variant="outline"
                        size="sm"
                        className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Week
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {Object.keys(workoutsByWeek).length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <div className="mb-2">No weeks added yet</div>
                      <Button onClick={addNewWeek} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add First Week
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(workoutsByWeek)
                        .sort(([weekA], [weekB]) => Number(weekA) - Number(weekB))
                        .map(([week, workouts]) => (
                          <div
                            key={week}
                            id={`week-${week}`}
                            className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
                          >
                            <div
                              className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                              onClick={() => toggleWeekExpansion(Number(week))}
                            >
                              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                  {week}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                                    Week {week}
                                  </h3>
                                  {!expandedWeeks.includes(Number(week)) && workouts.length > 0 && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[200px] sm:max-w-none">
                                      {generateWeekSummary(workouts)}
                                    </p>
                                  )}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">
                                  {workouts.length} {workouts.length === 1 ? "workout" : "workouts"}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0 ml-auto">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-gray-500"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addWorkoutToWeek(Number(week))
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <motion.div
                                  className="text-gray-400"
                                  initial={false}
                                  animate={{ rotate: expandedWeeks.includes(Number(week)) ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown className="h-5 w-5" />
                                </motion.div>
                              </div>
                            </div>

                            {/* Week Content - Expandable with animation */}
                            <AnimatePresence initial={false}>
                              {expandedWeeks.includes(Number(week)) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                                  animate={{ height: "auto", opacity: 1, overflow: "visible" }}
                                  exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                  <div className="px-4 py-3">
                                    <div className="overflow-x-auto">
                                      {isMobile ? (
                                        <div className="space-y-4">
                                          {workouts.map((workout) => (
                                            <div
                                              key={workout.id}
                                              className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700"
                                            >
                                              <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-sm font-medium">Workout #{workout.id}</h4>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => removeWorkout(Number(week), workout.id)}
                                                  className="h-7 w-7 text-red-500"
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </div>
                                              <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Reps
                                                  </label>
                                                  <Input
                                                    value={workout.reps}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "reps",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Distance
                                                  </label>
                                                  <Input
                                                    value={workout.distance}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "distance",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Pace
                                                  </label>
                                                  <Input
                                                    value={workout.pace}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "pace",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Recovery
                                                  </label>
                                                  <Input
                                                    value={workout.recovery}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "recovery",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </div>
                                                <div className="col-span-2">
                                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Description
                                                  </label>
                                                  <Input
                                                    value={workout.description}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "description",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                    placeholder="Workout description"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <table className="w-full border-collapse">
                                          <thead>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                              <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Reps
                                                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  Count
                                                </span>
                                              </th>
                                              <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Distance
                                                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  Length
                                                </span>
                                              </th>
                                              <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Pace
                                                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  Intensity
                                                </span>
                                              </th>
                                              <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Recovery
                                                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  Rest
                                                </span>
                                              </th>
                                              <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Description
                                                <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  Notes
                                                </span>
                                              </th>
                                              <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                Actions
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {workouts.map((workout) => (
                                              <tr
                                                key={workout.id}
                                                className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                                              >
                                                <td className="py-2 px-3">
                                                  <Input
                                                    value={workout.reps}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "reps",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-16 h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </td>
                                                <td className="py-2 px-3">
                                                  <Input
                                                    value={workout.distance}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "distance",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-24 h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </td>
                                                <td className="py-2 px-3">
                                                  <Input
                                                    value={workout.pace}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "pace",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-20 h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </td>
                                                <td className="py-2 px-3">
                                                  <Input
                                                    value={workout.recovery}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "recovery",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-20 h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                  />
                                                </td>
                                                <td className="py-2 px-3">
                                                  <Input
                                                    value={workout.description}
                                                    onChange={(e) =>
                                                      updateWorkoutField(
                                                        Number(week),
                                                        workout.id,
                                                        "description",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-full h-9 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                                    placeholder="Workout description"
                                                  />
                                                </td>
                                                <td className="py-2 px-3 text-right">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeWorkout(Number(week), workout.id)}
                                                    className="h-8 w-8 text-red-500"
                                                  >
                                                    <Trash2 className="h-4 w-4" />
                                                  </Button>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      )}

                                      <div className="mt-4 flex justify-center">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => addWorkoutToWeek(Number(week))}
                                          className="text-sm w-full max-w-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 border-dashed border-gray-300 dark:border-gray-600"
                                        >
                                          <Plus className="h-4 w-4 mr-2" />
                                          {isMobile ? "Add Workout" : "Add Step"}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6"></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Progression Templates</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto flex whitespace-nowrap scrollbar-hide">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 px-4 py-2"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="intensity"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 px-4 py-2"
            >
              Intensity
            </TabsTrigger>
            <TabsTrigger
              value="volume"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 px-4 py-2"
            >
              Volume
            </TabsTrigger>
            <TabsTrigger
              value="distance"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 px-4 py-2"
            >
              Distance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm mb-4">
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">
                    {activeTemplates} Active {activeTemplates === 1 ? "Plan" : "Plans"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-2">
                    <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">
                    {completedTemplates} Completed {completedTemplates === 1 ? "Plan" : "Plans"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-2">
                    <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">
                    {draftTemplates} Draft {draftTemplates === 1 ? "Plan" : "Plans"}
                  </span>
                </div>
              </div>
            </div>

            {renderTemplateCards(currentItems)}

            {!isMobile && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>

          <TabsContent value="intensity" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm mb-4">
              <div className="flex items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-2">
                  <Percent className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium">
                  {progressionTemplates.filter((t) => t.metric === "intensity").length} Intensity Progressions
                </span>
              </div>
            </div>

            {renderTemplateCards(progressionTemplates.filter((t) => t.metric === "intensity"))}
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-2">
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">
                  {progressionTemplates.filter((t) => t.metric === "volume").length} Volume Progressions
                </span>
              </div>
            </div>

            {renderTemplateCards(progressionTemplates.filter((t) => t.metric === "volume"))}
          </TabsContent>

          <TabsContent value="distance" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm mb-4">
              <div className="flex items-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-ruler"
                  >
                    <path d="M20 10l-4 4a2 2 0 0 0-1 1v2a2 2 0 0 1 1 1l4 4" />
                    <path d="M4 14l4-4a2 2 0 0 1 1-1v-2a2 2 0 0 1-1-1L4 4" />
                    <path d="M12 4v16" />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  {progressionTemplates.filter((t) => t.metric === "distance").length} Distance Progressions
                </span>
              </div>
            </div>

            {renderTemplateCards(progressionTemplates.filter((t) => t.metric === "distance"))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Progression Type</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Once saved, this Progression Type cannot be edited. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end mt-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 text-base"
              onClick={() => setShowConfirmDialog(false)}
            >
              No
            </Button>
            <Button className="w-full sm:w-auto h-12 text-base" onClick={confirmAddCustomProgressionType}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FloatingActionButton />
    </div>
  )

  // Add global styles for Swiper
  useEffect(() => {
    // Add custom styles for Swiper and responsive cards
    const style = document.createElement("style")
    style.textContent = `
    .progression-swiper {
      padding-bottom: 40px !important;
    }
    .progression-swiper .swiper-pagination {
      bottom: 0 !important;
    }
    .progression-swiper .swiper-button-next,
    .progression-swiper .swiper-button-prev {
      color: var(--primary);
      transform: scale(0.7);
    }
    .progression-swiper .swiper-pagination-bullet-active {
      background: var(--primary);
    }
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    
    /* Responsive grid layout for progression cards */
    .progression-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
      gap: 1rem;
      width: 100%;
    }
    
    /* Card styling */
    .progression-card {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      min-width: 180px;
      min-height: 320px;
      margin: 0 auto;
      width: 100%;
      overflow: visible !important;
    }
    
    /* Card footer styling */
    .card-footer {
      margin-top: auto;
      padding-top: 0.5rem;
      }
    
    /* Card actions container */
    .card-actions {
      display: flex;
      width: 100%;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    /* Action button styling */
    .action-button {
      flex: 1;
      min-height: 2.5rem;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      padding: 0 0.5rem;
    }
    
    .action-icon {
      flex-shrink: 0;
    }
    
    .button-text {
      margin-left: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    /* Responsive button layouts */
    @media (max-width: 350px) {
      .button-text {
        display: none;
      }
      
      .action-button {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
      
      .action-icon {
        margin-right: 0;
      }
    }
    
    /* Stack buttons vertically when card width is small */
    @media (max-width: 200px) {
      .card-actions {
        flex-direction: column;
      }
      
      .action-button {
        width: 100%;
      }
    }
    
    /* Swiper slide padding to prevent button clipping */
    .swiper-slide {
      padding: 0 0.25rem 0.25rem 0.25rem;
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
}

