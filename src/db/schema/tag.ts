import {
	bigint,
	index,
	mysqlTable,
	serial,
	unique,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";
import { words } from "./word";

export const tags = mysqlTable(
	"tags",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		name: varchar("name", { length: 15 }).notNull(),
	},
	(table) => ({
		userTagUnique: unique("idx_tags_user_name").on(table.userId, table.name),
	}),
);

export const tag_words = mysqlTable(
	"tag_words",
	{
		id: serial("id").primaryKey(),
		tagId: bigint("tag_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		position: varchar("position", { length: 20 }).notNull(),
	},
	(table) => ({
		wordTagIndex: index("idx_word_tags").on(table.wordId, table.tagId),
		tagWordUnique: unique("idx_tag_words_unique").on(table.tagId, table.wordId),
	}),
);
