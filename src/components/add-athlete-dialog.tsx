"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { differenceInYears } from "date-fns"

interface Athlete {
  id: number
  firstName: string
  lastName: string
  birthday: string
  grade: number
  time1600m: string
}

interface AddAthleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddAthlete: (athlete: Omit<Athlete, "id">) => void
}

export function AddAthleteDialog({ isOpen, onClose, onAddAthlete }: AddAthleteDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    grade: "",
    time1600m: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    // Calculate age if birthday changes
    if (field === "birthday" && value) {
      try {
        const birthDate = new Date(value)
        const age = differenceInYears(new Date(), birthDate)
        setCalculatedAge(age)
      } catch (e) {
        setCalculatedAge(null)
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required"
    } else {
      try {
        const birthDate = new Date(formData.birthday)
        if (isNaN(birthDate.getTime())) {
          newErrors.birthday = "Invalid date format"
        }
      } catch (e) {
        newErrors.birthday = "Invalid date format"
      }
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required"
    }

    // Validate 1600m time format if provided
    if (formData.time1600m && !/^\d+:\d{2}\.\d{2}$/.test(formData.time1600m)) {
      newErrors.time1600m = "Format should be MM:SS.ss (e.g., 5:45.30)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onAddAthlete({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthday: formData.birthday,
        grade: Number.parseInt(formData.grade),
        time1600m: formData.time1600m || "0:00.00", // Default value if not provided
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        birthday: "",
        grade: "",
        time1600m: "",
      })
      setCalculatedAge(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">Add New Athlete</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-gray-700 dark:text-gray-300">
                Birthday <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => handleInputChange("birthday", e.target.value)}
                className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
                  errors.birthday ? "border-red-500" : ""
                }`}
              />
              {errors.birthday && <p className="text-red-500 text-xs">{errors.birthday}</p>}
              {calculatedAge !== null && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Age: {calculatedAge} years</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="text-gray-700 dark:text-gray-300">
                Grade <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                <SelectTrigger
                  id="grade"
                  className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
                    errors.grade ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9th Grade</SelectItem>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              {errors.grade && <p className="text-red-500 text-xs">{errors.grade}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time1600m" className="text-gray-700 dark:text-gray-300">
              1600m PR (Optional)
            </Label>
            <Input
              id="time1600m"
              placeholder="e.g., 5:45.30"
              value={formData.time1600m}
              onChange={(e) => handleInputChange("time1600m", e.target.value)}
              className={`border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
                errors.time1600m ? "border-red-500" : ""
              }`}
            />
            {errors.time1600m && <p className="text-red-500 text-xs">{errors.time1600m}</p>}
            <p className="text-xs text-gray-500 dark:text-gray-400">Format: MM:SS.ss (e.g., 5:45.30)</p>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Add Athlete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

