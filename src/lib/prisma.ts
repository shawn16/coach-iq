/**
 * Prisma Client Configuration
 *
 * This file sets up and exports a singleton instance of the Prisma client.
 * The singleton pattern ensures we reuse the same database connection
 * throughout the application, preventing connection pool exhaustion.
 *
 * Key Features:
 * - Singleton pattern for database connections
 * - Development mode hot-reload support
 * - Type-safe database access
 */

import { PrismaClient } from "@prisma/client";

// Define global type for PrismaClient instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: Enable query logging in development
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Save the client instance in development
// This prevents multiple instances during hot-reload
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
