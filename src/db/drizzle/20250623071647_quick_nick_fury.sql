CREATE TABLE `ai` (
	`id` tinyint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	CONSTRAINT `ai_id` PRIMARY KEY(`id`),
	CONSTRAINT `ai_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `note_prompt` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`text` varchar(50) NOT NULL,
	CONSTRAINT `note_prompt_id` PRIMARY KEY(`id`),
	CONSTRAINT `note_prompt_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `user_ai` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`ai_id` tinyint unsigned NOT NULL,
	CONSTRAINT `user_ai_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_ai_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`name` enum('google','magic_link') NOT NULL,
	`uid` varchar(128) NOT NULL,
	CONSTRAINT `providers_id` PRIMARY KEY(`id`),
	CONSTRAINT `providers_uid_unique` UNIQUE(`uid`)
);
--> statement-breakpoint
CREATE TABLE `purpose` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `purpose_id` PRIMARY KEY(`id`),
	CONSTRAINT `purpose_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	`img` varchar(250),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_name_unique` UNIQUE(`name`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `antonyms` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(50) NOT NULL,
	`translation` varchar(100),
	CONSTRAINT `antonyms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `collocations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(100) NOT NULL,
	`translation` varchar(200),
	CONSTRAINT `collocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deletion_schedules` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`delete_date` date NOT NULL,
	CONSTRAINT `deletion_schedules_id` PRIMARY KEY(`id`),
	CONSTRAINT `deletion_schedules_word_id_unique` UNIQUE(`word_id`)
);
--> statement-breakpoint
CREATE TABLE `derivations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(100) NOT NULL,
	`translation` varchar(200),
	CONSTRAINT `derivations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `examples` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(100) NOT NULL,
	`translation` varchar(200),
	CONSTRAINT `examples_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inputs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	CONSTRAINT `inputs_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_inputs_user_word` UNIQUE(`user_id`,`word_id`)
);
--> statement-breakpoint
CREATE TABLE `phrasal_verbs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(50) NOT NULL,
	`translation` varchar(100),
	CONSTRAINT `phrasal_verbs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `synonyms` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`text` varchar(50) NOT NULL,
	`translation` varchar(100),
	CONSTRAINT `synonyms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` tinyint unsigned AUTO_INCREMENT NOT NULL,
	`category` varchar(20) NOT NULL,
	`name` varchar(20) NOT NULL,
	`description` varchar(50) NOT NULL,
	CONSTRAINT `types_id` PRIMARY KEY(`id`),
	CONSTRAINT `types_category_unique` UNIQUE(`category`),
	CONSTRAINT `types_name_unique` UNIQUE(`name`),
	CONSTRAINT `types_description_unique` UNIQUE(`description`)
);
--> statement-breakpoint
CREATE TABLE `word_types` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`type_id` tinyint unsigned NOT NULL,
	CONSTRAINT `word_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`word` varchar(50) NOT NULL,
	`translation` varchar(100) NOT NULL,
	`pronunciation` varchar(200),
	`meaning` varchar(300),
	`frequency` tinyint unsigned,
	`etymology` varchar(500),
	`note` varchar(500),
	`img` varchar(250),
	CONSTRAINT `words_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tag_words` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tag_id` bigint unsigned NOT NULL,
	`word_id` bigint unsigned NOT NULL,
	`position` varchar(20) NOT NULL,
	CONSTRAINT `tag_words_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_tag_words_unique` UNIQUE(`tag_id`,`word_id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`name` varchar(15) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_tags_user_name` UNIQUE(`user_id`,`name`)
);
--> statement-breakpoint
CREATE TABLE `speaker` (
	`id` tinyint unsigned AUTO_INCREMENT NOT NULL,
	`identifier` varchar(20) NOT NULL,
	`feature` varchar(20) NOT NULL,
	CONSTRAINT `speaker_id` PRIMARY KEY(`id`),
	CONSTRAINT `speaker_identifier_unique` UNIQUE(`identifier`),
	CONSTRAINT `speaker_feature_unique` UNIQUE(`feature`)
);
--> statement-breakpoint
CREATE TABLE `user_speaker` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`speaker_id` tinyint unsigned NOT NULL,
	CONSTRAINT `user_speaker_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_speaker_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `language` (
	`id` tinyint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	CONSTRAINT `language_id` PRIMARY KEY(`id`),
	CONSTRAINT `language_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user_language` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`language_id` tinyint unsigned NOT NULL,
	CONSTRAINT `user_language_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_language_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `note_prompt` ADD CONSTRAINT `note_prompt_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_ai` ADD CONSTRAINT `user_ai_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_ai` ADD CONSTRAINT `user_ai_ai_id_ai_id_fk` FOREIGN KEY (`ai_id`) REFERENCES `ai`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `providers` ADD CONSTRAINT `providers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purpose` ADD CONSTRAINT `purpose_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `antonyms` ADD CONSTRAINT `antonyms_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `collocations` ADD CONSTRAINT `collocations_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `deletion_schedules` ADD CONSTRAINT `deletion_schedules_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `derivations` ADD CONSTRAINT `derivations_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `examples` ADD CONSTRAINT `examples_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inputs` ADD CONSTRAINT `inputs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `inputs` ADD CONSTRAINT `inputs_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `phrasal_verbs` ADD CONSTRAINT `phrasal_verbs_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `synonyms` ADD CONSTRAINT `synonyms_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `word_types` ADD CONSTRAINT `word_types_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `word_types` ADD CONSTRAINT `word_types_type_id_types_id_fk` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `words` ADD CONSTRAINT `words_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag_words` ADD CONSTRAINT `tag_words_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag_words` ADD CONSTRAINT `tag_words_word_id_words_id_fk` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tags` ADD CONSTRAINT `tags_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_speaker` ADD CONSTRAINT `user_speaker_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_speaker` ADD CONSTRAINT `user_speaker_speaker_id_speaker_id_fk` FOREIGN KEY (`speaker_id`) REFERENCES `speaker`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_language` ADD CONSTRAINT `user_language_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_language` ADD CONSTRAINT `user_language_language_id_language_id_fk` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_note_prompt_user_id` ON `note_prompt` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_user_ai_user_id` ON `user_ai` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_providers_user_id` ON `providers` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_providers_uid` ON `providers` (`uid`);--> statement-breakpoint
CREATE INDEX `idx_purpose_user_id` ON `purpose` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_antonyms_word` ON `antonyms` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_collocations_word` ON `collocations` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_derivations_word` ON `derivations` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_examples_word_id` ON `examples` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_inputs_user_word` ON `inputs` (`user_id`,`word_id`);--> statement-breakpoint
CREATE INDEX `idx_phrasal_verbs_word` ON `phrasal_verbs` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_synonyms_word` ON `synonyms` (`word_id`);--> statement-breakpoint
CREATE INDEX `idx_word_types` ON `word_types` (`word_id`,`type_id`);--> statement-breakpoint
CREATE INDEX `idx_words_user_word` ON `words` (`user_id`,`word`);--> statement-breakpoint
CREATE INDEX `idx_words_word` ON `words` (`word`);--> statement-breakpoint
CREATE INDEX `idx_word_tags` ON `tag_words` (`word_id`,`tag_id`);--> statement-breakpoint
CREATE INDEX `idx_user_speaker_user_id` ON `user_speaker` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_user_language_user_id` ON `user_language` (`user_id`);