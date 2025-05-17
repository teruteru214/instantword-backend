import {
	bigint,
	date,
	index,
	mysqlTable,
	serial,
	tinyint,
	unique,
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
		translation: varchar("translation", { length: 100 }).notNull(),
		pronunciation: varchar("pronunciation", { length: 200 }),
		meaning: varchar("meaning", { length: 300 }),
		frequency: tinyint("frequency", { unsigned: true }),
		etymology: varchar("etymology", { length: 500 }),
		note: varchar("note", { length: 500 }),
		img: varchar("img", { length: 250 }),
	},
	(table) => ({
		userWordIndex: index("idx_words_user_word").on(table.userId, table.word),
		wordIndex: index("idx_words_word").on(table.word),
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
	category: varchar("category", { length: 20 }).notNull().unique(),
	name: varchar("name", { length: 20 }).notNull().unique(),
	description: varchar("description", { length: 50 }).notNull().unique(),
});

export const deletion_schedules = mysqlTable("deletion_schedules", {
	id: serial("id").primaryKey(),
	wordId: bigint("word_id", { mode: "number", unsigned: true })
		.notNull()
		.unique()
		.references(() => words.id, { onDelete: "cascade" }),
	delete_date: date("delete_date").notNull(),
});

export const inputs = mysqlTable(
	"inputs",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		wordId: bigint("word_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => words.id, { onDelete: "cascade" }),
	},
	(table) => ({
		inputsUserWordUnique: unique("uq_inputs_user_word").on(
			table.userId,
			table.wordId,
		),
		inputsUserWordIndex: index("idx_inputs_user_word").on(
			table.userId,
			table.wordId,
		),
	}),
);
