"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Flag, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

// Mock data for athletes
const athletes = [
  {
    id: "1",
    name: "Alex Johnson",
    group: "Varsity Boys",
    recentVolume: "35 mi/week",
    pacingAccuracy: "92% last 4 workouts",
    lastRaceTime: "1600m in 5:12",
    keyStrengths: "Strong finish, consistent pacing",
  },
  {
    id: "2",
    name: "Emma Thompson",
    group: "Varsity Girls",
    recentVolume: "28 mi/week",
    pacingAccuracy: "88% last 4 workouts",
    lastRaceTime: "3200m in 11:45",
    keyStrengths: "Hill climbing, mental toughness",
  },
  {
    id: "3",
    name: "Michael Chen",
    group: "Varsity Boys",
    recentVolume: "32 mi/week",
    pacingAccuracy: "85% last 4 workouts",
    lastRaceTime: "800m in 2:05",
    keyStrengths: "Fast start, powerful kick",
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    group: "Varsity Girls",
    recentVolume: "30 mi/week",
    pacingAccuracy: "90% last 4 workouts",
    lastRaceTime: "5k in 19:22",
    keyStrengths: "Endurance, steady pace",
  },
  {
    id: "5",
    name: "Ethan Williams",
    group: "JV Boys",
    recentVolume: "25 mi/week",
    pacingAccuracy: "78% last 4 workouts",
    lastRaceTime: "1600m in 5:45",
    keyStrengths: "Determination, improving rapidly",
  },
  {
    id: "6",
    name: "Olivia Davis",
    group: "JV Girls",
    recentVolume: "22 mi/week",
    pacingAccuracy: "82% last 4 workouts",
    lastRaceTime: "3200m in 13:10",
    keyStrengths: "Consistent training, good form",
  },
  {
    id: "7",
    name: "Noah Martinez",
    group: "JV Boys",
    recentVolume: "27 mi/week",
    pacingAccuracy: "75% last 4 workouts",
    lastRaceTime: "800m in 2:18",
    keyStrengths: "Sprint speed, competitive drive",
  },
  {
    id: "8",
    name: "Ava Wilson",
    group: "JV Girls",
    recentVolume: "20 mi/week",
    pacingAccuracy: "80% last 4 workouts",
    lastRaceTime: "5k in 22:45",
    keyStrengths: "Pacing strategy, race awareness",
  },
  {
    id: "9",
    name: "William Taylor",
    group: "Varsity Boys",
    recentVolume: "38 mi/week",
    pacingAccuracy: "94% last 4 workouts",
    lastRaceTime: "1600m in 4:58",
    keyStrengths: "Technical skill, race experience",
  },
  {
    id: "10",
    name: "Isabella Brown",
    group: "Varsity Girls",
    recentVolume: "33 mi/week",
    pacingAccuracy: "91% last 4 workouts",
    lastRaceTime: "3200m in 11:20",
    keyStrengths: "Adaptability, strong middle sections",
  },
]

// Race distance options
const raceDistances = [
  { value: "800m", label: "800m" },
  { value: "1600m", label: "1600m" },
  { value: "3200m", label: "3200m" },
  { value: "5k", label: "5k" },
]

export default function CreateRacePlanPage() {
  const [athlete, setAthlete] = useState<string>("")
  const [raceDistance, setRaceDistance] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  // Race plan form state
  const [goalTime, setGoalTime] = useState("")
  const [openingStrategy, setOpeningStrategy] = useState("")
  const [midRaceStrategy, setMidRaceStrategy] = useState("")
  const [finishPlan, setFinishPlan] = useState("")
  const [mentalFocus, setMentalFocus] = useState("")
  const [watchouts, setWatchouts] = useState("")

  // Get selected athlete data
  const selectedAthlete = athletes.find((a) => a.id === athlete)

  // Handle AI generation
  const handleGeneratePlan = () => {
    if (!athlete || !raceDistance || !date) {
      // In a real app, you would show a toast or error message
      alert("Please select an athlete, race distance, and date first")
      return
    }

    setIsGenerating(true)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      // Mock data for different race distances
      let generatedPlan = {}

      if (raceDistance === "800m") {
        generatedPlan = {
          goalTime: "2:15",
          openingStrategy:
            "Start fast but controlled. Aim for 31-32 seconds for the first 200m. Establish good position early to avoid getting boxed in.",
          midRaceStrategy:
            "Maintain form through the backstretch. Focus on relaxed arms and shoulders. Hold your position and prepare for the final push.",
          finishPlan:
            "Begin your kick with 200m to go. Drive your arms and increase turnover for the final 100m. Lean at the finish line.",
          mentalFocus:
            "Stay confident and aggressive. Think 'quick and smooth' during the middle 400m. Embrace the discomfort in the final 200m.",
          watchouts:
            "Don't get boxed in early. Avoid starting too fast and hitting the wall at 600m. Watch for competitors making moves at the 400m mark.",
        }
      } else if (raceDistance === "1600m") {
        generatedPlan = {
          goalTime: "5:05",
          openingStrategy:
            "Controlled first 200m to avoid going out too fast. Settle into race pace by 300m. Find a good position in the pack.",
          midRaceStrategy:
            "Maintain consistent lap times through laps 2 and 3. Focus on relaxed breathing and efficient form. Stay engaged with the race.",
          finishPlan:
            "Begin gradually increasing pace at 1200m. Full acceleration with 200m to go. Drive arms and maintain form through the finish.",
          mentalFocus:
            "Break the race into 400m segments. Stay relaxed during the middle laps. Commit to your finish regardless of how you feel.",
          watchouts:
            "Don't get caught up in early surges. Watch for competitors making moves at the bell lap. Maintain form when fatigue sets in during lap 3.",
        }
      } else if (raceDistance === "3200m") {
        generatedPlan = {
          goalTime: "10:45",
          openingStrategy:
            "Controlled start, settling into rhythm by 400m. Find a sustainable pace and good position by the end of lap 1.",
          midRaceStrategy:
            "Maintain consistent splits through laps 2-6. Focus on relaxed breathing and efficient stride. Stay mentally engaged.",
          finishPlan:
            "Begin gradual acceleration at 2400m. Increase turnover with 400m to go. Final kick with 200m remaining.",
          mentalFocus:
            "Break the race into 800m segments. Stay present and focused on form. Embrace the discomfort in the final 800m.",
          watchouts:
            "Don't go out too fast. Be aware of pace changes around lap 4. Maintain form when fatigue sets in during laps 5-6.",
        }
      } else if (raceDistance === "5k") {
        generatedPlan = {
          goalTime: "18:30",
          openingStrategy:
            "Controlled first 800m. Find your rhythm and settle into goal pace by the 1k mark. Establish good position.",
          midRaceStrategy:
            "Lock into consistent pace through 2-4k. Focus on relaxed breathing and efficient stride. Stay mentally engaged with the race.",
          finishPlan:
            "Begin gradual acceleration at 4k. Increase turnover with 800m to go. Final kick with 400m remaining.",
          mentalFocus:
            "Break the race into 1k segments. Stay present and focused on form. Embrace the challenge in the 3-4k section.",
          watchouts:
            "Don't go out too fast. Be aware of course features that might affect pacing. Maintain form when fatigue sets in during the 4th kilometer.",
        }
      }

      // Update form state with generated plan
      setGoalTime(generatedPlan.goalTime || "")
      setOpeningStrategy(generatedPlan.openingStrategy || "")
      setMidRaceStrategy(generatedPlan.midRaceStrategy || "")
      setFinishPlan(generatedPlan.finishPlan || "")
      setMentalFocus(generatedPlan.mentalFocus || "")
      setWatchouts(generatedPlan.watchouts || "")

      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="container py-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Flag className="h-6 w-6 text-red-500" />
          Create Race Plan
        </h1>
        <p className="text-muted-foreground">Build a personalized race strategy for an individual athlete.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Race Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Athlete Selection */}
                <div className="space-y-2">
                  <Label htmlFor="athlete">Athlete</Label>
                  <Select value={athlete} onValueChange={setAthlete}>
                    <SelectTrigger id="athlete">
                      <SelectValue placeholder="Select Athlete" />
                    </SelectTrigger>
                    <SelectContent>
                      {athletes.map((athlete) => (
                        <SelectItem key={athlete.id} value={athlete.id}>
                          {athlete.name} ({athlete.group})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Race Distance Selection */}
                <div className="space-y-2">
                  <Label htmlFor="distance">Race Distance</Label>
                  <Select value={raceDistance} onValueChange={setRaceDistance}>
                    <SelectTrigger id="distance">
                      <SelectValue placeholder="Select Race Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {raceDistances.map((distance) => (
                        <SelectItem key={distance.value} value={distance.value}>
                          {distance.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label htmlFor="date">Race Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select Race Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Race Plan Card */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Race Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* AI Generation Button */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={handleGeneratePlan}
                    disabled={isGenerating || !athlete || !raceDistance || !date}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating Plan..." : "Generate Plan with AI"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    AI will generate a custom plan based on the athlete's training data.
                  </p>
                </div>

                <Separator />

                {/* Goal Time */}
                <div className="space-y-2">
                  <Label htmlFor="goal-time">Goal Time</Label>
                  <Input
                    id="goal-time"
                    placeholder="Enter your target race time."
                    value={goalTime}
                    onChange={(e) => setGoalTime(e.target.value)}
                  />
                </div>

                {/* Opening Pace Strategy */}
                <div className="space-y-2">
                  <Label htmlFor="opening-strategy">Opening Pace Strategy</Label>
                  <Textarea
                    id="opening-strategy"
                    placeholder="Describe your plan for the initial phase of the race."
                    className="min-h-[100px]"
                    value={openingStrategy}
                    onChange={(e) => setOpeningStrategy(e.target.value)}
                  />
                </div>

                {/* Mid-Race Strategy */}
                <div className="space-y-2">
                  <Label htmlFor="mid-race-strategy">Mid-Race Strategy</Label>
                  <Textarea
                    id="mid-race-strategy"
                    placeholder="Outline your approach for the middle portion of the race."
                    className="min-h-[100px]"
                    value={midRaceStrategy}
                    onChange={(e) => setMidRaceStrategy(e.target.value)}
                  />
                </div>

                {/* Finish Plan */}
                <div className="space-y-2">
                  <Label htmlFor="finish-plan">Finish Plan</Label>
                  <Textarea
                    id="finish-plan"
                    placeholder="Detail your strategy for the final stretch of the race."
                    className="min-h-[100px]"
                    value={finishPlan}
                    onChange={(e) => setFinishPlan(e.target.value)}
                  />
                </div>

                {/* Mental Focus */}
                <div className="space-y-2">
                  <Label htmlFor="mental-focus">Mental Focus</Label>
                  <Textarea
                    id="mental-focus"
                    placeholder="Describe your mental approach to the race."
                    className="min-h-[100px]"
                    value={mentalFocus}
                    onChange={(e) => setMentalFocus(e.target.value)}
                  />
                </div>

                {/* Watchouts */}
                <div className="space-y-2">
                  <Label htmlFor="watchouts">Watchouts</Label>
                  <Textarea
                    id="watchouts"
                    placeholder="List any potential challenges or concerns."
                    className="min-h-[100px]"
                    value={watchouts}
                    onChange={(e) => setWatchouts(e.target.value)}
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button className="w-full sm:w-auto">Save Race Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Athlete Summary Panel - Collapsible */}
        <div className={cn("transition-all duration-300 ease-in-out", isPanelOpen ? "w-full lg:w-80" : "w-12")}>
          <div className="sticky top-6">
            <div className="flex">
              <Button
                variant="outline"
                size="icon"
                className="h-12 rounded-r-none border-r-0"
                onClick={() => setIsPanelOpen(!isPanelOpen)}
              >
                {isPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>

              <Card
                className={cn(
                  "border-gray-200 dark:border-gray-700 rounded-l-none flex-1 transition-all duration-300 ease-in-out overflow-hidden",
                  isPanelOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 border-0",
                )}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    Athlete Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAthlete ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedAthlete.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {selectedAthlete.group}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Recent Volume</Label>
                          <p className="font-medium">{selectedAthlete.recentVolume}</p>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Pacing Accuracy</Label>
                          <p className="font-medium">{selectedAthlete.pacingAccuracy}</p>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Last Race Time</Label>
                          <p className="font-medium">{selectedAthlete.lastRaceTime}</p>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Key Strengths</Label>
                          <p className="font-medium">{selectedAthlete.keyStrengths}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Select an athlete to view summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

