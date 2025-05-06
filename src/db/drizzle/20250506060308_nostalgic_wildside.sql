ALTER TABLE `words` RENAME COLUMN `delete_at` TO `deleted_at`;--> statement-breakpoint
DROP INDEX `idx_words_delete_at` ON `words`;--> statement-breakpoint
CREATE INDEX `idx_words_deleted_at` ON `words` (`deleted_at`);