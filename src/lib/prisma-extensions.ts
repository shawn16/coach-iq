import { PrismaClient } from "@/generated/prisma";

// Extend Prisma Client types
declare module "@/generated/prisma" {
  interface PrismaClient {
    $softDelete(model: string, where: any): Promise<any>;
  }
}

// Soft delete middleware
export function applySoftDeleteMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    // Handle soft deletes for DELETE operations
    if (params.model && ['User', 'Athlete', 'TrainingPlan'].includes(params.model)) {
      if (params.action === 'delete') {
        // Transform the params to update operation
        params.action = 'update';
        params.args.data = { deletedAt: new Date() };
      }
      
      // Filter out deleted records for find* operations
      if (params.action.includes('find') || params.action === 'count') {
        if (!params.args) params.args = {};
        if (!params.args.where) params.args.where = {};
        
        // Don't filter if explicitly including deleted records
        if (!params.args.where.includeDeleted) {
          // If where is an array, we need to handle each condition
          if (Array.isArray(params.args.where)) {
            params.args.where = params.args.where.map((condition: Record<string, any>) => ({
              ...condition,
              deletedAt: null
            }));
          } else {
            params.args.where.deletedAt = null;
          }
        }
        
        // Remove the includeDeleted flag to prevent Prisma errors
        if (params.args.where.includeDeleted) {
          delete params.args.where.includeDeleted;
        }
      }
    }
    
    return next(params);
  });

  // Add soft delete helper method
  prisma.$softDelete = async function(model: string, where: any) {
    try {
      return await (this as any)[model].update({
        where,
        data: { deletedAt: new Date() }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Soft delete failed for ${model}:`, error.message);
      }
      throw error;
    }
  };
}
