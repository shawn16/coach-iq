import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format, differenceInYears } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Athlete {
  id: number
  firstName: string
  lastName: string
  birthday: string
  grade: number
  time1600m: string
}

interface ProjectedTimes {
  time5k: string
  time3200m: string
  time800m: string
}

interface AthleteProfileDialogProps {
  athlete: Athlete | null
  projectedTimes: ProjectedTimes | null
  isOpen: boolean
  onClose: () => void
}

export function AthleteProfileDialog({ athlete, projectedTimes, isOpen, onClose }: AthleteProfileDialogProps) {
  if (!athlete || !projectedTimes) return null

  const age = differenceInYears(new Date(), new Date(athlete.birthday))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {athlete.firstName} {athlete.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Personal Information */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {athlete.firstName} {athlete.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grade</p>
                  <Badge variant="outline" className="mt-1">
                    {athlete.grade}th Grade
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Birthday</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {format(new Date(athlete.birthday), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{age} years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Times */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">Performance Times</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">1600m Time</span>
                  <span className="font-bold text-gray-900 dark:text-gray-50">{athlete.time1600m}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Projected Times</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">800m</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">{projectedTimes.time800m}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">3200m</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">{projectedTimes.time3200m}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">5K</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">{projectedTimes.time5k}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

