import { bigint, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "./user";

export const note_prompts = mysqlTable("note_prompts", {
	id: serial("id").primaryKey(),
	userId: bigint("user_id", { mode: "number", unsigned: true })
		.notNull()
		.unique()
		.references(() => users.id, { onDelete: "cascade" }),
	text: varchar("text", { length: 500 }).notNull(),
});
