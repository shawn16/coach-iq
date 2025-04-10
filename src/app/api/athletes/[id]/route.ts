/**
 * Individual Athlete API Routes
 *
 * This file handles all operations for a single athlete:
 * - Getting athlete details
 * - Updating athlete information
 * - Deleting an athlete
 *
 * Each route requires authentication and verifies that the athlete
 * belongs to the current coach.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

/**
 * GET /api/athletes/[id]
 *
 * Retrieves details for a specific athlete
 *
 * How it works:
 * 1. Checks if user is logged in
 * 2. Finds the athlete in the database
 * 3. Verifies the athlete belongs to the current coach
 * 4. Returns the athlete data with their team assignments
 *
 * @param request - The HTTP request
 * @param params - Contains the athlete ID from the URL
 * @returns Athlete data or error response
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the athlete in the database
    const athlete = await prisma.athlete.findUnique({
      where: {
        // Convert string ID to number and verify coach ownership
        id: parseInt(params.id),
        coach_id: parseInt(session.user.id), // Convert string ID to number
      },
      // Include related team assignments
      include: {
        athleteTeams: {
          include: {
            team: true,
          },
        },
      },
    });

    // Return 404 if athlete not found
    if (!athlete) {
      return new NextResponse("Athlete not found", { status: 404 });
    }

    // Return athlete data
    return NextResponse.json(athlete);
  } catch (error) {
    // Log error and return appropriate status
    console.error("[ATHLETE_GET]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse("Database Error", { status: 500 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * PUT /api/athletes/[id]
 *
 * Updates an existing athlete's information
 *
 * How it works:
 * 1. Checks if user is logged in
 * 2. Gets the update data from the request body
 * 3. Updates only the provided fields
 * 4. Verifies the athlete belongs to the current coach
 *
 * @param request - The HTTP request containing update data
 * @param params - Contains the athlete ID from the URL
 * @returns Updated athlete data or error response
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get update data from request body
    const body = await request.json();
    const { first_name, last_name, birthday, grade, gender, active } = body;

    // Update the athlete in the database
    const athlete = await prisma.athlete.update({
      where: {
        // Convert string ID to number and verify coach ownership
        id: parseInt(params.id),
        coach_id: parseInt(session.user.id), // Convert string ID to number
      },
      // Only update fields that were provided
      data: {
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(birthday && { birthday: new Date(birthday) }),
        ...(grade && { grade: parseInt(grade) }),
        ...(gender && { gender }),
        ...(active !== undefined && { active }),
      },
    });

    // Return updated athlete data
    return NextResponse.json(athlete);
  } catch (error) {
    // Log error and return appropriate status
    console.error("[ATHLETE_PUT]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new NextResponse("Athlete not found", { status: 404 });
      }
      return new NextResponse("Database Error", { status: 500 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * DELETE /api/athletes/[id]
 *
 * Deletes an athlete and their team assignments
 *
 * How it works:
 * 1. Checks if user is logged in
 * 2. Deletes all team assignments for the athlete
 * 3. Deletes the athlete
 * 4. Verifies the athlete belongs to the current coach
 *
 * @param request - The HTTP request
 * @param params - Contains the athlete ID from the URL
 * @returns Success response or error
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First delete all team assignments
    await prisma.athleteTeam.deleteMany({
      where: {
        athlete_id: parseInt(params.id),
      },
    });

    // Then delete the athlete
    await prisma.athlete.delete({
      where: {
        // Convert string ID to number and verify coach ownership
        id: parseInt(params.id),
        coach_id: parseInt(session.user.id), // Convert string ID to number
      },
    });

    // Return 204 (No Content) for successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Log error and return appropriate status
    console.error("[ATHLETE_DELETE]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new NextResponse("Athlete not found", { status: 404 });
      }
      return new NextResponse("Database Error", { status: 500 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
