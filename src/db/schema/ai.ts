import {
	bigint,
	index,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const ai = mysqlTable("ai", {
	id: tinyint("id", { unsigned: true }).primaryKey().autoincrement(),
	name: varchar("name", { length: 20 }).notNull().unique(),
});

export const user_ai = mysqlTable(
	"user_ai",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		aiId: tinyint("ai_id", { unsigned: true })
			.notNull()
			.references(() => ai.id, { onDelete: "cascade" }),
	},
	(table) => ({
		userIdIndex: index("idx_user_ai_user_id").on(table.userId),
	}),
);

export const note_prompt = mysqlTable(
	"note_prompt",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 50 }).notNull(),
	},
	(table) => ({
		userIdIndex: index("idx_note_prompt_user_id").on(table.userId),
	}),
);
