-- CreateIndex
CREATE INDEX "idx_athlete_coach" ON "Athlete"("coachId");

-- CreateIndex
CREATE INDEX "idx_athlete_name" ON "Athlete"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email");
