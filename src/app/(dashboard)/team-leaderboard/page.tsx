"use client"

import { useState, useMemo } from "react"
import { ArrowDown, ArrowUp, Medal, Minus, Search, Trophy, ArrowDownUp, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DateRangePicker } from "@/components/date-range-picker"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

// Mock data for the leaderboard
const mockAthletes = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Girls",
    volume: 42.5,
    completion: 98,
    accuracy: 95,
    trend: "up",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Boys",
    volume: 45.2,
    completion: 96,
    accuracy: 92,
    trend: "up",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Girls",
    volume: 38.7,
    completion: 94,
    accuracy: 90,
    trend: "down",
  },
  {
    id: 4,
    name: "Ethan Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "JV Boys",
    volume: 32.1,
    completion: 88,
    accuracy: 85,
    trend: "same",
  },
  {
    id: 5,
    name: "Olivia Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Girls",
    volume: 40.3,
    completion: 95,
    accuracy: 93,
    trend: "up",
  },
  {
    id: 6,
    name: "Noah Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Boys",
    volume: 43.8,
    completion: 92,
    accuracy: 89,
    trend: "down",
  },
  {
    id: 7,
    name: "Ava Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "JV Girls",
    volume: 30.5,
    completion: 65,
    accuracy: 82,
    trend: "up",
  },
  {
    id: 8,
    name: "Liam Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "JV Boys",
    volume: 33.9,
    completion: 87,
    accuracy: 84,
    trend: "same",
  },
  {
    id: 9,
    name: "Isabella Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Girls",
    volume: 39.2,
    completion: 93,
    accuracy: 91,
    trend: "up",
  },
  {
    id: 10,
    name: "Mason Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "Varsity Boys",
    volume: 44.6,
    completion: 97,
    accuracy: 94,
    trend: "up",
  },
  {
    id: 11,
    name: "James Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "JV Boys",
    volume: 28.3,
    completion: 68,
    accuracy: 75,
    trend: "down",
  },
  {
    id: 12,
    name: "Zoe Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    group: "JV Girls",
    volume: 25.7,
    completion: 72,
    accuracy: 78,
    trend: "same",
  },
]

export default function TeamLeaderboardPage() {
  const [athleteGroup, setAthleteGroup] = useState("all")
  const [metric, setMetric] = useState("volume")
  const [dateRange, setDateRange] = useState("this-week")
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("volume")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Get top 3 athletes by volume (regardless of current filters)
  const topVolumeAthletes = useMemo(() => {
    return [...mockAthletes]
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 3)
      .map((athlete) => athlete.id)
  }, [])

  // Sort and filter athletes based on selected criteria
  const filteredAthletes = useMemo(() => {
    return [...mockAthletes]
      .filter((athlete) => {
        const matchesGroup = athleteGroup === "all" || athlete.group.toLowerCase().includes(athleteGroup.toLowerCase())
        const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesGroup && matchesSearch
      })
      .sort((a, b) => {
        let valueA, valueB

        // Get the values to compare based on the sort column
        switch (sortColumn) {
          case "name":
            valueA = a.name.toLowerCase()
            valueB = b.name.toLowerCase()
            break
          case "group":
            valueA = a.group.toLowerCase()
            valueB = b.group.toLowerCase()
            break
          case "volume":
            valueA = a.volume
            valueB = b.volume
            break
          case "completion":
            valueA = a.completion
            valueB = b.completion
            break
          case "accuracy":
            valueA = a.accuracy
            valueB = b.accuracy
            break
          default:
            valueA = a.volume
            valueB = b.volume
        }

        // Compare the values based on sort direction
        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
        }
      })
  }, [athleteGroup, searchQuery, sortColumn, sortDirection])

  // Add a function to handle column header clicks for sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to descending for metrics, ascending for text
      setSortColumn(column)
      if (column === "name" || column === "group") {
        setSortDirection("asc")
      } else {
        setSortDirection("desc")
      }
    }
  }

  // Add a function to render sort indicators
  const renderSortIndicator = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
    }
    return <ArrowDownUp className="h-4 w-4 ml-1 opacity-30" />
  }

  // Determine row background color based on performance criteria
  const getRowClassName = (athlete: (typeof mockAthletes)[0]) => {
    // Low completion percentage gets priority (warning)
    if (athlete.completion < 70) {
      return "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30"
    }

    // Top 3 by volume
    if (topVolumeAthletes.includes(athlete.id)) {
      return "bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30"
    }

    return ""
  }

  // Render trend icon based on trend direction
  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case "same":
        return <Minus className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  // Render medal for top 3 ranks
  const renderRankMedal = (rank: number) => {
    if (rank === 1) {
      return <Medal className="h-5 w-5 text-yellow-500" />
    } else if (rank === 2) {
      return <Medal className="h-5 w-5 text-gray-400" />
    } else if (rank === 3) {
      return <Medal className="h-5 w-5 text-amber-700" />
    } else {
      return <span className="font-medium">{rank}</span>
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl">
          Track and compare athlete performance across different metrics and groups. Use the filters below to customize
          your view of the leaderboard.
        </p>
      </div>

      <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Performance Rankings
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Athlete Group</label>
              <Select value={athleteGroup} onValueChange={setAthleteGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="varsity boys">Varsity Boys</SelectItem>
                  <SelectItem value="varsity girls">Varsity Girls</SelectItem>
                  <SelectItem value="jv boys">JV Boys</SelectItem>
                  <SelectItem value="jv girls">JV Girls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Metric</label>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="completion">Completion %</SelectItem>
                  <SelectItem value="accuracy">Pace Accuracy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              {dateRange !== "custom" ? (
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex flex-col gap-2">
                  <DateRangePicker dateRange={customDateRange} onDateRangeChange={setCustomDateRange} />
                  <Button variant="outline" size="sm" onClick={() => setDateRange("this-week")} className="self-start">
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search athletes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Athlete
                      {renderSortIndicator("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSort("group")}
                  >
                    <div className="flex items-center">
                      Group
                      {renderSortIndicator("group")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSort("volume")}
                  >
                    <div className="flex items-center justify-end">
                      Volume (mi)
                      {renderSortIndicator("volume")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSort("completion")}
                  >
                    <div className="flex items-center justify-end">Completion %{renderSortIndicator("completion")}</div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSort("accuracy")}
                  >
                    <div className="flex items-center justify-end">
                      Pace Accuracy
                      {renderSortIndicator("accuracy")}
                    </div>
                  </TableHead>
                  <TableHead className="text-center w-[80px]">Trend</TableHead>
                  <TableHead className="min-w-[200px]">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Coach's Notes
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAthletes.map((athlete, index) => (
                  <TableRow key={athlete.id} className={cn(getRowClassName(athlete), "transition-colors")}>
                    <TableCell className="font-medium text-center">{renderRankMedal(index + 1)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={athlete.avatar} alt={athlete.name} />
                          <AvatarFallback>{athlete.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{athlete.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {athlete.group}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{athlete.volume.toFixed(1)}</TableCell>
                    <TableCell
                      className={cn("text-right", athlete.completion < 70 && "text-red-600 dark:text-red-400")}
                    >
                      {athlete.completion}%
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(athlete.accuracy > 90 && "font-bold")}>
                        {athlete.accuracy}%
                        {athlete.accuracy > 90 && (
                          <span className="ml-1 text-green-600 dark:text-green-400 inline-flex">✅</span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{renderTrendIcon(athlete.trend)}</TableCell>
                    <TableCell className="text-muted-foreground">Looking strong this week.</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <h3 className="font-medium">Legend:</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded"></div>
                <span>Top 3 by Volume</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded"></div>
                <span>Completion below 70%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">90%</span>
                <span>✅</span>
                <span>Pace Accuracy above 90%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

