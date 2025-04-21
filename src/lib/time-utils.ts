/**
 * Converts a time string in format "4:45.30" to milliseconds
 */
export function timeStringToMs(timeStr: string): number {
  if (timeStr === "0:00.00" || !timeStr) return 0;

  const parts = timeStr.match(/(\d+):(\d{2})\.(\d{2})/);
  if (!parts) return 0;

  const [, minutes, seconds, hundredths] = parts;
  return (
    Number.parseInt(minutes) * 60 * 1000 +
    Number.parseInt(seconds) * 1000 +
    Number.parseInt(hundredths) * 10
  );
}

/**
 * Converts milliseconds to a time string in format "4:45.30"
 */
export function msToTimeString(totalMs: number): string {
  if (!totalMs) return "0:00.00";

  const mins = Math.floor(totalMs / (60 * 1000));
  const secs = Math.floor((totalMs % (60 * 1000)) / 1000);
  const ms = Math.round((totalMs % 1000) / 10);

  return `${mins}:${secs.toString().padStart(2, "0")}.${ms
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Calculate projected times based on 1600m time in milliseconds
 */
export function calculateProjectedTimes(time1600ms: number): {
  time5k: string;
  time3200m: string;
  time800m: string;
} {
  if (!time1600ms) {
    return {
      time5k: "N/A",
      time3200m: "N/A",
      time800m: "N/A",
    };
  }

  // Simple projection factors
  const projected5kMs = time1600ms * 3.49;
  const projected3200mMs = time1600ms * 2.14;
  const projected800mMs = time1600ms * 0.45;

  return {
    time5k: msToTimeString(projected5kMs),
    time3200m: msToTimeString(projected3200mMs),
    time800m: msToTimeString(projected800mMs),
  };
}
