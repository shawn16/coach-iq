"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploaderProps {
  id: string
  defaultImage?: string
  maxSizeMB?: number
  aspectRatio?: string
  className?: string
}

export function ImageUploader({
  id,
  defaultImage,
  maxSizeMB = 5,
  aspectRatio = "1:1",
  className = "",
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    // Reset error
    setError(null)

    // Create a preview URL
    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <input type="file" id={id} ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />

      {image ? (
        <div className="relative w-32 h-32 mx-auto">
          <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover rounded-md" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          onClick={triggerFileInput}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">Click to upload your school logo</p>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
            {aspectRatio} aspect ratio recommended
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button type="button" variant="outline" size="sm" onClick={triggerFileInput} className="mt-2">
          <Upload className="h-4 w-4 mr-2" />
          {image ? "Change Image" : "Upload Image"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
    </div>
  )
}

