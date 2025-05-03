import prisma from "@/lib/prisma";

// Get all active and completed plans for a user
export async function getTrainingPlans(userId: string) {
  try {
    // Get all plans for the user
    const allPlans = await prisma.trainingPlan.findMany({
      where: {
        userId,
      },
      include: {
        athletes: {
          include: {
            athlete: true,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    // Separate into active and completed plans
    const activePlans = allPlans
      .filter(plan => !plan.isCompleted)
      .map(plan => ({
        id: plan.id,
        title: plan.title,
        description: plan.description || '',
        duration: plan.duration,
        athletes: plan.athletes.length,
        startDate: formatDate(plan.startDate),
        progress: plan.progress || 0,
        type: plan.type,
      }));

    const completedPlans = allPlans
      .filter(plan => plan.isCompleted)
      .map(plan => ({
        id: plan.id,
        title: plan.title,
        description: plan.description || '',
        duration: plan.duration,
        athletes: plan.athletes.length,
        startDate: formatDate(plan.startDate),
        progress: 100,
        type: plan.type,
      }));

    return { activePlans, completedPlans };
  } catch (error) {
    console.error('Error fetching training plans:', error);
    throw new Error('Failed to fetch training plans');
  }
}

// Get a specific training plan with all its details
export async function getTrainingPlanById(id: string) {
  try {
    // Get the plan with its weeks and workouts
    const plan = await prisma.trainingPlan.findUnique({
      where: { id },
      include: {
        athletes: {
          include: {
            athlete: true,
          },
        },
        weeks: {
          include: {
            workouts: {
              include: {
                workoutType: true,
              },
            },
          },
          orderBy: {
            weekNumber: 'asc',
          },
        },
      },
    });

    if (!plan) return null;

    // Format the plan data to match the expected format
    const planData = plan.weeks.map(week => {
      // Convert workouts array to workouts object
      const workouts = {};
      week.workouts.forEach(workout => {
        workouts[workout.workoutType.id] = workout.details;
      });

      return {
        id: week.id,
        weekNumber: week.weekNumber,
        dateRange: week.dateRange,
        seasonPhase: week.seasonPhase || '',
        workouts,
      };
    });

    return {
      id: plan.id,
      title: plan.title,
      description: plan.description || '',
      duration: plan.duration,
      athletes: plan.athletes.length,
      startDate: plan.startDate,
      endDate: plan.endDate,
      progress: plan.progress || 0,
      type: plan.type,
      planType: plan.planType || 'standard',
      totalWorkouts: plan.totalWorkouts || 0,
      planData,
      isCompleted: plan.isCompleted,
    };
  } catch (error) {
    console.error('Error fetching training plan:', error);
    throw new Error('Failed to fetch training plan details');
  }
}

// Create a new training plan
export async function createTrainingPlan({
  title,
  description,
  durationWeeks,
  startDate,
  type,
  planType,
  userId,
  workoutTypes = [],
  athleteIds = [],
}: {
  title: string;
  description: string;
  durationWeeks: number;
  startDate: Date;
  type?: string;
  planType?: string;
  userId: string;
  workoutTypes?: { id: string; name: string; color: string }[];
  athleteIds?: number[];
}) {
  try {
    // Calculate end date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationWeeks * 7);

    // Create the training plan
    const trainingPlan = await prisma.trainingPlan.create({
      data: {
        title,
        description,
        duration: `${durationWeeks} weeks`,
        durationWeeks,
        startDate,
        endDate,
        type,
        planType,
        progress: 0, // Start at 0% progress
        isCompleted: false,
        totalWorkouts: Math.floor(durationWeeks * 3), // Estimate: ~3 workouts per week
        user: {
          connect: { id: userId },
        },
        // Connect athletes if provided
        athletes: athleteIds?.length
          ? {
              create: athleteIds.map((athleteId) => ({
                athlete: { connect: { id: athleteId } },
              })),
            }
          : undefined,
      },
    });

    // Create weeks for the duration of the plan
    const weeks = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < durationWeeks; i++) {
      const weekStartDate = new Date(currentDate);
      const weekEndDate = new Date(currentDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);
      
      // Format dates as MM/DD
      const formatDate = (date: Date): string =>
        `${date.getMonth() + 1}/${date.getDate()}`;
      const dateRange = `${formatDate(weekStartDate)}-${formatDate(weekEndDate)}`;
      
      weeks.push({
        weekNumber: i + 1,
        dateRange,
        seasonPhase: i < 2 ? "Transition Week" : "Summer Week", // Example phase naming
      });
      
      // Move to next week
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    // Create the weeks in the database
    for (const week of weeks) {
      await prisma.planWeek.create({
        data: {
          ...week,
          trainingPlan: { connect: { id: trainingPlan.id } },
        },
      });
    }

    return trainingPlan;
  } catch (error) {
    console.error('Error creating training plan:', error);
    throw new Error('Failed to create training plan');
  }
}

// Update a training plan
export async function updateTrainingPlan(
  id: string,
  data: {
    title?: string;
    description?: string;
    progress?: number;
    isCompleted?: boolean;
    athleteIds?: number[]; // For updating assigned athletes
  }
) {
  try {
    // Handle basic plan updates
    const updateData: any = {};
    
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.progress !== undefined) updateData.progress = data.progress;
    if (data.isCompleted !== undefined) updateData.isCompleted = data.isCompleted;
    
    // Update the training plan
    const updatedPlan = await prisma.trainingPlan.update({
      where: { id },
      data: updateData,
    });
    
    // If athlete assignments need to be updated
    if (data.athleteIds !== undefined) {
      // First, remove all existing athlete assignments
      await prisma.trainingPlanAthlete.deleteMany({
        where: { trainingPlanId: id },
      });
      
      // Then, create new assignments
      if (data.athleteIds.length > 0) {
        await prisma.$transaction(
          data.athleteIds.map((athleteId) =>
            prisma.trainingPlanAthlete.create({
              data: {
                trainingPlanId: id,
                athleteId,
              },
            })
          )
        );
      }
    }
    
    return updatedPlan;
  } catch (error) {
    console.error('Error updating training plan:', error);
    throw new Error('Failed to update training plan');
  }
}

// Update workouts within a specific week of a training plan
export async function updateWeekWorkouts(
  weekId: string,
  workouts: Record<string, string | null>
) {
  try {
    // Process each workout type and update/create/delete as needed
    for (const [workoutTypeId, details] of Object.entries(workouts)) {
      if (details === null) {
        // Delete this workout
        await prisma.planWorkout.deleteMany({
          where: {
            weekId,
            workoutTypeId,
          },
        });
      } else {
        // Upsert (create or update) the workout
        await prisma.planWorkout.upsert({
          where: {
            weekId_workoutTypeId: {
              weekId,
              workoutTypeId,
            },
          },
          update: {
            details,
          },
          create: {
            weekId,
            workoutTypeId,
            details,
          },
        });
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating week workouts:', error);
    throw new Error('Failed to update workouts');
  }
}

// Delete a training plan
export async function deleteTrainingPlan(id: string) {
  try {
    await prisma.trainingPlan.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting training plan:', error);
    throw new Error('Failed to delete training plan');
  }
}

// Helper function to format dates to match the expected format in the UI
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Get all workout types
export async function getWorkoutTypes() {
  try {
    const types = await prisma.workoutType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return types;
  } catch (error) {
    console.error('Error fetching workout types:', error);
    throw new Error('Failed to fetch workout types');
  }
}