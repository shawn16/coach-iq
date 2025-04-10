import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    console.log("Registration request received");
    const body = await request.json();
    console.log("Request body:", body);
    const { first_name, last_name, email, password } = body;

    if (!first_name || !last_name || !email || !password) {
      console.log("Missing required fields:", {
        first_name,
        last_name,
        email,
        password: password ? "present" : "missing",
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking for existing user with email:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log("Creating user");
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        role: "coach",
      },
    });

    console.log("User created successfully:", {
      id: user.id,
      email: user.email,
    });

    // Return user data without sensitive information
    return NextResponse.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error details:", {
        code: error.code,
        message: error.message,
        meta: error.meta,
      });

      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
        type:
          error instanceof Prisma.PrismaClientKnownRequestError
            ? error.code
            : "Unknown",
      },
      { status: 500 }
    );
  }
}
