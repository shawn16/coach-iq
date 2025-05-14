-- CreateEnum
CREATE TYPE "WorkoutCategory" AS ENUM (
  'ENDURANCE_SUPPORT',
  'DIRECT_ENDURANCE',
  'SPECIFIC_ENDURANCE',
  'DIRECT_SPEED',
  'SPEED_SUPPORT'
);

-- CreateTable
CREATE TABLE "WorkoutLibrary" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "category" "WorkoutCategory" NOT NULL,
  "duration" TEXT NOT NULL,
  "description" TEXT,
  "icon" TEXT NOT NULL DEFAULT 'Clock',
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "WorkoutLibrary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutLibrary" ADD CONSTRAINT "WorkoutLibrary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
