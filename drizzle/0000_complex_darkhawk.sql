CREATE TABLE `card` (
	`name` text,
	`collection_id` integer,
	`type` text,
	`card_data` text,
	FOREIGN KEY (`collection_id`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `collection` (
	`id` integer PRIMARY KEY AUTOINCREMENT DEFAULT 0 NOT NULL,
	`name` text,
	`type` text
);
