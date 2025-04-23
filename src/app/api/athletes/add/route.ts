import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { timeStringToMs } from "@/lib/time-utils";

// Create a direct client without the SSR wrapper
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract and validate form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const birthday = formData.get("birthday") as string;
    const grade = parseInt(formData.get("grade") as string, 10);
    const time1600m = formData.get("time1600m") as string;

    if (!firstName || !lastName || !birthday || isNaN(grade)) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert time string to milliseconds
    const time1600mMs = timeStringToMs(time1600m);

    // Prepare data for insertion
    const athleteData = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      grade,
      time_1600m: time1600mMs,
    };

    // Add to database
    const { data, error } = await supabase
      .from("athletes")
      .insert([athleteData])
      .select()
      .single();

    if (error) {
      console.error("Error adding athlete:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, athlete: data });
  } catch (error) {
    console.error("Exception in add athlete API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
