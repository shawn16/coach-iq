/*
  Warnings:

  - You are about to drop the column `name` on the `TrainingPlan` table. All the data in the column will be lost.
  - Added the required column `duration` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeeks` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDate` on table `TrainingPlan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `TrainingPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TrainingPlan" DROP COLUMN "name",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "durationWeeks" INTEGER NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "planType" TEXT,
ADD COLUMN     "progress" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalWorkouts" INTEGER,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "TrainingPlanAthlete" (
    "trainingPlanId" TEXT NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingPlanAthlete_pkey" PRIMARY KEY ("trainingPlanId","athleteId")
);

-- CreateTable
CREATE TABLE "PlanWeek" (
    "id" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dateRange" TEXT NOT NULL,
    "seasonPhase" TEXT,
    "trainingPlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanWorkout" (
    "id" TEXT NOT NULL,
    "details" TEXT,
    "weekId" TEXT NOT NULL,
    "workoutTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingPlanAthlete_athleteId_idx" ON "TrainingPlanAthlete"("athleteId");

-- CreateIndex
CREATE INDEX "TrainingPlanAthlete_trainingPlanId_idx" ON "TrainingPlanAthlete"("trainingPlanId");

-- CreateIndex
CREATE INDEX "PlanWeek_trainingPlanId_idx" ON "PlanWeek"("trainingPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanWeek_trainingPlanId_weekNumber_key" ON "PlanWeek"("trainingPlanId", "weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutType_name_key" ON "WorkoutType"("name");

-- CreateIndex
CREATE INDEX "PlanWorkout_weekId_idx" ON "PlanWorkout"("weekId");

-- CreateIndex
CREATE INDEX "PlanWorkout_workoutTypeId_idx" ON "PlanWorkout"("workoutTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanWorkout_weekId_workoutTypeId_key" ON "PlanWorkout"("weekId", "workoutTypeId");

-- CreateIndex
CREATE INDEX "TrainingPlan_userId_idx" ON "TrainingPlan"("userId");

-- AddForeignKey
ALTER TABLE "TrainingPlan" ADD CONSTRAINT "TrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanAthlete" ADD CONSTRAINT "TrainingPlanAthlete_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanAthlete" ADD CONSTRAINT "TrainingPlanAthlete_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanWeek" ADD CONSTRAINT "PlanWeek_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanWorkout" ADD CONSTRAINT "PlanWorkout_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "PlanWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanWorkout" ADD CONSTRAINT "PlanWorkout_workoutTypeId_fkey" FOREIGN KEY ("workoutTypeId") REFERENCES "WorkoutType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
