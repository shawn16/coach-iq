/*
  Warnings:

  - Made the column `details` on table `plan_workouts` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `workout_results` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkoutTypeEnum" AS ENUM ('RUN', 'WORKOUT', 'RACE', 'OTHER');

-- AlterTable
ALTER TABLE "plan_workouts" ALTER COLUMN "details" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout_results" DROP COLUMN "type",
ADD COLUMN     "type" "WorkoutTypeEnum" NOT NULL;
