import { NextResponse } from "next/server";
// Import the prisma client using the correct relative path
import prisma from "../../../lib/prisma";
// Import Prisma type for create input
import { Prisma } from "@/generated/prisma/client";
// Import the time parsing utility
import { parseTimeToMilliseconds } from "@/lib/utils";
// Import NextAuth utilities
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Updated import path

// Disable SSL certificate validation in development only
// WARNING: This is insecure and should NEVER be used in production
// if (process.env.NODE_ENV === "development") {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// }

// Sample data as a fallback in case there are connection issues
// Removed sampleAthletes array

// --- GET Handler (Protected) ---
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coachId = session.user.id;

  try {
    console.log(`Fetching athletes for coach ID: ${coachId}`);
    // Fetch only athletes linked to the logged-in coach
    const athletes = await prisma.athlete.findMany({
      where: { coachId: coachId }, // Filter by coachId
      orderBy: {
        lastName: "asc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        birthday: true,
        grade: true,
        time1600m: true,
      },
    });
    console.log(
      `Successfully fetched ${athletes.length} athletes for coach ${coachId}`
    );

    // Enhance data (same as before)
    const enhancedData = athletes.map((athlete: { id: number; firstName: string; lastName: string; birthday: Date; grade: number; time1600m: number | null }) => {
       const time1600m = athlete.time1600m ?? 0;
       return {
            id: athlete.id.toString(),
            first_name: athlete.firstName,
            last_name: athlete.lastName,
            birthday: athlete.birthday.toISOString().split("T")[0],
            grade: athlete.grade,
            time1600m: formatTimeForDisplay(time1600m), // Format milliseconds to MM:SS.MS format
            projected_5k: time1600m ? formatTimeForDisplay(time1600m * 3.1) : "-",
            projected_3200m: time1600m ? formatTimeForDisplay(time1600m * 2) : "-",
            projected_800m: time1600m ? formatTimeForDisplay(time1600m * 0.5) : "-",
        };
    });

    return NextResponse.json(enhancedData);
  } catch (error) {
    console.error(`Error fetching athletes for coach ${coachId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch athletes" },
      { status: 500 }
    );
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

// --- POST Handler (Protected) ---

// Define expected request body structure
interface NewAthletePayload {
  first_name: string;
  last_name: string;
  birthday: string;
  grade: number;
  time_1600m_str: string; // Expect mandatory string
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coachId = session.user.id; // Get ID from session

  console.log(`Received POST request to /api/athletes for coach: ${coachId}`);
  try {
    const body: NewAthletePayload = await request.json();
    console.log("Request body:", body);

    // Basic Validation (add check for time_1600m_str)
    if (!body.first_name || !body.last_name || !body.birthday || !body.grade || !body.time_1600m_str) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse and validate birthday (keep as is)
    const birthdayDate = new Date(body.birthday);
    if (isNaN(birthdayDate.getTime())) {
      console.log("Validation failed: Invalid birthday format");
      return NextResponse.json(
        { error: "Invalid birthday format" },
        { status: 400 }
      );
    }

    // Parse and validate 1600m time string
    const time1600mMs = parseTimeToMilliseconds(body.time_1600m_str);
    if (time1600mMs === null) {
        console.log("Validation failed: Invalid 1600m time format");
        return NextResponse.json(
            { error: "Invalid 1600m time format provided." },
            { status: 400 }
        );
    }

    // Prepare data for Prisma - time1600m is now mandatory number
    const prismaData: Prisma.AthleteCreateInput = {
      firstName: body.first_name,
      lastName: body.last_name,
      birthday: birthdayDate,
      grade: body.grade,
      time1600m: time1600mMs, // Assign parsed milliseconds directly
      coach: {
        connect: { id: coachId } // Connect using session user ID
      },
    };

    console.log("Attempting to create athlete with data:", prismaData);

    // Create athlete in the database
    const newAthlete = await prisma.athlete.create({
      data: prismaData,
    });

    console.log("Successfully created athlete:", newAthlete);

    // Return the newly created athlete
    return NextResponse.json(newAthlete, { status: 201 }); // 201 Created

  } catch (error: unknown) { // Use unknown type
    console.error("Error creating athlete:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    let errorMessage = "Failed to create athlete";
    if (typeof error === 'object' && error !== null) {
      if ('message' in error && typeof error.message === 'string') {
        // Check for Prisma error code within the message or specific structure if known
        // For now, just use the message
        errorMessage = `Database error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }
    } // else: Keep default generic error message

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
