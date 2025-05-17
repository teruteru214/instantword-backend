import { drizzle } from "drizzle-orm/mysql2";
import type { Context } from "hono";
import { env } from "hono/adapter";
import mysql from "mysql2/promise";

let connectionPool: mysql.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

export async function initDB(c: Context) {
	if (!connectionPool) {
		const { DATABASE_URL } = env(c);
		connectionPool = await mysql.createPool({
			uri: DATABASE_URL,
			ssl: {
				rejectUnauthorized: true,
			},
		});
		dbInstance = drizzle(connectionPool);
	}
	return dbInstance;
}

export function getDB() {
	if (!dbInstance) {
		throw new Error("Database not initialized. Call initDB first.");
	}
	return dbInstance;
}
