import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { parseTimeToMilliseconds } from "@/lib/utils";

// Interface for the expected PUT request body
interface UpdateAthletePayload {
  first_name: string;
  last_name: string;
  birthday: string; // Expecting YYYY-MM-DD string
  grade: number;
  time_1600m_str: string; // Expecting mandatory string format
}

// PUT handler for updating an athlete
export async function PUT(
  request: Request,
  { params }: { params: { athleteId: string } }
) {
  const id = parseInt(params.athleteId, 10);
  console.log(`Received PUT request for athlete ID: ${id}`);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 });
  }

  try {
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

    // Check for Prisma record not found error (P2025) more safely
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
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

// --- DELETE Handler ---
export async function DELETE(
  request: Request, // request might not be used but is part of the signature
  { params }: { params: { athleteId: string } }
) {
  const id = parseInt(params.athleteId, 10);
  console.log(`Received DELETE request for athlete ID: ${id}`);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 });
  }

  try {
    // Attempt to delete the athlete
    await prisma.athlete.delete({
      where: { id: id },
    });

    console.log(`Successfully deleted athlete ID: ${id}`);

    // Return a success response, often 204 No Content for DELETE
    // Or 200 OK with a success message
    // return new Response(null, { status: 204 });
    return NextResponse.json({ message: "Athlete deleted successfully" }, { status: 200 });

  } catch (error: unknown) {
    console.error(`Error deleting athlete ID ${id}:`, error);

    // Check for Prisma record not found error (P2025)
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
        // Arguably, deleting a non-existent resource isn't strictly an error (idempotent)
        // but returning 404 is common practice.
        return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    // Handle other potential errors (e.g., foreign key constraints if athlete has results)
    // Add more specific Prisma error handling if needed (like P2003 for foreign key violation)
    let errorMessage = "Failed to delete athlete";
     if (typeof error === 'object' && error !== null) {
      if ('message' in error && typeof error.message === 'string') {
        // Customize message for common DB errors if desired
        errorMessage = `Database error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = `Server error: ${error.message}`;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}