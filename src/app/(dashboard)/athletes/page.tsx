"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AthleteProfileDialog } from "@/components/athlete-profile-dialog"
import { AddAthleteDialog } from "@/components/add-athlete-dialog"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { useAthletes } from "@/features/athletes/hooks/useAthletes"
import { useAthleteFilters } from "@/features/athletes/hooks/useAthleteFilters"
import { calculateProjectedTimes } from "@/features/athletes/utils/timeCalculations"
import { Athlete, ProjectedTimes } from "@/features/athletes/types"
import { useState } from "react"
import { AthleteTable } from "@/features/athletes/components/AthleteTable"
import { AthleteFilters } from "@/features/athletes/components/AthleteFilters"

export default function AthletesPage() {
  // Get athlete data and management functions
  const { athletes, addAthlete, deleteAthlete } = useAthletes()

  // Get filtering and sorting functionality
  const {
    filteredAthletes,
    searchQuery,
    gradeFilter,
    sortConfig,
    setSearchQuery,
    setGradeFilter,
    handleSort,
  } = useAthleteFilters(athletes)

  // Dialog states
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedAthleteTimes, setSelectedAthleteTimes] = useState<ProjectedTimes | null>(null)
  const [isAddAthleteOpen, setIsAddAthleteOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [athleteToDelete, setAthleteToDelete] = useState<Athlete | null>(null)

  // Handle opening athlete profile
  const handleOpenProfile = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setSelectedAthleteTimes(calculateProjectedTimes(athlete.time1600m))
    setIsProfileOpen(true)
  }

  // Handle initiating delete
  const handleDeleteClick = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation()
    setAthleteToDelete(athlete)
    setIsDeleteConfirmOpen(true)
  }

  // Handle confirming delete
  const handleConfirmDelete = () => {
    if (athleteToDelete) {
      deleteAthlete(athleteToDelete.id)
      setIsDeleteConfirmOpen(false)
      setAthleteToDelete(null)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-start gap-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Athletes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view athlete information and projected race times
        </p>
      </div>

      <Card className="border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <AthleteFilters
            searchQuery={searchQuery}
            gradeFilter={gradeFilter}
            onSearchChange={setSearchQuery}
            onGradeFilterChange={setGradeFilter}
            onAddAthleteClick={() => setIsAddAthleteOpen(true)}
          />
        </CardHeader>
        <CardContent>
          <AthleteTable
            athletes={filteredAthletes}
            sortConfig={sortConfig}
            onSort={handleSort}
            onAthleteClick={handleOpenProfile}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {selectedAthlete && (
        <AthleteProfileDialog
          athlete={selectedAthlete}
          projectedTimes={selectedAthleteTimes}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      <AddAthleteDialog
        isOpen={isAddAthleteOpen}
        onClose={() => setIsAddAthleteOpen(false)}
        onAddAthlete={addAthlete}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        athleteName={athleteToDelete ? `${athleteToDelete.firstName} ${athleteToDelete.lastName}` : ""}
      />
    </div>
  )
}

