"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function ImportPlanDialog({ isOpen, onClose, onImport }) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file to import")
      return
    }

    try {
      const fileContent = await file.text()
      const planData = JSON.parse(fileContent)

      // Basic validation
      if (!planData.name || !Array.isArray(planData.weeks)) {
        setError("Invalid plan format. Please check your file.")
        return
      }

      onImport(planData)
    } catch (err) {
      setError("Error parsing file. Please make sure it's a valid JSON file.")
      console.error(err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-[500px] border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Import Training Plan</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan-file" className="text-gray-700 dark:text-gray-300">
              Select Plan File
            </Label>
            <input
              id="plan-file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Import a training plan JSON file exported from CoachIQ
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>
          <Button onClick={handleImport} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Import Plan
          </Button>
        </div>
      </div>
    </div>
  )
}

