import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { Prisma } from '@/generated/prisma/client';

// Basic validation function (can be expanded)
function validateInput(name: unknown, email: unknown, password: unknown): string | null {
  if (typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required.';
  }
  if (typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return 'Valid email is required.';
  }
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null; // No errors
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate input (assuming body has these keys, could add checks)
    const validationError = validateInput(body?.name, body?.email, body?.password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Now we know they are strings
    const name = body.name as string;
    const email = body.email as string;
    const password = body.password as string;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash the password
    const saltRounds = 10; // Standard salt rounds for bcrypt
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
        // emailVerified: null, // Optional: Add email verification flow later
      },
    });

    // Return only necessary fields (no password hash)
    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("Registration Error:", error);

    // Handle potential Prisma errors (like unique constraints)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Example: Unique constraint violation (though we checked email above)
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A database conflict occurred.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred during registration.' },
      { status: 500 }
    );
  }
}