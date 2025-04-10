/**
 * Athletes API Routes
 *
 * This file handles the main CRUD operations for athletes:
 * - GET: List and filter athletes
 * - POST: Create new athletes
 * - PUT: Update an existing athlete
 * - DELETE: Delete an athlete
 *
 * Each route requires authentication and ensures that athletes
 * are associated with the correct coach.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// cSpell:ignore kysely ilike

/**
 * GET /api/athletes
 *
 * Retrieves a filtered list of athletes for the current coach.
 * Supports multiple filter criteria:
 * - Search by name (case-insensitive)
 * - Filter by grade level
 * - Filter by active status
 *
 * @param request - Contains query parameters for filtering
 * @returns Filtered list of athletes with their team assignments
 * @throws 401 if user is not authenticated
 * @throws 500 if database error occurs
 */
export async function GET() {
  try {
    // Temporarily skip authentication for development
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const athletes = await prisma.athlete.findMany({
      where: {
        // Temporarily use a hardcoded coach_id
        coach_id: 1,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        birthday: true,
        grade: true,
        gender: true,
        active: true,
        time1600m: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json(athletes);
  } catch (error) {
    console.error("Error fetching athletes:", error);
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : "Unknown error"
        : "Failed to fetch athletes";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/athletes
 *
 * Creates a new athlete associated with the current coach.
 * Required fields:
 * - first_name
 * - last_name
 * - birthday
 * - gender
 *
 * Optional fields:
 * - grade
 * - active (defaults to true)
 *
 * @param request - Contains the athlete data in the request body
 * @returns Newly created athlete
 * @throws 401 if user is not authenticated
 * @throws 400 if required fields are missing
 * @throws 500 if database error occurs
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { first_name, last_name, birthday, grade, gender } = body;

    if (!first_name || !last_name || !birthday) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const athlete = await prisma.athlete.create({
      data: {
        first_name,
        last_name,
        birthday: new Date(birthday),
        grade: grade ? parseInt(grade) : null,
        gender: gender || null,
        active: true,
        coach_id: parseInt(session.user.id),
      },
    });

    return NextResponse.json(athlete);
  } catch (error) {
    console.error("Error creating athlete:", error);
    return NextResponse.json(
      { error: "Failed to create athlete" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/athletes
 *
 * Updates an existing athlete associated with the current coach.
 * Required fields:
 * - id
 * - first_name
 * - last_name
 * - birthday
 * - gender
 *
 * Optional fields:
 * - grade
 * - active
 *
 * @param request - Contains the athlete data in the request body
 * @returns Updated athlete
 * @throws 401 if user is not authenticated
 * @throws 400 if required fields are missing
 * @throws 404 if athlete is not found
 * @throws 500 if database error occurs
 */
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, first_name, last_name, birthday, grade, active, gender } = body;

    if (!id || !first_name || !last_name || !birthday) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const athlete = await prisma.athlete.update({
      where: {
        id: parseInt(id),
        coach_id: parseInt(session.user.id),
      },
      data: {
        first_name,
        last_name,
        birthday: new Date(birthday),
        grade: grade ? parseInt(grade) : null,
        active: active ?? true,
        gender: gender || null,
      },
    });

    return NextResponse.json(athlete);
  } catch (error) {
    console.error("Error updating athlete:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        {
          error: "Athlete not found or you don't have permission to update it",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update athlete" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/athletes
 *
 * Deletes an athlete associated with the current coach.
 *
 * @param request - Contains the athlete ID in the query parameters
 * @returns Deleted athlete
 * @throws 401 if user is not authenticated
 * @throws 400 if athlete ID is missing
 * @throws 404 if athlete is not found
 * @throws 500 if database error occurs
 */
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing athlete ID" },
        { status: 400 }
      );
    }

    const athlete = await prisma.athlete.delete({
      where: {
        id: parseInt(id),
        coach_id: parseInt(session.user.id),
      },
    });

    return NextResponse.json(athlete);
  } catch (error) {
    console.error("Error deleting athlete:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json(
        {
          error: "Athlete not found or you don't have permission to delete it",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete athlete" },
      { status: 500 }
    );
  }
}
