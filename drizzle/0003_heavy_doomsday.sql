DROP INDEX "users_table_email_unique";--> statement-breakpoint
ALTER TABLE `items_table` ALTER COLUMN "createdBy" TO "createdBy" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
ALTER TABLE `items_table` ALTER COLUMN "updatedBy" TO "updatedBy" integer NOT NULL;