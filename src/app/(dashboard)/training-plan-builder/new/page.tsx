"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Copy, Plus } from "lucide-react"

export default function NewTrainingPlanPage() {
  const router = useRouter()

  const handleCreatePlan = () => {
    router.push("/training-plan-builder")
  }

  const handleUseTemplate = (templateId) => {
    router.push("/training-plan-builder")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Create New Training Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Start from scratch or use a template</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm md:col-span-3">
          <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                <Plus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-gray-50">Create New Plan</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="plan-name" className="text-gray-700 dark:text-gray-300">
                  Plan Name
                </Label>
                <Input
                  id="plan-name"
                  placeholder="e.g., Summer Training Plan"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-type" className="text-gray-700 dark:text-gray-300">
                  Plan Type
                </Label>
                <Select defaultValue="xc">
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
                <Label htmlFor="start-date" className="text-gray-700 dark:text-gray-300">
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">
                  Duration (weeks)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  defaultValue="12"
                  min="1"
                  max="52"
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleCreatePlan} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Create New Plan
            </Button>
          </CardFooter>
        </Card>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 md:col-span-3 mt-4">Plan Templates</h2>

        {planTemplates.map((template) => (
          <Card
            key={template.id}
            className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-900 dark:text-gray-50">{template.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {template.type} • {template.duration} weeks
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{template.description}</p>
            </CardContent>
            <CardFooter className="pt-2 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => {}}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => handleUseTemplate(template.id)}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Sample plan templates
const planTemplates = [
  {
    id: 1,
    name: "Cross Country Season",
    type: "Cross Country",
    duration: 16,
    description:
      "Complete cross country season plan with base building, race preparation, and championship peaking phases.",
  },
  {
    id: 2,
    name: "Track Season - Distance",
    type: "Track",
    duration: 14,
    description:
      "Track season plan focused on 800m to 3200m events with appropriate progressions and race-specific workouts.",
  },
  {
    id: 3,
    name: "Summer Base Building",
    type: "Off-Season",
    duration: 12,
    description:
      "Summer training plan focused on building aerobic base and strength for the upcoming cross country season.",
  },
  {
    id: 4,
    name: "5K Road Race",
    type: "Road Racing",
    duration: 8,
    description: "8-week plan to prepare for a 5K road race with appropriate progressions and race-specific workouts.",
  },
  {
    id: 5,
    name: "Half Marathon",
    type: "Road Racing",
    duration: 12,
    description: "12-week plan to prepare for a half marathon with long runs and appropriate endurance workouts.",
  },
  {
    id: 6,
    name: "Indoor Track Season",
    type: "Track",
    duration: 10,
    description: "Indoor track season plan with focus on building strength and speed for the upcoming outdoor season.",
  },
]

