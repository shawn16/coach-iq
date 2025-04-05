"use client"

import { useState } from "react"
import { Settings, User, Calendar, Activity, Palette, Save, Info, Plus, Trash2, X, Edit, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ImageUploader } from "@/components/image-uploader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the type for a performance zone
interface PerformanceZone {
  id: string
  name: string
  startPercent: number
  endPercent: number
  color: string
}

// Available colors for zone color tags
const zoneColors = [
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Red", value: "red" },
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
  { name: "Teal", value: "teal" },
]

// Color to CSS class mapping
const colorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
}

// Define the type for an athlete group
interface AthleteGroup {
  id: string
  name: string
  isEditing?: boolean
}

// Define the type for a race distance
interface RaceDistance {
  id: string
  name: string
  selected: boolean
}

// Define the type for a label color
interface LabelColor {
  name: string
  color: string
}

export default function SettingsPage() {
  // Initial performance zones
  const [performanceZones, setPerformanceZones] = useState<PerformanceZone[]>([
    { id: "1", name: "Aerobic", startPercent: 70, endPercent: 80, color: "green" },
    { id: "2", name: "Threshold", startPercent: 88, endPercent: 92, color: "orange" },
    { id: "3", name: "Speed", startPercent: 95, endPercent: 100, color: "red" },
  ])

  // Initial athlete groups
  const [athleteGroups, setAthleteGroups] = useState<AthleteGroup[]>([
    { id: "1", name: "Varsity Boys" },
    { id: "2", name: "Varsity Girls" },
    { id: "3", name: "JV Boys" },
    { id: "4", name: "JV Girls" },
  ])

  // New group name input
  const [newGroupName, setNewGroupName] = useState("")

  // Initial race distances
  const [raceDistances, setRaceDistances] = useState<RaceDistance[]>([
    { id: "1", name: "800m", selected: true },
    { id: "2", name: "1600m", selected: true },
    { id: "3", name: "3200m", selected: true },
    { id: "4", name: "5k", selected: true },
    { id: "5", name: "XC 5k", selected: true },
  ])

  // Initial label colors
  const [labelColors, setLabelColors] = useState<LabelColor[]>([
    { name: "Green", color: "#10b981" },
    { name: "White", color: "#f9fafb" },
    { name: "Gold", color: "#f59e0b" },
  ])

  // AI suggestions toggle
  const [enableAI, setEnableAI] = useState(true)

  // Function to add a new zone
  const addZone = () => {
    const newId = (performanceZones.length + 1).toString()
    const newZone: PerformanceZone = {
      id: newId,
      name: "New Zone",
      startPercent: 80,
      endPercent: 85,
      color: "blue",
    }
    setPerformanceZones([...performanceZones, newZone])
  }

  // Function to update a zone
  const updateZone = (id: string, field: keyof PerformanceZone, value: any) => {
    setPerformanceZones((zones) => zones.map((zone) => (zone.id === id ? { ...zone, [field]: value } : zone)))
  }

  // Function to delete a zone
  const deleteZone = (id: string) => {
    setPerformanceZones((zones) => zones.filter((zone) => zone.id !== id))
  }

  // Function to add a new athlete group
  const addAthleteGroup = () => {
    if (newGroupName.trim() === "") return

    const newId = (athleteGroups.length + 1).toString()
    const newGroup: AthleteGroup = {
      id: newId,
      name: newGroupName,
    }
    setAthleteGroups([...athleteGroups, newGroup])
    setNewGroupName("")
  }

  // Function to start editing a group
  const startEditingGroup = (id: string) => {
    setAthleteGroups((groups) => groups.map((group) => (group.id === id ? { ...group, isEditing: true } : group)))
  }

  // Function to update a group
  const updateGroup = (id: string, name: string) => {
    setAthleteGroups((groups) =>
      groups.map((group) => (group.id === id ? { ...group, name, isEditing: false } : group)),
    )
  }

  // Function to delete a group
  const deleteGroup = (id: string) => {
    setAthleteGroups((groups) => groups.filter((group) => group.id !== id))
  }

  // Function to toggle race distance selection
  const toggleRaceDistance = (id: string) => {
    setRaceDistances((distances) =>
      distances.map((distance) => (distance.id === id ? { ...distance, selected: !distance.selected } : distance)),
    )
  }

  // Function to update label color
  const updateLabelColor = (name: string, color: string) => {
    setLabelColors((colors) => colors.map((c) => (c.name === name ? { ...c, color } : c)))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8 text-gray-500" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your coaching preferences, performance zones, and default behaviors across the app.
        </p>
      </div>

      <Tabs defaultValue="coach-profile" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="coach-profile" className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Coach Profile</span>
            <span className="sm:hidden">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="training-defaults" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="hidden sm:inline">Training Defaults</span>
            <span className="sm:hidden">Training</span>
          </TabsTrigger>
          <TabsTrigger value="performance-zones" className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="hidden sm:inline">Performance Zones</span>
            <span className="sm:hidden">Zones</span>
          </TabsTrigger>
          <TabsTrigger value="customization" className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Customization Settings</span>
            <span className="sm:hidden">Customize</span>
          </TabsTrigger>
        </TabsList>

        {/* Coach Profile Tab Content */}
        <TabsContent value="coach-profile">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle>Coach Profile</CardTitle>
              </div>
              <CardDescription>Manage your coaching profile information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Personal Information</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coachName">Coach Name</Label>
                    <Input id="coachName" placeholder="Enter your full name" defaultValue="Coach Smith" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolTeamName">School / Team Name</Label>
                    <Input
                      id="schoolTeamName"
                      placeholder="Enter your school or team name"
                      defaultValue="Riverside High School"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Default Preferences</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultUnits">Default Units</Label>
                    <Select defaultValue="miles">
                      <SelectTrigger id="defaultUnits" className="w-full">
                        <SelectValue placeholder="Select default units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">Miles</SelectItem>
                        <SelectItem value="kilometers">Kilometers</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose your preferred distance unit for workouts and reports.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Default Time Format</Label>
                    <Select defaultValue="mmss">
                      <SelectTrigger id="timeFormat" className="w-full">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mmss">MM:SS</SelectItem>
                        <SelectItem value="hmmss">H:MM:SS</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose how time will be displayed throughout the app.
                    </p>
                  </div>
                </div>
              </div>

              {/* School Logo Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">School Branding</h3>

                <div className="space-y-2">
                  <Label htmlFor="schoolLogo">Upload School Logo</Label>
                  <ImageUploader
                    id="schoolLogo"
                    defaultImage="/placeholder.svg?height=100&width=100"
                    maxSizeMB={2}
                    aspectRatio="1:1"
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Optional. Upload your school or team logo (max 2MB, square format recommended).
                  </p>
                </div>
              </div>

              <Button className="mt-6 w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Defaults Tab Content */}
        <TabsContent value="training-defaults">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                <CardTitle>Training Defaults</CardTitle>
              </div>
              <CardDescription>Set default parameters for your training plans and workouts.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="defaultDuration">Default Workout Duration</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="defaultDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultRest">Default Rest Period</Label>
                  <Select defaultValue="2">
                    <SelectTrigger id="defaultRest">
                      <SelectValue placeholder="Select rest period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="2">2 minutes</SelectItem>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="4">4 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Default Training Days</Label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-sm text-gray-500">{day}</div>
                        <Switch defaultChecked={index < 5} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="mt-4" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Training Defaults
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Zones Tab Content */}
        <TabsContent value="performance-zones">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
                <CardTitle>Performance Zones</CardTitle>
              </div>
              <CardDescription>Define and customize performance zones for your athletes.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 space-y-6">
              {/* Pace-Based Zones Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Pace-Based Zones (% of 1600m Pace)
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Define custom training zones based on percentage of an athlete's 1600m pace. These zones will
                          be used for workout prescriptions and analysis.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Zone Name</TableHead>
                        <TableHead className="w-[100px] text-center">Start %</TableHead>
                        <TableHead className="w-[100px] text-center">End %</TableHead>
                        <TableHead className="w-[120px]">Color Tag</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performanceZones.map((zone) => (
                        <TableRow key={zone.id}>
                          <TableCell>
                            <Input
                              value={zone.name}
                              onChange={(e) => updateZone(zone.id, "name", e.target.value)}
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="200"
                              value={zone.startPercent}
                              onChange={(e) => updateZone(zone.id, "startPercent", Number.parseInt(e.target.value))}
                              className="h-8 w-16 text-center mx-auto"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="200"
                              value={zone.endPercent}
                              onChange={(e) => updateZone(zone.id, "endPercent", Number.parseInt(e.target.value))}
                              className="h-8 w-16 text-center mx-auto"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${colorClasses[zone.color]}`}></div>
                              <Select value={zone.color} onValueChange={(value) => updateZone(zone.id, "color", value)}>
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {zoneColors.map((color) => (
                                    <SelectItem key={color.value} value={color.value}>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${colorClasses[color.value]}`}></div>
                                        <span>{color.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => deleteZone(zone.id)} className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button variant="outline" onClick={addZone} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Zone
                </Button>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    <span>
                      Example: If an athlete's 1600m pace is 6:00/mile, a zone of 70-80% would be 8:34-7:30/mile.
                    </span>
                  </p>
                </div>
              </div>

              {/* Heart Rate Zones Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Heart Rate Zones (% of Max HR)
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zone 1 (Recovery)</span>
                      <span className="text-sm text-gray-500">60-70%</span>
                    </div>
                    <Slider defaultValue={[60, 70]} min={50} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zone 2 (Endurance)</span>
                      <span className="text-sm text-gray-500">70-80%</span>
                    </div>
                    <Slider defaultValue={[70, 80]} min={50} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zone 3 (Tempo)</span>
                      <span className="text-sm text-gray-500">80-87%</span>
                    </div>
                    <Slider defaultValue={[80, 87]} min={50} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zone 4 (Threshold)</span>
                      <span className="text-sm text-gray-500">87-93%</span>
                    </div>
                    <Slider defaultValue={[87, 93]} min={50} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zone 5 (VO2 Max)</span>
                      <span className="text-sm text-gray-500">93-100%</span>
                    </div>
                    <Slider defaultValue={[93, 100]} min={50} max={100} step={1} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxHR">Default Max Heart Rate Calculation</Label>
                  <Select defaultValue="220-age">
                    <SelectTrigger id="maxHR">
                      <SelectValue placeholder="Select calculation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="220-age">220 - Age</SelectItem>
                      <SelectItem value="208-0.7*age">208 - (0.7 × Age)</SelectItem>
                      <SelectItem value="211-0.64*age">211 - (0.64 × Age)</SelectItem>
                      <SelectItem value="custom">Custom Formula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="mt-6 w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Performance Zones
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization Settings Tab Content */}
        <TabsContent value="customization">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <CardTitle>Customization Settings</CardTitle>
              </div>
              <CardDescription>Personalize the app's appearance and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 space-y-6">
              {/* Default Athlete Groups Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Default Athlete Groups</h3>

                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      {athleteGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between">
                          {group.isEditing ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                value={group.name}
                                onChange={(e) => updateGroup(group.id, e.target.value)}
                                className="h-8"
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateGroup(group.id, group.name)}
                                className="h-8 w-8"
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="px-3 py-1 text-sm">
                                {group.name}
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-center gap-1">
                            {!group.isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEditingGroup(group.id)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4 text-gray-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteGroup(group.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Add new group..."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="h-9"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addAthleteGroup()
                          }
                        }}
                      />
                      <Button onClick={addAthleteGroup} className="shrink-0">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Define athlete groups that will be available throughout the app for organizing athletes and
                    filtering reports.
                  </p>
                </div>
              </div>

              {/* Default Race Distances Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Default Race Distances</h3>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {raceDistances.map((distance) => (
                      <Badge
                        key={distance.id}
                        variant={distance.selected ? "default" : "outline"}
                        className="px-3 py-1.5 text-sm cursor-pointer"
                        onClick={() => toggleRaceDistance(distance.id)}
                      >
                        {distance.name}
                        {distance.selected && <X className="h-3 w-3 ml-1 text-white" />}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Select the race distances that will be available for race planning and results tracking.
                  </p>
                </div>
              </div>

              {/* Customize Label Colors Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Customize Label Colors</h3>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {labelColors.map((label) => (
                      <div key={label.name} className="space-y-2">
                        <Label>{label.name} Tag</Label>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded border" style={{ backgroundColor: label.color }}></div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                                Change Color
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="space-y-2">
                                <h4 className="font-medium">Select {label.name} Color</h4>
                                <Separator />
                                <div className="grid grid-cols-5 gap-2">
                                  {[
                                    "#ef4444",
                                    "#f97316",
                                    "#f59e0b",
                                    "#eab308",
                                    "#84cc16",
                                    "#22c55e",
                                    "#10b981",
                                    "#14b8a6",
                                    "#06b6d4",
                                    "#0ea5e9",
                                    "#3b82f6",
                                    "#6366f1",
                                    "#8b5cf6",
                                    "#a855f7",
                                    "#d946ef",
                                    "#ec4899",
                                    "#f43f5e",
                                    "#64748b",
                                    "#1f2937",
                                    "#f9fafb",
                                  ].map((color) => (
                                    <div
                                      key={color}
                                      className="w-8 h-8 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                      style={{ backgroundColor: color }}
                                      onClick={() => updateLabelColor(label.name, color)}
                                    ></div>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <Label htmlFor={`custom-${label.name}`} className="text-xs">
                                    Custom:
                                  </Label>
                                  <Input
                                    id={`custom-${label.name}`}
                                    type="text"
                                    value={label.color}
                                    onChange={(e) => updateLabelColor(label.name, e.target.value)}
                                    className="h-8"
                                  />
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Customize the colors used for workout tags throughout the app.
                  </p>
                </div>
              </div>

              {/* AI Features Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">AI Features</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableAI">Enable AI Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow the app to provide AI-powered suggestions for workouts and training plans.
                      </p>
                    </div>
                    <Switch id="enableAI" checked={enableAI} onCheckedChange={setEnableAI} />
                  </div>
                </div>
              </div>

              {/* Theme Preferences Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Theme Preferences</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme Mode</Label>
                    <Select defaultValue="system">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="units">Measurement Units</Label>
                    <Select defaultValue="imperial">
                      <SelectTrigger id="units">
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imperial">Imperial (mi, lb)</SelectItem>
                        <SelectItem value="metric">Metric (km, kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Customization Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

