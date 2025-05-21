/*
  Warnings:

  - You are about to drop the column `coachId` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `time1600m` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `durationWeeks` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `planType` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `totalWorkouts` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `training_plans` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlanAthlete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutLibraryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coach_id` to the `athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_1600m` to the `athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `athletes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_weeks` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `training_plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlanWeek" DROP CONSTRAINT "PlanWeek_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "PlanWorkout" DROP CONSTRAINT "PlanWorkout_weekId_fkey";

-- DropForeignKey
ALTER TABLE "PlanWorkout" DROP CONSTRAINT "PlanWorkout_workoutTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanAthlete" DROP CONSTRAINT "TrainingPlanAthlete_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanAthlete" DROP CONSTRAINT "TrainingPlanAthlete_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLibraryItem" DROP CONSTRAINT "WorkoutLibraryItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutResult" DROP CONSTRAINT "WorkoutResult_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "athletes" DROP CONSTRAINT "athletes_coachId_fkey";

-- DropForeignKey
ALTER TABLE "training_plans" DROP CONSTRAINT "training_plans_userId_fkey";

-- DropIndex
DROP INDEX "idx_athlete_coach";

-- DropIndex
DROP INDEX "idx_athlete_name";

-- DropIndex
DROP INDEX "training_plans_userId_idx";

-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "coachId",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "time1600m",
DROP COLUMN "updatedAt",
ADD COLUMN     "coach_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "time_1600m" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "training_plans" DROP COLUMN "createdAt",
DROP COLUMN "durationWeeks",
DROP COLUMN "endDate",
DROP COLUMN "isCompleted",
DROP COLUMN "planType",
DROP COLUMN "startDate",
DROP COLUMN "totalWorkouts",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration_weeks" INTEGER NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan_type" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "total_workouts" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "PlanWeek";

-- DropTable
DROP TABLE "PlanWorkout";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "TrainingPlanAthlete";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "WorkoutLibraryItem";

-- DropTable
DROP TABLE "WorkoutResult";

-- DropTable
DROP TABLE "WorkoutType";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "training_plan_athletes" (
    "training_plan_id" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_plan_athletes_pkey" PRIMARY KEY ("training_plan_id","athlete_id")
);

-- CreateTable
CREATE TABLE "plan_weeks" (
    "id" TEXT NOT NULL,
    "week_number" INTEGER NOT NULL,
    "date_range" TEXT NOT NULL,
    "season_phase" TEXT,
    "deleted_at" TIMESTAMPTZ,
    "training_plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_weeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_workouts" (
    "id" TEXT NOT NULL,
    "details" TEXT,
    "deleted_at" TIMESTAMPTZ,
    "week_id" TEXT NOT NULL,
    "workout_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_results" (
    "id" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "notes" TEXT,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_library_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "user_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_library_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "training_plan_athletes_athlete_id_idx" ON "training_plan_athletes"("athlete_id");

-- CreateIndex
CREATE INDEX "training_plan_athletes_training_plan_id_idx" ON "training_plan_athletes"("training_plan_id");

-- CreateIndex
CREATE INDEX "plan_weeks_training_plan_id_idx" ON "plan_weeks"("training_plan_id");

-- CreateIndex
CREATE INDEX "idx_plan_week_deleted_at" ON "plan_weeks"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "plan_weeks_training_plan_id_week_number_key" ON "plan_weeks"("training_plan_id", "week_number");

-- CreateIndex
CREATE INDEX "idx_workout_type_deleted_at" ON "workout_types"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "workout_types_name_key" ON "workout_types"("name");

-- CreateIndex
CREATE INDEX "plan_workouts_week_id_idx" ON "plan_workouts"("week_id");

-- CreateIndex
CREATE INDEX "plan_workouts_workout_type_id_idx" ON "plan_workouts"("workout_type_id");

-- CreateIndex
CREATE INDEX "idx_plan_workout_deleted_at" ON "plan_workouts"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "plan_workouts_week_id_workout_type_id_key" ON "plan_workouts"("week_id", "workout_type_id");

-- CreateIndex
CREATE INDEX "workout_results_athlete_id_idx" ON "workout_results"("athlete_id");

-- CreateIndex
CREATE INDEX "workout_results_date_idx" ON "workout_results"("date");

-- CreateIndex
CREATE INDEX "idx_workout_result_deleted_at" ON "workout_results"("deleted_at");

-- CreateIndex
CREATE INDEX "workout_library_items_user_id_idx" ON "workout_library_items"("user_id");

-- CreateIndex
CREATE INDEX "idx_workout_library_item_deleted_at" ON "workout_library_items"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_athlete_coach" ON "athletes"("coach_id");

-- CreateIndex
CREATE INDEX "idx_athlete_name" ON "athletes"("last_name", "first_name");

-- CreateIndex
CREATE INDEX "training_plans_user_id_idx" ON "training_plans"("user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_plan_athletes" ADD CONSTRAINT "training_plan_athletes_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_plan_athletes" ADD CONSTRAINT "training_plan_athletes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_weeks" ADD CONSTRAINT "plan_weeks_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_workouts" ADD CONSTRAINT "plan_workouts_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "plan_weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_workouts" ADD CONSTRAINT "plan_workouts_workout_type_id_fkey" FOREIGN KEY ("workout_type_id") REFERENCES "workout_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_results" ADD CONSTRAINT "workout_results_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_library_items" ADD CONSTRAINT "workout_library_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
