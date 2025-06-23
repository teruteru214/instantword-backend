import {
	bigint,
	index,
	mysqlEnum,
	mysqlTable,
	serial,
	varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 20 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	img: varchar("img", { length: 250 }),
});

export const providers = mysqlTable(
	"providers",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		name: mysqlEnum("name", ["google", "magic_link"]).notNull(),
		uid: varchar("uid", { length: 128 }).notNull().unique(),
	},
	(table) => ({
		userIdIndex: index("idx_providers_user_id").on(table.userId),
		uidIndex: index("idx_providers_uid").on(table.uid),
	}),
);

export const purpose = mysqlTable(
	"purpose",
	{
		id: serial("id").primaryKey(),
		userId: bigint("user_id", { mode: "number", unsigned: true })
			.notNull()
			.unique()
			.references(() => users.id, { onDelete: "cascade" }),
		name: varchar("name", { length: 50 }).notNull(),
	},
	(table) => ({
		userIdIndex: index("idx_purpose_user_id").on(table.userId),
	}),
);
