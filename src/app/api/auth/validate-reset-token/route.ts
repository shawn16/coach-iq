import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'No token provided' },
        { status: 400 }
      );
    }

    // Find user with this reset token that hasn't expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Check if the token hasn't expired
        },
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: user.email,
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Failed to validate token' },
      { status: 500 }
    );
  }
}
