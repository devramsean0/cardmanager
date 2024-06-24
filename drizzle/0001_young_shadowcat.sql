CREATE TABLE `deck` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`format` text,
	`collection_id` integer,
	FOREIGN KEY (`collection_id`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
