import { PrismaClient } from "../src/generated/prisma";
import {
  activePlans,
  completedPlans,
  workoutTypes as importedWorkoutTypes,
  generatePlanData,
} from "../src/lib/sample-data/training-plans";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

// Define all workout types needed for the sample data
const workoutTypes = [
  // Use the ones from the import
  ...importedWorkoutTypes,
  // Add any missing ones referenced in generatePlanData
  {
    id: "white_vol",
    name: "White Vol",
    color: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
  },
  {
    id: "gold_vol",
    name: "Gold Vol",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  },
  {
    id: "acceleration",
    name: "Acceleration",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  },
  {
    id: "tempo",
    name: "Tempo",
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
  },
  {
    id: "fartlek_new",
    name: "Fartlek (New)",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  },
  {
    id: "fartlek_varsity",
    name: "Fartlek (Varsity)",
    color: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300",
  },
  {
    id: "5k_pace",
    name: "5K Pace",
    color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  }
];

async function createWorkoutTypes() {
  console.log("Creating workout types...");
  
  for (const workoutType of workoutTypes) {
    await prisma.workoutType.upsert({
      where: { id: workoutType.id },
      update: {
        name: workoutType.name,
        color: workoutType.color,
      },
      create: {
        id: workoutType.id,
        name: workoutType.name,
        color: workoutType.color,
      },
    });
  }
  
  console.log(`Created ${workoutTypes.length} workout types`);
}

async function createTrainingPlan(plan: any, userId: string, isCompleted: boolean = false) {
  // Extract numeric duration from string like "12 weeks"
  const durationWeeks = parseInt(plan.duration.split(" ")[0], 10);
  
  // Parse dates
  const startDateObj = parseISO(plan.startDate.includes(",") 
    ? new Date(plan.startDate).toISOString() 
    : `2023-${plan.startDate.split(", ")[0]}`);
  
  // Calculate end date by adding weeks
  const endDateObj = new Date(startDateObj);
  endDateObj.setDate(endDateObj.getDate() + (durationWeeks * 7));
  
  // Create the training plan
  const trainingPlan = await prisma.trainingPlan.create({
    data: {
      id: plan.id,
      title: plan.title,
      description: plan.description || "",
      duration: plan.duration,
      durationWeeks,
      startDate: startDateObj,
      endDate: endDateObj,
      progress: plan.progress || 0,
      type: plan.type || "standard",
      planType: "xc", // Default to cross-country for sample data
      isCompleted,
      totalWorkouts: Math.floor(durationWeeks * 3), // Estimate: ~3 workouts per week
      userId,
    },
  });
  
  // Generate plan week data
  const weekData = generatePlanData(startDateObj);
  
  // Create weeks and workouts
  for (const week of weekData) {
    const createdWeek = await prisma.planWeek.create({
      data: {
        weekNumber: week.weekNumber,
        dateRange: week.dateRange,
        seasonPhase: week.seasonPhase,
        trainingPlanId: trainingPlan.id,
      },
    });
    
    // Create workouts for this week
    for (const [workoutTypeId, details] of Object.entries(week.workouts)) {
      if (details) {
        await prisma.planWorkout.create({
          data: {
            details,
            weekId: createdWeek.id,
            workoutTypeId,
          },
        });
      }
    }
  }
  
  return trainingPlan;
}

async function main() {
  console.log("Starting seed process...");
  
  try {
    // Create a test user if none exists
    let user = await prisma.user.findFirst({
      where: { email: "coach@example.com" },
    });
    
    if (!user) {
      console.log("Creating test user...");
      user = await prisma.user.create({
        data: {
          email: "coach@example.com",
          name: "Coach Demo",
        },
      });
    }
    
    // Create workout types
    await createWorkoutTypes();
    
    // Delete any existing training plans to avoid duplicates
    console.log("Cleaning up existing training plans...");
    await prisma.trainingPlan.deleteMany({});
    
    // Create active training plans
    console.log("Creating active training plans...");
    for (const plan of activePlans) {
      await createTrainingPlan(plan, user.id);
    }
    console.log(`Created ${activePlans.length} active training plans`);
    
    // Create completed training plans
    console.log("Creating completed training plans...");
    for (const plan of completedPlans) {
      await createTrainingPlan(plan, user.id, true);
    }
    console.log(`Created ${completedPlans.length} completed training plans`);
    
    console.log("Seed process completed successfully!");
  } catch (error) {
    console.error("Error during seed process:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();