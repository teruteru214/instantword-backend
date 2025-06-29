import { connect } from "@tidbcloud/serverless";
import { drizzle } from "drizzle-orm/tidb-serverless";
import type { TiDBServerlessDatabase } from "drizzle-orm/tidb-serverless";
import type { Context } from "hono";
import type { Bindings } from "../types/binding";
import type * as schema from "./schema";

// スキーマの型を定義
export type Schema = typeof schema;
export type DB = TiDBServerlessDatabase<Schema>;

let client: ReturnType<typeof connect> | null = null;
let dbInstance: DB | null = null;

export async function initDB(c: Context<{ Bindings: Bindings }>): Promise<DB> {
	try {
		if (!client) {
			const { DATABASE_URL } = c.env;

			// TiDB Serverless用のクライアントを作成
			client = connect({ url: DATABASE_URL });
			dbInstance = drizzle({ client: client });
		}

		if (!dbInstance) {
			throw new Error("Database initialization failed");
		}
		return dbInstance;
	} catch (error) {
		console.error("Database initialization error:", error);
		// クライアントをリセット
		client = null;
		dbInstance = null;
		throw error;
	}
}

export function getDB(): DB {
	if (!dbInstance) {
		throw new Error("Database not initialized. Call initDB first.");
	}
	return dbInstance;
}
