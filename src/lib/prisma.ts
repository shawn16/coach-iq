import { PrismaClient } from "@/generated/prisma";
import { applySoftDeleteMiddleware } from "./prisma-extensions";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a new Prisma client
const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Apply soft delete middleware
applySoftDeleteMiddleware(prisma);

// In development, store the Prisma client in the global object
// to prevent creating multiple instances during hot-reloading
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;