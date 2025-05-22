import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomBytes, createHash } from 'crypto';

const prisma = new PrismaClient();

// Hash a password with a random salt
const hashPassword = (password: string): string => {
  // Generate a random salt
  const salt = randomBytes(16).toString('hex');
  // Create a hash using SHA-256
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  // Combine the salt and hash for storage
  return `${salt}:${hash}`;
};

// Verify a password against a stored hash
const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(':');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return hash === originalHash;
};

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and password are required' },
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
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = hashPassword(password);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { message: 'Failed to update password' },
      { status: 500 }
    );
  }
}
