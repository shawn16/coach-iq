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
        planType: plan.planType || 'xc', // Include planType field with default
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
        planType: plan.planType || 'xc', // Include planType field with default
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
        seasonPhase: `Week ${i + 1}`, // Use "Week X" format instead of hardcoded phase names
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
    startDate?: Date; // New parameter for start date changes
    durationWeeks?: number; // New parameter for duration changes
    planType?: string; // Added planType parameter
  }
) {
  try {
    // Get current plan to compare changes
    const currentPlan = await prisma.trainingPlan.findUnique({
      where: { id },
      include: {
        weeks: {
          orderBy: {
            weekNumber: 'asc',
          },
        },
      },
    });

    if (!currentPlan) {
      throw new Error('Training plan not found');
    }

    // Handle basic plan updates
    const updateData: any = {};
    
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.progress !== undefined) updateData.progress = data.progress;
    if (data.isCompleted !== undefined) updateData.isCompleted = data.isCompleted;
    if (data.planType !== undefined) updateData.planType = data.planType;
    
    // Check if start date or duration is being changed
    const isStartDateChanged = data.startDate !== undefined;
    const isDurationChanged = data.durationWeeks !== undefined;
    
    // Update duration and calculate new end date if needed
    if (isDurationChanged) {
      const durationWeeks = data.durationWeeks!;
      updateData.duration = `${durationWeeks} weeks`;
      updateData.durationWeeks = durationWeeks;
      updateData.totalWorkouts = Math.floor(durationWeeks * 3); // Estimate: ~3 workouts per week
      
      // If we have a start date (either current or new), update end date
      const startDateToUse = data.startDate || currentPlan.startDate;
      const newEndDate = new Date(startDateToUse);
      newEndDate.setDate(newEndDate.getDate() + (durationWeeks * 7) - 1); // -1 because end date is inclusive
      updateData.endDate = newEndDate;
    }
    
    // Update start date and end date if needed
    if (isStartDateChanged) {
      updateData.startDate = data.startDate;
      
      // Recalculate end date with the new start date
      const durationWeeks = data.durationWeeks !== undefined ? data.durationWeeks : currentPlan.durationWeeks;
      const newEndDate = new Date(data.startDate!);
      newEndDate.setDate(newEndDate.getDate() + (durationWeeks * 7) - 1); // -1 because end date is inclusive
      updateData.endDate = newEndDate;
    }
    
    // Update the training plan first
    const updatedPlan = await prisma.trainingPlan.update({
      where: { id },
      data: updateData,
    });
    
    // If start date changed or duration changed, we need to update the weeks
    if (isStartDateChanged || isDurationChanged) {
      // Get existing weeks to preserve workout data
      const existingWeeks = await prisma.planWeek.findMany({
        where: { trainingPlanId: id },
        include: {
          workouts: true
        },
        orderBy: {
          weekNumber: 'asc',
        }
      });
      
      // Helper function to format date ranges
      const formatDateForRange = (date: Date): string => {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      };
      
      // Calculate new weeks based on the updated start date & duration
      const startDateToUse = data.startDate || currentPlan.startDate;
      const durationWeeks = data.durationWeeks !== undefined ? data.durationWeeks : currentPlan.durationWeeks;
      const currentDate = new Date(startDateToUse);
      
      // Update existing weeks with new date ranges
      for (let i = 0; i < Math.min(existingWeeks.length, durationWeeks); i++) {
        const week = existingWeeks[i];
        const weekStartDate = new Date(currentDate);
        const weekEndDate = new Date(currentDate);
        weekEndDate.setDate(weekEndDate.getDate() + 6);
        
        const dateRange = `${formatDateForRange(weekStartDate)}-${formatDateForRange(weekEndDate)}`;
        
        // Update this week
        await prisma.planWeek.update({
          where: { id: week.id },
          data: {
            dateRange,
          },
        });
        
        // Move to next week
        currentDate.setDate(currentDate.getDate() + 7);
      }
      
      // If the duration increased, create new weeks
      if (durationWeeks > existingWeeks.length) {
        // Create new weeks
        for (let i = existingWeeks.length; i < durationWeeks; i++) {
          const weekStartDate = new Date(currentDate);
          const weekEndDate = new Date(currentDate);
          weekEndDate.setDate(weekEndDate.getDate() + 6);
          
          const dateRange = `${formatDateForRange(weekStartDate)}-${formatDateForRange(weekEndDate)}`;
          
          await prisma.planWeek.create({
            data: {
              weekNumber: i + 1,
              dateRange,
              seasonPhase: `Week ${i + 1}`, // Use "Week X" format for consistency
              trainingPlan: { connect: { id } },
            },
          });
          
          // Move to next week
          currentDate.setDate(currentDate.getDate() + 7);
        }
      }
      
      // If the duration decreased, delete extra weeks
      if (durationWeeks < existingWeeks.length) {
        const weeksToDelete = existingWeeks.slice(durationWeeks);
        
        for (const week of weeksToDelete) {
          // First delete all workouts associated with this week
          await prisma.planWorkout.deleteMany({
            where: { weekId: week.id },
          });
          
          // Then delete the week itself
          await prisma.planWeek.delete({
            where: { id: week.id },
          });
        }
      }
    }
    
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