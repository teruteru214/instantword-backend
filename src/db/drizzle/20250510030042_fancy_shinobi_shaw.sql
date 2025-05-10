ALTER TABLE `users` ADD `uid` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `provider` enum('google','magic_link') NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_uid_unique` UNIQUE(`uid`);