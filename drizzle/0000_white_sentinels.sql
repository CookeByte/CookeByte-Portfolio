CREATE TABLE `projectBriefs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`receiptId` varchar(48) NOT NULL,
	`contactName` varchar(120) NOT NULL,
	`businessName` varchar(160) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`projectType` varchar(96) NOT NULL,
	`budget` varchar(64) NOT NULL,
	`details` text NOT NULL,
	`receiptConsentAt` timestamp NOT NULL,
	`emailDeliveryStatus` enum('deferred') NOT NULL DEFAULT 'deferred',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projectBriefs_id` PRIMARY KEY(`id`),
	CONSTRAINT `projectBriefs_receiptId_unique` UNIQUE(`receiptId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
