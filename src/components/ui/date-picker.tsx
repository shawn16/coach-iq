"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Select date",
  disabled = false,
  error = false,
}: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState<string>("")
  const [open, setOpen] = React.useState(false)

  // Update input value when date changes
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "yyyy-MM-dd"))
    } else {
      setInputValue("")
    }
  }, [date])

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Try to parse the date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (dateRegex.test(value)) {
      const parsedDate = new Date(value)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
      }
    }
  }

  // Handle blur event
  const handleBlur = () => {
    if (!inputValue) {
      setDate(undefined)
      return
    }

    // Try to parse the date
    const parsedDate = new Date(inputValue)
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate)
      setInputValue(format(parsedDate, "yyyy-MM-dd"))
    } else {
      // Revert to previous valid date
      if (date) {
        setInputValue(format(date, "yyyy-MM-dd"))
      } else {
        setInputValue("")
      }
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <div className={cn("relative w-full", className)}>
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn("pr-10 w-full", error ? "border-red-500 focus-visible:ring-red-500" : "")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setOpen(true)}
                  disabled={disabled}
                >
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>
            <p>Click to select date</p>
          </TooltipContent>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
              initialFocus
              className="rounded-md border border-gray-200 dark:border-gray-700"
            />
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  )
}

