import { bigint, index, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./user";

export const note_prompts = mysqlTable(
	"note_prompts",
	{
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" })
			.unique(),
		text: varchar("text", { length: 500 }).notNull(),
	},
	(table) => ({
		userIdIndex: index("idx_note_prompts_user").on(table.userId),
	}),
);
