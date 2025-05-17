CREATE TABLE `deletion_schedules` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`delete_date` date NOT NULL,
	CONSTRAINT `deletion_schedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inputs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	CONSTRAINT `inputs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `speakers` (
	`id` tinyint unsigned AUTO_INCREMENT NOT NULL,
	`identifier` varchar(20) NOT NULL,
	`feature` varchar(20) NOT NULL,
	CONSTRAINT `speakers_id` PRIMARY KEY(`id`),
	CONSTRAINT `speakers_identifier_unique` UNIQUE(`identifier`),
	CONSTRAINT `speakers_feature_unique` UNIQUE(`feature`)
);
--> statement-breakpoint
CREATE TABLE `user_speakers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`speaker_id` tinyint unsigned NOT NULL,
	CONSTRAINT `user_speakers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `note_prompts` (
	`user_id` bigint unsigned NOT NULL,
	`text` varchar(500) NOT NULL,
	CONSTRAINT `note_prompts_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
DROP TABLE `user_words`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_stripe_customer_id_unique`;--> statement-breakpoint
DROP INDEX `idx_words_deleted_at` ON `words`;--> statement-breakpoint
ALTER TABLE `types` MODIFY COLUMN `name` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `words` MODIFY COLUMN `translation` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `words` MODIFY COLUMN `frequency` tinyint unsigned;--> statement-breakpoint
ALTER TABLE `types` ADD `category` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `types` ADD `description` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `types` ADD CONSTRAINT `types_category_unique` UNIQUE(`category`);--> statement-breakpoint
ALTER TABLE `types` ADD CONSTRAINT `types_description_unique` UNIQUE(`description`);--> statement-breakpoint
ALTER TABLE `deletion_schedules` ADD CONSTRAINT `deletion_schedules_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inputs` ADD CONSTRAINT `inputs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inputs` ADD CONSTRAINT `inputs_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_speakers` ADD CONSTRAINT `user_speakers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_speakers` ADD CONSTRAINT `user_speakers_speaker_id_speakers_id_fk` FOREIGN KEY (`speaker_id`) REFERENCES `speakers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `note_prompts` ADD CONSTRAINT `note_prompts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_user_words` ON `inputs` (`user_id`,`word_id`);--> statement-breakpoint
CREATE INDEX `idx_user_speakers` ON `user_speakers` (`user_id`,`speaker_id`);--> statement-breakpoint
CREATE INDEX `idx_note_prompts_user` ON `note_prompts` (`user_id`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `speaker`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `stripe_customer_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `note_prompt`;--> statement-breakpoint
ALTER TABLE `words` DROP COLUMN `deleted_at`;