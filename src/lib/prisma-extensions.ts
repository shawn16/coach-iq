import { PrismaClient } from "@/generated/prisma";

// Models that support soft delete
const SOFT_DELETABLE_MODELS = [
  'User',
  'Athlete',
  'TrainingPlan',
  'TrainingPlanAthlete',
  'PlanWeek',
  'WorkoutType',
  'PlanWorkout',
  'WorkoutResult',
  'WorkoutLibraryItem'
] as const;

type SoftDeletableModel = typeof SOFT_DELETABLE_MODELS[number];

// Extend Prisma Client types
declare module "@/generated/prisma" {
  interface PrismaClient {
    $softDelete(model: string, where: any): Promise<any>;
    $forceDelete(model: string, where: any): Promise<any>;
    $findIncludingDeleted<T>(model: string, args?: any): Promise<T>;
  }
}

// Soft delete middleware
export function applySoftDeleteMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    // Skip if not a soft-deletable model
    if (!params.model || !SOFT_DELETABLE_MODELS.includes(params.model as SoftDeletableModel)) {
      return next(params);
    }

    // Handle soft deletes for DELETE operations
    if (params.action === 'delete') {
      // Transform the params to update operation
      params.action = 'update';
      params.args.data = { 
        deletedAt: new Date(),
        ...(params.args.data || {}) 
      };
    }
    
    // Handle batch deletes
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data.deletedAt = new Date();
      } else {
        params.args.data = { deletedAt: new Date() };
      }
    }
    
    // Filter out deleted records for find* operations
    if (params.action.startsWith('find') || params.action === 'count' || params.action === 'aggregate') {
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
        } else if (params.args.where.OR) {
          // Handle OR conditions
          params.args.where.OR = params.args.where.OR.map((condition: Record<string, any>) => ({
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
    
    return next(params);
  });

  // Add soft delete helper method
  prisma.$softDelete = async function(model: string, where: any) {
    if (!SOFT_DELETABLE_MODELS.includes(model as SoftDeletableModel)) {
      throw new Error(`Model ${model} does not support soft delete`);
    }

    try {
      return await (this as any)[model].update({
        where,
        data: { 
          deletedAt: new Date(),
          updatedAt: new Date()
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Soft delete failed for ${model}:`, error.message);
      }
      throw error;
    }
  };

  // Add force delete helper method (bypasses soft delete)
  prisma.$forceDelete = async function(model: string, where: any) {
    try {
      return await (this as any)[model].delete({ where });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Force delete failed for ${model}:`, error.message);
      }
      throw error;
    }
  };

  // Add helper to find including deleted records
  prisma.$findIncludingDeleted = async function<T>(model: string, args: any = {}): Promise<T> {
    if (!args) args = {};
    if (!args.where) args.where = {};
    args.where.includeDeleted = true;
    
    return (this as any)[model].findMany(args);
  };
}
