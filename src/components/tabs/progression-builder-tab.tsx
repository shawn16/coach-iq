import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple placeholder component for the Progression Builder tab
export function ProgressionBuilderTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="col-span-2 text-center py-8 text-gray-500">
          Progression library feature coming soon.
        </div>
      </CardContent>
    </Card>
  );
}
