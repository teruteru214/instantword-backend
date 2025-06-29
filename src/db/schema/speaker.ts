import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const speaker = mysqlTable("speaker", {
	id: tinyint("id", { unsigned: true }).primaryKey().autoincrement(),
	identifier: varchar("identifier", { length: 20 }).notNull().unique(),
	feature: varchar("feature", { length: 20 }).notNull().unique(),
});

export const user_speaker = mysqlTable(
	"user_speaker",
	{
		id: int("id", { unsigned: true }).primaryKey().autoincrement(),
		userId: int("user_id", { unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		speakerId: tinyint("speaker_id", { unsigned: true })
			.notNull()
			.references(() => speaker.id, { onDelete: "cascade" }),
	},
	(table) => ({
		userIdIndex: index("idx_user_speaker_user_id").on(table.userId),
	}),
);
