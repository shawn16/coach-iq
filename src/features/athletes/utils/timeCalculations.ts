import { ProjectedTimes } from "../types";

export const timeToSeconds = (timeStr: string): number => {
  if (timeStr === "0:00.00") return 0;

  const [minutes, secondsPart] = timeStr.split(":");
  const [seconds, milliseconds] = secondsPart.split(".");
  return (
    Number.parseInt(minutes) * 60 +
    Number.parseInt(seconds) +
    Number.parseInt(milliseconds) / 100
  );
};

export const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 100);
  return `${mins}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
};

export const calculateProjectedTimes = (time1600m: string): ProjectedTimes => {
  const timeInSeconds = timeToSeconds(time1600m);

  if (timeInSeconds === 0) {
    return {
      time5k: "N/A",
      time3200m: "N/A",
      time800m: "N/A",
    };
  }

  // Projected 5K Time: (1600m time / 0.89) * 3.11
  const projected5kTime = (timeInSeconds / 0.89) * 3.11;

  // Projected 3200m Time: (1600m time / 0.9369) * 2
  const projected3200mTime = (timeInSeconds / 0.9369) * 2;

  // Projected 800m Time: (1600m time / 1.1066) / 2
  const projected800mTime = timeInSeconds / 1.1066 / 2;

  return {
    time5k: secondsToTime(projected5kTime),
    time3200m: secondsToTime(projected3200mTime),
    time800m: secondsToTime(projected800mTime),
  };
}; 