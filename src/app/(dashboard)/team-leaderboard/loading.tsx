import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TeamLeaderboardLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-7 w-48 mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-4 py-3 border-b">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
            </div>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-7 gap-4 py-4 border-b">
                  {Array(7)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

