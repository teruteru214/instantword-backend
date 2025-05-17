import {
	bigint,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const speakers = mysqlTable("speakers", {
	id: tinyint("id", { unsigned: true }).primaryKey().autoincrement(),
	identifier: varchar("identifier", { length: 20 }).notNull().unique(),
	feature: varchar("feature", { length: 20 }).notNull().unique(),
});

export const user_speakers = mysqlTable(
	"user_speakers",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		speakerId: tinyint("speaker_id", { unsigned: true })
			.notNull()
			.references(() => speakers.id, { onDelete: "cascade" }),
	},
	// ...
);
