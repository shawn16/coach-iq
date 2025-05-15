// Props interface for the StatsBox component
interface StatsBoxProps {
  // The label text displayed above the value
  label: string;
  // The value to display (can be a number, string, or JSX)
  value: React.ReactNode;
}

// A reusable component for displaying a statistic with a label
export function StatsBox({ label, value }: StatsBoxProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}
