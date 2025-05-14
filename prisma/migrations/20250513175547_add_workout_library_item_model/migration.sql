/*
  Warnings:

  - You are about to drop the `WorkoutLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutLibrary" DROP CONSTRAINT "WorkoutLibrary_userId_fkey";

-- DropTable
DROP TABLE "WorkoutLibrary";

-- DropEnum
DROP TYPE "WorkoutCategory";

-- CreateTable
CREATE TABLE "WorkoutLibraryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutLibraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkoutLibraryItem_userId_idx" ON "WorkoutLibraryItem"("userId");

-- AddForeignKey
ALTER TABLE "WorkoutLibraryItem" ADD CONSTRAINT "WorkoutLibraryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
