import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	schema: "./src/db/schema/*",
	out: "./src/db/drizzle",

	dbCredentials: {
		url: `{ここにDATABASE_URLをはる}?ssl={"rejectUnauthorized":true}`,
	},

	introspect: {
		casing: "camel",
	},

	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
	},

	strict: true, // 型チェックを厳密化
	verbose: true, // デバッグ用に詳細なログを有効化
});
