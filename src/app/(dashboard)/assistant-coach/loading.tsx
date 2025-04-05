import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-start gap-2 mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel Skeleton */}
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-40" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel Skeleton */}
        <div className="flex-1 flex flex-col lg:ml-4">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm flex-1">
            <CardContent className="p-4 flex flex-col h-[calc(100vh-13rem)]">
              <div className="flex-1 space-y-4">
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-24 w-64 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

