CREATE TABLE `user_words` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	CONSTRAINT `user_words_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `words` RENAME COLUMN `other` TO `note`;--> statement-breakpoint
ALTER TABLE `users` ADD `note_prompt` varchar(500);--> statement-breakpoint
ALTER TABLE `words` ADD `delete_at` date;--> statement-breakpoint
ALTER TABLE `user_words` ADD CONSTRAINT `user_words_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_words` ADD CONSTRAINT `user_words_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_user_words` ON `user_words` (`user_id`,`word_id`);--> statement-breakpoint
CREATE INDEX `idx_words_frequency` ON `words` (`frequency`);--> statement-breakpoint
CREATE INDEX `idx_words_word` ON `words` (`word`);--> statement-breakpoint
CREATE INDEX `idx_words_delete_at` ON `words` (`delete_at`);--> statement-breakpoint
ALTER TABLE `words` DROP COLUMN `trend`;