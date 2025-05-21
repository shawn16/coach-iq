-- CreateIndex
CREATE INDEX "idx_training_plan_start_date" ON "training_plans"("start_date");

-- CreateIndex
CREATE INDEX "idx_training_plan_end_date" ON "training_plans"("end_date");

-- RenameIndex
ALTER INDEX "training_plans_user_id_idx" RENAME TO "idx_training_plan_user_id";
