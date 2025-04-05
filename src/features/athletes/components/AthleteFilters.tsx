import { Search, Download, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the props for the AthleteFilters component
interface AthleteFiltersProps {
  searchQuery: string
  gradeFilter: string
  onSearchChange: (query: string) => void
  onGradeFilterChange: (grade: string) => void
  onAddAthleteClick: () => void
}

// Define the AthleteFilters component
export function AthleteFilters({
  searchQuery,
  gradeFilter,
  onSearchChange,
  onGradeFilterChange,
  onAddAthleteClick,
}: AthleteFiltersProps) {
  return (
    // Container for the filters
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:w-80">
          {/* Search input */}
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search athletes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex-shrink-0">
          {/* Grade filter select */}
          <Select value={gradeFilter} onValueChange={onGradeFilterChange}>
            <SelectTrigger className="w-[130px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <SelectValue placeholder="Filter by grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        {/* Export button */}
        <Button
          variant="outline"
          className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
        >
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        {/* Add athlete button */}
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 py-2"
          onClick={onAddAthleteClick}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Athlete
        </Button>
      </div>
    </div>
  )
} 