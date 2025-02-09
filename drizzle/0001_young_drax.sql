DROP INDEX "users_table_email_unique";--> statement-breakpoint
ALTER TABLE `items_table` ALTER COLUMN "tags" TO "tags" text NOT NULL DEFAULT '[]';--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
ALTER TABLE `items_table` ALTER COLUMN "price" TO "price" integer NOT NULL;