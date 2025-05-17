import { mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	img: varchar("img", { length: 250 }),
	uid: varchar("uid", { length: 128 }).notNull().unique(),
	provider: mysqlEnum("provider", ["google", "magic_link"]).notNull(),
});
