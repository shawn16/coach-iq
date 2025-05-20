import { User } from "@prisma/client";

declare global {
  // Extend the base User type to include deletedAt
  type UserWithDeleted = User & {
    deletedAt: Date | null;
  };

  // Add to global namespace for Prisma client extensions
  namespace Prisma {
    interface PrismaClient {
      $softDelete(model: string, where: any): Promise<any>;
    }
  }
}
