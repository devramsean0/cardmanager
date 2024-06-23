CREATE TABLE `card` (
	`name` text,
	`collection_id` integer,
	`type` text,
	FOREIGN KEY (`collection_id`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `collection` ADD `id` integer PRIMARY KEY NOT NULL;