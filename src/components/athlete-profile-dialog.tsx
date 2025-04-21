"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, differenceInYears } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AthleteDisplay, ProjectedTimes } from "@/types/athlete";

interface AthleteProfileDialogProps {
  athlete: AthleteDisplay | null;
  projectedTimes: ProjectedTimes | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AthleteProfileDialog({
  athlete,
  projectedTimes,
  isOpen,
  onClose,
}: AthleteProfileDialogProps) {
  // Return null if data is missing or dialog is closed
  if (!isOpen || !athlete || !projectedTimes) return null;

  // Ensure birthday is Date object for calculations/formatting
  const birthDate =
    typeof athlete.birthday === "string"
      ? new Date(athlete.birthday)
      : athlete.birthday;
  const age = differenceInYears(new Date(), birthDate);
  const formattedBirthday = format(birthDate, "MMMM d, yyyy");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {athlete.first_name} {athlete.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Personal Information Card */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {athlete.first_name} {athlete.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Grade
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {athlete.grade}th Grade
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Birthday
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formattedBirthday}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Age
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {age} years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Times Card */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Performance Times
              </h3>

              <div className="space-y-3">
                {/* 1600m Time */}
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">
                    1600m Time
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-50">
                    {athlete.time1600m === "0:00.00"
                      ? "N/A"
                      : athlete.time1600m}
                  </span>
                </div>

                {/* Projected Times */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Projected Times
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        800m
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">
                        {projectedTimes.time800m}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        3200m
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">
                        {projectedTimes.time3200m}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        5K
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">
                        {projectedTimes.time5k}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
