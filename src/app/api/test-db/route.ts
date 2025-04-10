import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Try to connect to the database
    await prisma.$connect();

    // Try a simple query
    const users = await prisma.user.findMany({
      take: 1,
    });

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      users: users,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
