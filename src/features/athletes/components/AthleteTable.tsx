import { format, differenceInYears } from "date-fns"
import { ArrowUpDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Athlete, SortConfig } from "../types"
import { calculateProjectedTimes } from "../utils/timeCalculations"

interface AthleteTableProps {
  athletes: Athlete[]
  sortConfig: SortConfig
  onSort: (column: SortConfig["column"]) => void
  onAthleteClick: (athlete: Athlete) => void
  onDeleteClick: (athlete: Athlete, e: React.MouseEvent) => void
}

export function AthleteTable({ athletes, sortConfig, onSort, onAthleteClick, onDeleteClick }: AthleteTableProps) {
  // Calculate age from birthday
  const calculateAge = (birthday: string): number => {
    return differenceInYears(new Date(), new Date(birthday))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <button className="flex items-center gap-1" onClick={() => onSort("lastName")}>
                Last Name
                <ArrowUpDown className={`h-4 w-4 ${sortConfig.column === "lastName" ? "opacity-100" : "opacity-50"}`} />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              First Name
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Birthday
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Age
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <button className="flex items-center gap-1" onClick={() => onSort("grade")}>
                Grade
                <ArrowUpDown className={`h-4 w-4 ${sortConfig.column === "grade" ? "opacity-100" : "opacity-50"}`} />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <button className="flex items-center gap-1" onClick={() => onSort("time1600m")}>
                1600m Time
                <ArrowUpDown className={`h-4 w-4 ${sortConfig.column === "time1600m" ? "opacity-100" : "opacity-50"}`} />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 5K
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 3200m
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Projected 800m
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => {
            const projectedTimes = calculateProjectedTimes(athlete.time1600m)
            const age = calculateAge(athlete.birthday)

            return (
              <tr
                key={athlete.id}
                className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td
                  className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => onAthleteClick(athlete)}
                >
                  {athlete.lastName}
                </td>
                <td
                  className="px-4 py-3 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => onAthleteClick(athlete)}
                >
                  {athlete.firstName}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {format(new Date(athlete.birthday), "MM/dd/yyyy")}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{age}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <Badge variant="outline" className="font-normal">
                    {athlete.grade}th
                  </Badge>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {athlete.time1600m === "0:00.00" ? "—" : athlete.time1600m}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{projectedTimes.time5k}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{projectedTimes.time3200m}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{projectedTimes.time800m}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => onDeleteClick(athlete, e)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Delete {athlete.firstName} {athlete.lastName}
                    </span>
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {athletes.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No athletes found matching your search criteria.</p>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        Showing {athletes.length} athletes
      </div>
    </div>
  )
} 