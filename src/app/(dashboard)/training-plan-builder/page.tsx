"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Copy, Download, Eye, HelpCircle, Info, Plus, Save, Upload, X } from "lucide-react"
import { TrainingPlanTable } from "@/components/training-plan-table"
import { ImportPlanDialog } from "@/components/import-plan-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/date-picker"
import { differenceInWeeks, format, parseISO } from "date-fns"

export default function TrainingPlanBuilderPage() {
  const router = useRouter()
  const [planName, setPlanName] = useState("Summer Training Plan")
  const [planDescription, setPlanDescription] = useState("12-week summer training plan for varsity runners")
  const [startDate, setStartDate] = useState<Date | undefined>(parseISO("2023-05-24"))
  const [endDate, setEndDate] = useState<Date | undefined>(parseISO("2023-08-15"))
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("plan")
  const [planType, setPlanType] = useState("xc")

  // Map plan type values to display names
  const planTypeNames = {
    xc: "Cross Country",
    track: "Track",
    road: "Road Racing",
    custom: "Custom",
  }

  // Calculate number of weeks based on start and end date
  const calculateWeeks = () => {
    if (!startDate || !endDate) return 12
    return Math.max(1, Math.ceil(differenceInWeeks(endDate, startDate)))
  }

  const [weeks, setWeeks] = useState(calculateWeeks())
  const [planDuration, setPlanDuration] = useState(`${weeks} weeks`)

  useEffect(() => {
    const calculatedWeeks = calculateWeeks()
    setWeeks(calculatedWeeks)
    setPlanDuration(`${calculatedWeeks} ${calculatedWeeks === 1 ? "week" : "weeks"}`)
  }, [startDate, endDate])

  // Workout types that will be columns in our table
  const workoutTypes = [
    {
      id: "green_vol",
      name: "Green Vol",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    },
    {
      id: "white_vol",
      name: "White Vol",
      color: "bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-300",
    },
    { id: "gold_vol", name: "Gold Vol", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300" },
    { id: "green_lr", name: "Green LR", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" },
    { id: "white_lr", name: "White LR", color: "bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-300" },
    { id: "gold_lr", name: "Gold LR", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300" },
    {
      id: "acceleration",
      name: "Acceleration Run",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    },
    { id: "tempo", name: "Tempo", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" },
    {
      id: "fartlek_new",
      name: "Fartlek (new runners)",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },
    {
      id: "fartlek_varsity",
      name: "Fartlek (Varsity)",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },
    { id: "5k_pace", name: "5k Pace", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300" },
    {
      id: "3200_pace",
      name: "3200 Pace",
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    },
    { id: "1600_pace", name: "1600 Pace", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
  ]

  // Generate initial plan data
  const generateInitialPlanData = () => {
    const data = []

    // Sample data to match the screenshot
    const seasonPhases = [
      { weeks: 2, name: "Transition Week" },
      { weeks: 7, name: "Summer Week" },
      { weeks: 1, name: "Cypress XC Relays" },
      { weeks: 1, name: "Cy Woods Inv mile" },
      { weeks: 1, name: "Friday Night Lights" },
      { weeks: 1, name: "Seven Lakes" },
      { weeks: 1, name: "Strake" },
      { weeks: 1, name: "SBISD" },
      { weeks: 1, name: "OFF" },
      { weeks: 1, name: "Klein" },
      { weeks: 1, name: "OFF" },
      { weeks: 1, name: "District" },
      { weeks: 1, name: "Regionals" },
      { weeks: 1, name: "OFF" },
      { weeks: 1, name: "State" },
    ]

    // Generate dates for each week
    const startDateObj = startDate || new Date()
    const currentDate = new Date(startDateObj)
    let weekCounter = 1
    let phaseIndex = 0
    let phaseWeekCounter = 1

    for (let i = 0; i < weeks; i++) {
      const weekStartDate = new Date(currentDate)
      const weekEndDate = new Date(currentDate)
      weekEndDate.setDate(weekEndDate.getDate() + 6)

      // Format dates as MM/DD
      const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`
      const dateRange = `${formatDate(weekStartDate)}-${formatDate(weekEndDate)}`

      // Determine season phase
      let seasonPhase = ""
      let seasonWeek = ""

      if (phaseIndex < seasonPhases.length) {
        seasonPhase = seasonPhases[phaseIndex].name
        if (seasonPhase.includes("Week")) {
          seasonWeek = seasonPhase.split(" ")[0] + " Week " + phaseWeekCounter
        } else {
          seasonWeek = seasonPhase
        }

        phaseWeekCounter++
        if (phaseWeekCounter > seasonPhases[phaseIndex].weeks) {
          phaseIndex++
          phaseWeekCounter = 1
        }
      }

      // Create week data
      const weekData = {
        id: i + 1,
        weekNumber: weekCounter,
        dateRange,
        seasonPhase: seasonWeek,
        workouts: {},
      }

      // Add sample workout data for the first few weeks to match screenshot
      if (i < 15) {
        if (i >= 2 && i <= 8) {
          // Summer weeks
          const intensity = 70 + Math.min(i - 2, 5) * 5 // Increase intensity each week
          weekData.workouts = {
            green_vol: i >= 2 ? `10m@${intensity}%` : "",
            white_vol: i >= 2 ? `5m@${intensity}%` : "",
            gold_vol: i >= 2 ? `7m@${intensity}%` : "",
            acceleration: i >= 2 ? `${3 + Math.min(i - 2, 2)}m AR` : "",
            tempo: i >= 2 ? `${2 + Math.min(i - 2, 2)}m@${81 + Math.min(i - 2, 4)}% w/1'` : "",
            fartlek_new: i >= 2 ? `1-2-1-2-1 w/1'30 H, last 1' (${7 + i} total)` : "",
            fartlek_varsity: i >= 2 ? `1-2-1-2-1-2 w/1'30 H, last 1' (${9 + i} total)` : "",
            "5k_pace": i >= 7 ? "Time Trial" : "",
          }
        }
      }

      data.push(weekData)

      // Move to next week
      currentDate.setDate(currentDate.getDate() + 7)
      weekCounter++
    }

    return data
  }

  const [planData, setPlanData] = useState(generateInitialPlanData())

  // Handle workout updates
  const updateWorkout = (weekId, workoutType, value) => {
    setPlanData((prevData) =>
      prevData.map((week) =>
        week.id === weekId ? { ...week, workouts: { ...week.workouts, [workoutType]: value } } : week,
      ),
    )
  }

  // Handle adding a new week
  const addWeek = () => {
    const lastWeek = planData[planData.length - 1]
    const newWeekNumber = lastWeek ? lastWeek.weekNumber + 1 : 1

    // Calculate new date range
    const lastWeekEndDate = lastWeek ? lastWeek.dateRange.split("-")[1] : ""
    const lastDate = lastWeekEndDate ? new Date(`2023/${lastWeekEndDate}`) : new Date()
    lastDate.setDate(lastDate.getDate() + 1)
    const newWeekEndDate = new Date(lastDate)
    newWeekEndDate.setDate(newWeekEndDate.getDate() + 6)

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`
    const dateRange = `${formatDate(lastDate)}-${formatDate(newWeekEndDate)}`

    const newWeek = {
      id: planData.length + 1,
      weekNumber: newWeekNumber,
      dateRange,
      seasonPhase: "New Phase",
      workouts: {},
    }

    setPlanData([...planData, newWeek])
    setWeeks(weeks + 1)
  }

  // Handle removing a week
  const removeWeek = (weekId) => {
    setPlanData((prevData) => prevData.filter((week) => week.id !== weekId))
    setWeeks(weeks - 1)
  }

  // Handle moving a week up or down
  const moveWeek = (weekId, direction) => {
    const weekIndex = planData.findIndex((week) => week.id === weekId)
    if ((direction === "up" && weekIndex === 0) || (direction === "down" && weekIndex === planData.length - 1)) {
      return
    }

    const newPlanData = [...planData]
    const targetIndex = direction === "up" ? weekIndex - 1 : weekIndex + 1

    // Swap the weeks
    ;[newPlanData[weekIndex], newPlanData[targetIndex]] = [newPlanData[targetIndex], newPlanData[weekIndex]]

    // Update week numbers
    newPlanData.forEach((week, index) => {
      week.weekNumber = index + 1
    })

    setPlanData(newPlanData)
  }

  const { toast } = useToast()

  // Handle exporting the plan
  const exportPlan = () => {
    const planJson = JSON.stringify(
      {
        name: planName,
        description: planDescription,
        startDate: startDate ? startDate.toISOString().split("T")[0] : "",
        endDate: endDate ? endDate.toISOString().split("T")[0] : "",
        weeks: planData,
      },
      null,
      2,
    )

    const blob = new Blob([planJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${planName.replace(/\s+/g, "_")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Show success toast
    toast({
      title: "Plan Exported",
      description: "Your training plan has been exported successfully.",
      variant: "success",
    })
  }

  // Handle importing a plan
  const importPlan = (importedPlan) => {
    if (importedPlan) {
      setPlanName(importedPlan.name || "Imported Plan")
      setPlanDescription(importedPlan.description || "")
      setStartDate(importedPlan.startDate ? parseISO(importedPlan.startDate) : undefined)
      setEndDate(importedPlan.endDate ? parseISO(importedPlan.endDate) : undefined)
      setPlanData(importedPlan.weeks || [])
      setWeeks(importedPlan.weeks?.length || 12)

      // Show success toast
      toast({
        title: "Plan Imported",
        description: "Your training plan has been imported successfully.",
        variant: "success",
      })
    }
    setShowImportDialog(false)
  }

  const [scrollContainer, setScrollContainer] = useState(null)

  // Add scroll shadow effect
  useEffect(() => {
    const container = document.querySelector(".overflow-x-auto.overflow-y-auto")
    setScrollContainer(container)

    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = container

      // Show left shadow when scrolled right
      const leftShadow = document.querySelector(".scroll-shadow-left")
      if (leftShadow) {
        leftShadow.style.opacity = scrollLeft > 10 ? "1" : "0"
      }

      // Show right shadow when more content to scroll right
      const rightShadow = document.querySelector(".scroll-shadow-right")
      if (rightShadow) {
        rightShadow.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? "1" : "0"
      }

      // Show top shadow when scrolled down
      const topShadow = document.querySelector(".scroll-shadow-top")
      if (topShadow) {
        topShadow.style.opacity = scrollTop > 10 ? "1" : "0"
      }

      // Show bottom shadow when more content to scroll down
      const bottomShadow = document.querySelector(".scroll-shadow-bottom")
      if (bottomShadow) {
        bottomShadow.style.opacity = scrollTop < scrollHeight - clientHeight - 10 ? "1" : "0"
      }
    }

    container.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [errors, setErrors] = useState({
    planName: false,
    startDate: false,
    endDate: false,
  })
  const [touched, setTouched] = useState({
    planName: false,
    startDate: false,
    endDate: false,
  })

  const validateForm = () => {
    const newErrors = {
      planName: !planName.trim(),
      startDate: !startDate,
      endDate: !endDate,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }))

    // Validate the specific field
    if (field === "planName") {
      setErrors((prev) => ({
        ...prev,
        planName: !planName.trim(),
      }))
    } else if (field === "startDate") {
      setErrors((prev) => ({
        ...prev,
        startDate: !startDate,
      }))
    } else if (field === "endDate") {
      setErrors((prev) => ({
        ...prev,
        endDate: !endDate,
      }))
    }
  }

  const handleSavePlan = () => {
    if (validateForm()) {
      // Simulate saving
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "Plan saved successfully",
        })
      }, 500)
    } else {
      // Set all fields as touched to show all errors
      setTouched({
        planName: true,
        startDate: true,
        endDate: true,
      })
    }
  }

  // Add this function before the return statement
  const handleCancel = () => {
    router.push("/training-plan")
  }

  // Format dates for preview
  const formatPreviewDate = (date) => {
    if (!date) return "Not set"
    return format(date, "MM/dd/yyyy")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 pb-24 md:pb-6 relative min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">Training Plan Builder</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create and customize training plans for your athletes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setShowImportDialog(true)}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">Import a Training Plan</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Import a previously exported plan or a plan shared by another coach
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={exportPlan}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">Export Your Training Plan</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Save your plan as a JSON file for backup or to share with other coaches
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto flex whitespace-nowrap">
          <TabsTrigger
            value="plan"
            className={cn(
              "transition-all duration-200",
              "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700",
              "data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-indigo-600",
              "data-[state=inactive]:hover:bg-gray-200/70 dark:data-[state=inactive]:hover:bg-gray-700/70",
            )}
          >
            Plan Details
          </TabsTrigger>
          <TabsTrigger
            value="workouts"
            className={cn(
              "transition-all duration-200",
              "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700",
              "data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-indigo-600",
              "data-[state=inactive]:hover:bg-gray-200/70 dark:data-[state=inactive]:hover:bg-gray-700/70",
            )}
          >
            Workout Builder
          </TabsTrigger>
          <TabsTrigger
            value="athletes"
            className={cn(
              "transition-all duration-200",
              "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700",
              "data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-indigo-600",
              "data-[state=inactive]:hover:bg-gray-200/70 dark:data-[state=inactive]:hover:bg-gray-700/70",
            )}
          >
            Assign Athletes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-4">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-50">Plan Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="plan-name" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    Plan Name <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p>Enter a descriptive name for your training plan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="plan-name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    onBlur={() => handleBlur("planName")}
                    className={cn(
                      "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                      errors.planName && touched.planName && "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                  {errors.planName && touched.planName && (
                    <p className="text-red-500 text-sm mt-1">Plan name is required</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-type" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    Plan Type
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p>Choose the sport or specific focus of your training plan:</p>
                          <ul className="list-disc pl-4 mt-1 text-sm">
                            <li>Cross Country: For XC season training</li>
                            <li>Track: For track season training</li>
                            <li>Road Racing: For road race preparation</li>
                            <li>Custom: For specialized training plans</li>
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Select defaultValue="xc" onValueChange={setPlanType} value={planType}>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xc">Cross Country</SelectItem>
                      <SelectItem value="track">Track</SelectItem>
                      <SelectItem value="road">Road Racing</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    Start Date <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Select the first day of your training plan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <DatePicker
                    date={startDate}
                    setDate={(date) => {
                      setStartDate(date)
                      handleBlur("startDate")
                    }}
                    error={errors.startDate && touched.startDate}
                    placeholder="Select start date"
                  />
                  {errors.startDate && touched.startDate && (
                    <p className="text-red-500 text-sm mt-1">Start date is required</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    End Date <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Select the last day of your training plan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <DatePicker
                    date={endDate}
                    setDate={(date) => {
                      setEndDate(date)
                      handleBlur("endDate")
                    }}
                    error={errors.endDate && touched.endDate}
                    placeholder="Select end date"
                  />
                  {errors.endDate && touched.endDate && (
                    <p className="text-red-500 text-sm mt-1">End date is required</p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Plan Duration: <span className="font-medium">{planDuration}</span>
                  </p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label
                    htmlFor="plan-description"
                    className="text-gray-700 dark:text-gray-300 flex items-center gap-1"
                  >
                    Description
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Add details about the purpose and goals of this training plan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="plan-description"
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                    className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Preview Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Plan Preview</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-wrap">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{planName || "Untitled Plan"}</h4>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {planTypeNames[planType]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">|</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formatPreviewDate(startDate)} - {formatPreviewDate(endDate)}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p>{planDescription || "No description provided"}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{planDuration}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Workouts</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{planData.length * 3} estimated</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Athletes</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Not assigned yet</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Training Schedule</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={addWeek}
                    variant="outline"
                    className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Week
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Add a new week to the end of your training plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
            {/* Table container with enhanced scrolling */}
            <div
              className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 transition-colors duration-150"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--scrollbar-thumb, rgba(156, 163, 175, 0.5)) transparent",
              }}
            >
              {/* Scroll indicator shadows */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-left"></div>
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-right"></div>
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-top"></div>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-200 scroll-shadow-bottom"></div>

              <TrainingPlanTable
                planData={planData}
                workoutTypes={workoutTypes}
                updateWorkout={updateWorkout}
                removeWeek={removeWeek}
                moveWeek={moveWeek}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-50">Workout Library</CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => router.push("/define-progressions")}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create New Progression
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Define a new workout progression for your training plans</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workoutLibrary.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="athletes" className="space-y-4">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-50">Assign Athletes</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Assign this training plan to individual athletes or groups</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select athletes or groups to assign this training plan to.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">Athlete Groups</Label>
                  <div className="space-y-2">
                    {athleteGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`group-${group.id}`}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label htmlFor={`group-${group.id}`} className="text-gray-700 dark:text-gray-300">
                          {group.name} ({group.count} athletes)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">Individual Athletes</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {athletes.map((athlete) => (
                      <div key={athlete.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`athlete-${athlete.id}`}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label htmlFor={`athlete-${athlete.id}`} className="text-gray-700 dark:text-gray-300">
                          {athlete.name} - {athlete.group}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Assign Plan to Selected Athletes
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Assign this plan to all selected athletes and groups</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fixed action buttons for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3 justify-end md:hidden z-10">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => router.push("/training-plan")}
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1" onClick={handleSavePlan}>
          <Save className="h-4 w-4 mr-1" />
          Save Plan
        </Button>
      </div>

      {/* Desktop action buttons */}
      <div className="hidden md:flex justify-end mt-6 gap-3">
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => router.push("/training-plan")}
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSavePlan}>
          <Save className="h-4 w-4 mr-1" />
          Save Plan
        </Button>
      </div>

      {showImportDialog && (
        <ImportPlanDialog isOpen={showImportDialog} onClose={() => setShowImportDialog(false)} onImport={importPlan} />
      )}
      <Toaster />
    </div>
  )
}

function WorkoutCard({ workout }) {
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-md ${
              workout.type === "tempo"
                ? "bg-indigo-100 dark:bg-indigo-900/50"
                : workout.type === "interval"
                  ? "bg-blue-100 dark:bg-blue-900/50"
                  : workout.type === "long_run"
                    ? "bg-green-100 dark:bg-green-900/50"
                    : "bg-purple-100 dark:bg-purple-900/50"
            }`}
          >
            <workout.icon
              className={`h-5 w-5 ${
                workout.type === "tempo"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : workout.type === "interval"
                    ? "text-blue-600 dark:text-blue-400"
                    : workout.type === "long_run"
                      ? "text-green-600 dark:text-green-400"
                      : "text-purple-600 dark:text-purple-400"
              }`}
            />
          </div>
          <div>
            <CardTitle className="text-base text-gray-900 dark:text-gray-50">{workout.name}</CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {workout.category} • {workout.duration}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{workout.description}</p>
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy workout to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data
import { CalendarIcon, Clock, Zap, Repeat } from "lucide-react"

const workoutLibrary = [
  {
    id: 1,
    name: "Tempo Run",
    type: "tempo",
    category: "Endurance",
    duration: "20-40 min",
    description: "Sustained effort at 80-85% of max heart rate to improve lactate threshold",
    icon: Clock,
  },
  {
    id: 2,
    name: "Interval 400m",
    type: "interval",
    category: "Speed",
    duration: "8-12 reps",
    description: "400m repeats at 5K pace with 1-2 min recovery between reps",
    icon: Repeat,
  },
  {
    id: 3,
    name: "Long Run",
    type: "long_run",
    category: "Endurance",
    duration: "60-90 min",
    description: "Easy effort run to build aerobic endurance and running economy",
    icon: CalendarIcon,
  },
  {
    id: 4,
    name: "Fartlek",
    type: "interval",
    category: "Mixed",
    duration: "30-45 min",
    description: "Speed play with alternating fast and easy segments",
    icon: Zap,
  },
  {
    id: 5,
    name: "Hill Repeats",
    type: "interval",
    category: "Strength",
    duration: "6-10 reps",
    description: "Uphill repeats to build strength and power",
    icon: Repeat,
  },
  {
    id: 6,
    name: "Recovery Run",
    type: "long_run",
    category: "Recovery",
    duration: "20-30 min",
    description: "Very easy effort to promote recovery between hard workouts",
    icon: CalendarIcon,
  },
]

const athleteGroups = [
  { id: 1, name: "Varsity Boys", count: 12 },
  { id: 2, name: "Varsity Girls", count: 10 },
  { id: 3, name: "JV Boys", count: 18 },
  { id: 4, name: "JV Girls", count: 15 },
  { id: 5, name: "Freshmen", count: 22 },
]

const athletes = [
  { id: 1, name: "Alex Johnson", group: "Varsity Boys" },
  { id: 2, name: "Emma Smith", group: "Varsity Girls" },
  { id: 3, name: "Michael Brown", group: "Varsity Boys" },
  { id: 4, name: "Sophia Davis", group: "Varsity Girls" },
  { id: 5, name: "Ethan Wilson", group: "JV Boys" },
  { id: 6, name: "Olivia Martinez", group: "JV Girls" },
  { id: 7, name: "Noah Anderson", group: "JV Boys" },
  { id: 8, name: "Ava Thompson", group: "JV Girls" },
  { id: 9, name: "William Garcia", group: "Freshmen" },
  { id: 10, name: "Isabella Rodriguez", group: "Freshmen" },
  { id: 11, name: "James Lee", group: "Varsity Boys" },
  { id: 12, name: "Charlotte Lewis", group: "Varsity Girls" },
]

