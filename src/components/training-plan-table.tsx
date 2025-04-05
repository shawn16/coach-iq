"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react"
import { AddWorkoutDialog } from "@/components/add-workout-dialog"

export function TrainingPlanTable({ planData, workoutTypes, updateWorkout, removeWeek, moveWeek }) {
  const [editingCell, setEditingCell] = useState<{ weekId: number; workoutType: string } | null>(null)
  const [editValue, setEditValue] = useState("")
  const [showAddWorkoutDialog, setShowAddWorkoutDialog] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ weekId: number; workoutType: string } | null>(null)

  useEffect(() => {
    // Apply smooth scrolling to all scrollable containers
    const scrollContainers = document.querySelectorAll(".table-scroll-container")
    scrollContainers.forEach((container) => {
      container.style.scrollBehavior = "smooth"
    })
  }, [])

  const handleCellClick = (weekId, workoutType, currentValue) => {
    setEditingCell({ weekId, workoutType })
    setEditValue(currentValue || "")
  }

  const handleCellBlur = () => {
    if (editingCell) {
      updateWorkout(editingCell.weekId, editingCell.workoutType, editValue)
      setEditingCell(null)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCellBlur()
    } else if (e.key === "Escape") {
      setEditingCell(null)
    }
  }

  const openAddWorkoutDialog = (weekId, workoutType) => {
    setSelectedCell({ weekId, workoutType })
    setShowAddWorkoutDialog(true)
  }

  const handleAddWorkout = (workout) => {
    if (selectedCell) {
      updateWorkout(selectedCell.weekId, selectedCell.workoutType, workout)
    }
    setShowAddWorkoutDialog(false)
  }

  // Get color class for season phase
  const getSeasonPhaseColor = (phase) => {
    if (phase.includes("Transition")) return "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
    if (phase.includes("Summer")) return "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
    if (phase.includes("OFF")) return "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
    if (phase.includes("Relays") || phase.includes("Inv"))
      return "bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
    return "bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-300"
  }

  return (
    <div className="relative shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex">
        {/* Fixed columns section */}
        <div className="flex-none w-[350px]">
          {/* Fixed headers */}
          <div className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="grid grid-cols-[80px_120px_150px] h-12">
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center">
                Week
              </div>
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center">
                Dates
              </div>
              <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center border-r-2 border-r-gray-300 dark:border-r-gray-700">
                Phase
              </div>
            </div>
          </div>

          {/* Fixed data rows */}
          {planData.map((week) => (
            <div
              key={`fixed-${week.id}`}
              className="grid grid-cols-[80px_120px_150px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-3 flex items-center font-medium h-14">{week.weekNumber}</div>
              <div className="px-4 py-3 flex items-center h-14">{week.dateRange}</div>
              <div className="px-4 py-3 flex items-center h-14 border-r-2 border-r-gray-300 dark:border-r-gray-700">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeasonPhaseColor(week.seasonPhase)}`}>
                  {week.seasonPhase}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable columns section - single scroll container for all rows */}
        <div className="overflow-x-auto flex-grow table-scroll-container">
          <div className="min-w-max">
            {/* Scrollable headers */}
            <div className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex h-12">
                {workoutTypes.map((type) => (
                  <div
                    key={type.id}
                    className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center whitespace-nowrap w-[150px]"
                  >
                    {type.name}
                  </div>
                ))}
                <div className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 px-4 py-3 flex items-center whitespace-nowrap w-[120px]">
                  Actions
                </div>
              </div>
            </div>

            {/* Scrollable data rows */}
            {planData.map((week) => (
              <div
                key={`scroll-${week.id}`}
                className="flex bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
              >
                {workoutTypes.map((type) => (
                  <div
                    key={`${week.id}-${type.id}`}
                    className="px-4 py-3 flex items-center w-[150px] h-14 cursor-pointer"
                    onClick={() => handleCellClick(week.id, type.id, week.workouts[type.id] || "")}
                  >
                    {editingCell?.weekId === week.id && editingCell?.workoutType === type.id ? (
                      <div className="flex w-full">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="h-8 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 ml-1 flex-shrink-0"
                          onClick={() => openAddWorkoutDialog(week.id, type.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className={`px-2 py-1 rounded text-xs w-full ${week.workouts[type.id] ? type.color : ""}`}>
                        {week.workouts[type.id] || (
                          <span className="text-gray-400 dark:text-gray-600">Click to add workout</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 py-3 flex items-center justify-start w-[120px] h-14">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveWeek(week.id, "up")}
                      disabled={week.weekNumber === 1}
                      className="h-8 w-8 text-gray-500"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveWeek(week.id, "down")}
                      disabled={week.weekNumber === planData.length}
                      className="h-8 w-8 text-gray-500"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWeek(week.id)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddWorkoutDialog && (
        <AddWorkoutDialog
          isOpen={showAddWorkoutDialog}
          onClose={() => setShowAddWorkoutDialog(false)}
          onAdd={handleAddWorkout}
        />
      )}
    </div>
  )
}

