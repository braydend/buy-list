PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`price` integer NOT NULL,
	`userId` integer NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`createdBy` integer DEFAULT 1 NOT NULL,
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedBy` integer DEFAULT 1 NOT NULL,
	`deletedAt` integer,
	`deletedBy` integer,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_items_table`("id", "name", "tags", "price", "userId") SELECT "id", "name", "tags", "price", "userId" FROM `items_table`;--> statement-breakpoint
DROP TABLE `items_table`;--> statement-breakpoint
ALTER TABLE `__new_items_table` RENAME TO `items_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;