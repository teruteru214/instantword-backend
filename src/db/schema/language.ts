import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const language = mysqlTable("language", {
	id: tinyint("id", { unsigned: true }).primaryKey().autoincrement(),
	name: varchar("name", { length: 20 }).notNull().unique(),
});

export const user_language = mysqlTable(
	"user_language",
	{
		id: int("id", { unsigned: true }).primaryKey().autoincrement(),
		userId: int("user_id", { unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		languageId: tinyint("language_id", { unsigned: true })
			.notNull()
			.references(() => language.id, { onDelete: "cascade" }),
	},
	(table) => ({
		userIdIndex: index("idx_user_language_user_id").on(table.userId),
	}),
);
