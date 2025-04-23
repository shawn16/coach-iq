import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Disable SSL certificate validation in development only
// WARNING: This is insecure and should NEVER be used in production
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Create a direct client without the SSR wrapper
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      persistSession: false,
    },
    // Add additional options to help with network issues
    global: {
      fetch: (...args: [RequestInfo | URL, RequestInit?]) => fetch(...args),
    },
  }
);

// Sample data as a fallback in case there are connection issues
const sampleAthletes = [
  {
    id: "1",
    first_name: "Lucas",
    last_name: "Allen",
    birthday: "2006-11-13",
    grade: 11,
    time_1600m: 295480, // 4:55.48
    projected_5k: "17:12.52",
    projected_3200m: "10:30.76",
    projected_800m: "2:13.51",
  },
  {
    id: "2",
    first_name: "Noah",
    last_name: "Anderson",
    birthday: "2006-09-11",
    grade: 11,
    time_1600m: 290270, // 4:50.27
    projected_5k: "16:54.31",
    projected_3200m: "10:19.64",
    projected_800m: "2:11.15",
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Brown",
    birthday: "2005-03-09",
    grade: 12,
    time_1600m: 272180, // 4:32.18
    projected_5k: "15:51.10",
    projected_3200m: "9:41.02",
    projected_800m: "2:02.98",
  },
  {
    id: "4",
    first_name: "Sophia",
    last_name: "Davis",
    birthday: "2007-11-04",
    grade: 10,
    time_1600m: 305720, // 5:05.72
    projected_5k: "17:48.30",
    projected_3200m: "10:52.62",
    projected_800m: "2:18.13",
  },
  {
    id: "5",
    first_name: "William",
    last_name: "Garcia",
    birthday: "2009-02-24",
    grade: 9,
    time_1600m: 330150, // 5:30.15
    projected_5k: "19:13.67",
    projected_3200m: "11:44.77",
    projected_800m: "2:29.17",
  },
  {
    id: "6",
    first_name: "Mia",
    last_name: "Hall",
    birthday: "2007-03-27",
    grade: 10,
    time_1600m: 315310, // 5:15.31
    projected_5k: "18:21.81",
    projected_3200m: "11:13.09",
    projected_800m: "2:22.47",
  },
  {
    id: "7",
    first_name: "Alex",
    last_name: "Johnson",
    birthday: "2006-05-14",
    grade: 11,
    time_1600m: 285300, // 4:45.30
    projected_5k: "16:36.95",
    projected_3200m: "10:09.03",
    projected_800m: "2:08.91",
  },
  {
    id: "8",
    first_name: "James",
    last_name: "Lee",
    birthday: "2005-11-30",
    grade: 12,
    time_1600m: 268560, // 4:28.56
    projected_5k: "15:38.45",
    projected_3200m: "9:33.29",
    projected_800m: "2:01.34",
  },
];

export async function GET() {
  try {
    // Try to fetch real data from Supabase
    const { data, error } = await supabase
      .from("athletes")
      .select("id, first_name, last_name, birthday, grade, time_1600m")
      .order("last_name", { ascending: true });

    if (error) {
      console.error("Error fetching athletes from Supabase:", error);
      // Return sample data if there's an error
      return NextResponse.json(sampleAthletes);
    }

    // Enhance the data with projected times (in a real app, these might be calculated or stored)
    const enhancedData = data.map((athlete) => {
      // Base formula for projections - this is simplified
      const time1600m = athlete.time_1600m || 0;

      return {
        ...athlete,
        projected_5k: time1600m ? formatTimeForDisplay(time1600m * 3.1) : "-",
        projected_3200m: time1600m ? formatTimeForDisplay(time1600m * 2) : "-",
        projected_800m: time1600m ? formatTimeForDisplay(time1600m * 0.5) : "-",
      };
    });

    return NextResponse.json(enhancedData);
  } catch (error) {
    console.error("Exception in athletes API:", error);
    // Return sample data if there's an exception
    return NextResponse.json(sampleAthletes);
  }
}

// Helper function to format time in milliseconds to MM:SS.MS format
function formatTimeForDisplay(milliseconds: number): string {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const millisecs = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 100);

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${millisecs
    .toString()
    .padStart(2, "0")}`;
}
