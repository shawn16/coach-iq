"use client";

// Importing components and libraries - Step type from @/types/progression
import { Step } from "@/types/progression";

// Importing components and libraries - Line component from react-chartjs-2
import { Line } from "react-chartjs-2";

// Importing components and libraries - Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Importing custom hook
import { useProgressionChart } from "@/hooks/useProgressionChart";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the props interface for the ProgressionChart component
interface ProgressionChartProps {
  steps: Step[];
  metric: string;
}

// Define the ProgressionChart component
export function ProgressionChart({ steps, metric }: ProgressionChartProps) {
  const { chartData, chartOptions } = useProgressionChart(steps, metric);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

// Export the ProgressionChart component as the default export
export default ProgressionChart;
