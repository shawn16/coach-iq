import { Pool } from "pg";
import { getServerSession, DefaultSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

type SessionWithUser = Awaited<ReturnType<typeof getServerSession>>;

type DeleteUserResult = {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
  message?: string;
};
let pool: Pool;

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("🔴 DATABASE_URL environment variable is not set.");
  // In a real app, you might throw an error or handle this more gracefully
  // For now, we'll let the app potentially crash later if pool is used without init
} else {
  console.log("🟢 Initializing PostgreSQL connection pool...");
  // Configure SSL for Supabase connections
  const sslConfig = {
    rejectUnauthorized: false, // Supabase uses self-signed certificates
  };

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? sslConfig : false,
  });

  pool.on("connect", () => {
    console.log("🔗 PostgreSQL pool connected");
  });

  pool.on("error", (err) => {
    console.error("🔴 PostgreSQL pool error:", err);
  });
}

// Export a query function that uses the pool
export const query = async (
  text: string,
  params?: (string | number | boolean | null)[]
) => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Check DATABASE_URL.");
  }
  const start = Date.now();
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Optionally export the pool itself if needed elsewhere
// export { pool };

/**
 * Safely deletes a user with authentication and error handling
 * @param req NextApiRequest - The incoming request object
 * @param res NextApiResponse - The response object
 * @param userId - ID of the user to delete
 * @returns Promise with the result of the deletion
 */
export const deleteUserWithAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    // Verify user is authenticated
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
        status: 401,
      } satisfies DeleteUserResult;
    }

    // Check if the authenticated user is the same as the user being deleted
    // or if they have admin privileges
    if (session.user.id !== userId && session.user.role !== 'admin') {
      return {
        success: false,
        error: "Not authorized to delete this user",
        status: 403,
      } satisfies DeleteUserResult;
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // First, delete related records to maintain referential integrity
      await Promise.all([
        tx.account.deleteMany({ where: { userId } }),
        tx.session.deleteMany({ where: { userId } }),
        // Add other related models as needed
      ]);

      // Then delete the user
      return await tx.user.delete({
        where: { id: userId },
        select: { id: true, email: true }, // Only return necessary fields
      });
    });

    return {
      success: true,
      data: result,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteUserWithAuth:", error);
    
    // Type guard for Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; message: string };
      
      if (prismaError.code === "P2025") {
        return {
          success: false,
          error: "User not found",
          status: 404,
        } satisfies DeleteUserResult;
      }
      
      return {
        success: false,
        error: `Database error: ${prismaError.message || 'Unknown error'}`,
        status: 500,
      } satisfies DeleteUserResult;
    }

    // Handle other potential errors
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        status: 500,
      } satisfies DeleteUserResult;
    }

    return {
      success: false,
      error: "An unknown error occurred",
      status: 500,
    } satisfies DeleteUserResult;
  }
};
