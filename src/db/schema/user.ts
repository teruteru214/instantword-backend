import { mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	img: varchar("img", { length: 250 }),
	speaker: mysqlEnum("speaker", [
		"en-US-Standard-A",
		"en-US-Standard-B",
		"en-US-Standard-C",
		"en-US-Standard-D",
		"en-US-Standard-E",
		"en-US-Standard-F",
		"en-US-Standard-G",
		"en-US-Standard-H",
		"en-US-Standard-I",
		"en-US-Standard-J",
	])
		.notNull()
		.default("en-US-Standard-H"),
	stripe_customer_id: varchar("stripe_customer_id", { length: 255 }).unique(),
	note_prompt: varchar("note_prompt", { length: 500 }),
});
