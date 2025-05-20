-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "grade" INTEGER NOT NULL,
    "time1600m" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER,
    "type" TEXT,
    "planType" TEXT,
    "totalWorkouts" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingPlan_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "WorkoutResult" (
    "id" TEXT NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutResult_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "TrainingPlan_userId_idx" ON "TrainingPlan"("userId");

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
CREATE INDEX "WorkoutLibraryItem_userId_idx" ON "WorkoutLibraryItem"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "WorkoutResult" ADD CONSTRAINT "WorkoutResult_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLibraryItem" ADD CONSTRAINT "WorkoutLibraryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
