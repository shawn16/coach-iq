import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { parseTimeToMilliseconds } from "@/lib/utils";
// Import NextAuth utilities
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route"; // Adjust path

// Interface for the expected PUT request body
interface UpdateAthletePayload {
  first_name: string;
  last_name: string;
  birthday: string; // Expecting YYYY-MM-DD string
  grade: number;
  time_1600m_str: string; // Expecting mandatory string format
}

// --- PUT handler (Protected) ---
export async function PUT(
  request: Request,
  { params }: { params: { athleteId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coachId = session.user.id;

  const id = parseInt(params.athleteId, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 });
  }

  console.log(`Received PUT request for athlete ID: ${id} from coach: ${coachId}`);

  try {
    // Verify athlete belongs to the coach before proceeding
    const athlete = await prisma.athlete.findUnique({
      where: { id: id, coachId: coachId }, // Check both ID and coachId
    });

    if (!athlete) {
      console.log(`AuthZ Error: Athlete ${id} not found or does not belong to coach ${coachId}`);
      return NextResponse.json({ error: "Athlete not found or access denied" }, { status: 404 }); // Or 403
    }

    // Now proceed with parsing and updating
    const body: UpdateAthletePayload = await request.json();
    console.log("Request body:", body);

    // Basic Validation
    if (!body.first_name || !body.last_name || !body.birthday || !body.grade || !body.time_1600m_str) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Parse birthday string
    const birthdayDate = new Date(body.birthday);
    if (isNaN(birthdayDate.getTime())) {
      return NextResponse.json({ error: "Invalid birthday format" }, { status: 400 });
    }

    // Parse 1600m time string
    const time1600mMs = parseTimeToMilliseconds(body.time_1600m_str);
    if (time1600mMs === null) {
      return NextResponse.json(
        { error: "Invalid 1600m time format provided." },
        { status: 400 }
      );
    }

    // Prepare data for Prisma update
    const updateData: Prisma.AthleteUpdateInput = {
      firstName: body.first_name,
      lastName: body.last_name,
      birthday: birthdayDate,
      grade: body.grade,
      time1600m: time1600mMs,
      // coach connection shouldn't typically change on athlete edit
    };

    console.log("Attempting to update athlete with data:", updateData);

    // Update athlete in the database
    const updatedAthlete = await prisma.athlete.update({
      where: { id: id },
      data: updateData,
    });

    console.log("Successfully updated athlete:", updatedAthlete);

    return NextResponse.json(updatedAthlete);

  } catch (error: unknown) {
    console.error(`Error updating athlete ID ${id}:`, error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    let errorMessage = "Failed to update athlete";
    if (typeof error === 'object' && error !== null) {
      if ('message' in error && typeof error.message === 'string') {
        errorMessage = `Database error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// --- DELETE Handler (Protected) ---
export async function DELETE(
  request: Request,
  { params }: { params: { athleteId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coachId = session.user.id;

  const id = parseInt(params.athleteId, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 });
  }

  console.log(`Received DELETE request for athlete ID: ${id} from coach: ${coachId}`);

  try {
     // Verify athlete belongs to the coach before deleting
    const athlete = await prisma.athlete.findUnique({
      where: { id: id, coachId: coachId }, // Check both ID and coachId
    });

    if (!athlete) {
      console.log(`AuthZ Error: Athlete ${id} not found or does not belong to coach ${coachId} for deletion`);
       // Return 404 even if it exists but doesn't belong to user
      return NextResponse.json({ error: "Athlete not found or access denied" }, { status: 404 });
    }

    // Attempt to delete the athlete
    await prisma.athlete.delete({
      where: { id: id }, // Already verified ownership
    });

    return NextResponse.json({ message: "Athlete deleted successfully" }, { status: 200 });

  } catch (error: unknown) {
    console.error(`Error deleting athlete ID ${id}:`, error);

    let errorMessage = "Failed to delete athlete";
    if (typeof error === 'object' && error !== null) {
      if ('message' in error && typeof error.message === 'string') {
        errorMessage = `Database error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}