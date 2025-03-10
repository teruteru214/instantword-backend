import {
	bigint,
	index,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const words = mysqlTable(
	"words",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		word: varchar("word", { length: 50 }).notNull(),
		translation: varchar("translation", { length: 100 }),
		pronunciation: varchar("pronunciation", { length: 200 }),
		meaning: varchar("meaning", { length: 300 }),
		frequency: tinyint("frequency", { unsigned: true }).notNull(),
		trend: varchar("trend", { length: 500 }),
		etymology: varchar("etymology", { length: 500 }),
		other: varchar("other", { length: 500 }),
		img: varchar("img", { length: 250 }),
	},
	(table) => ({
		userWordIndex: index("idx_words_user_word").on(table.userId, table.word),
	}),
);

export const examples = mysqlTable(
	"examples",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 100 }).notNull(),
		translation: varchar("translation", { length: 200 }),
	},
	(table) => ({
		wordIdIndex: index("idx_examples_word_id").on(table.wordId),
	}),
);

export const collocations = mysqlTable(
	"collocations",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 100 }).notNull(),
		translation: varchar("translation", { length: 200 }),
	},
	(table) => ({
		wordCollocationIndex: index("idx_collocations_word").on(table.wordId),
	}),
);

export const derivations = mysqlTable(
	"derivations",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 100 }).notNull(),
		translation: varchar("translation", { length: 200 }),
	},
	(table) => ({
		wordDerivationIndex: index("idx_derivations_word").on(table.wordId),
	}),
);

export const phrasal_verbs = mysqlTable(
	"phrasal_verbs",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 50 }).notNull(),
		translation: varchar("translation", { length: 100 }),
	},
	(table) => ({
		wordPhrasalVerbsIndex: index("idx_phrasal_verbs_word").on(table.wordId),
	}),
);

export const synonyms = mysqlTable(
	"synonyms",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 50 }).notNull(),
		translation: varchar("translation", { length: 100 }),
	},
	(table) => ({
		wordSynonymsIndex: index("idx_synonyms_word").on(table.wordId),
	}),
);

export const antonyms = mysqlTable(
	"antonyms",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		text: varchar("text", { length: 50 }).notNull(),
		translation: varchar("translation", { length: 100 }),
	},
	(table) => ({
		wordAntonymsIndex: index("idx_antonyms_word").on(table.wordId),
	}),
);

export const word_types = mysqlTable(
	"word_types",
	{
		id: serial("id").primaryKey(),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
		typeId: tinyint("type_id", { unsigned: true })
			.notNull()
			.references(() => types.id, { onDelete: "cascade" }),
	},
	(table) => ({
		wordTypeIndex: index("idx_word_types").on(table.wordId, table.typeId),
	}),
);

export const types = mysqlTable("types", {
	id: tinyint("id", { unsigned: true }).primaryKey().autoincrement(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});
