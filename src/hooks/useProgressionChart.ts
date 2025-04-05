import { useState, useEffect } from "react";
import { Step } from "@/types/progression";

// Define the ChartData type
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}

// Define the ChartOptions type
interface ChartOptions {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top" | "bottom" | "left" | "right";
    };
    title: {
      display: boolean;
      text: string;
    };
  };
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
}

// Define the useProgressionChart hook
export function useProgressionChart(steps: Step[], metric: string) {
  // Define the state for the chart data
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: metric,
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  // Define the state for the chart options
  const [chartOptions, setChartOptions] = useState<ChartOptions>({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Progression Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  });

  // Define the useEffect hook
  useEffect(() => {
    setChartData({
      labels: steps.map((step) => `Week ${step.week}`),
      datasets: [
        {
          label: metric,
          data: steps.map((step) => parseFloat(step.value)),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
  }, [steps, metric]);

  // Define the updateChartOptions function
  const updateChartOptions = (options: Partial<ChartOptions>) => {
    setChartOptions({ ...chartOptions, ...options });
  };

  // Define the updateChartData function
  const updateChartData = (data: Partial<ChartData>) => {
    setChartData({ ...chartData, ...data });
  };

  // Define the main return function
  return {
    chartData,
    chartOptions,
    updateChartOptions,
    updateChartData,
  };
}
