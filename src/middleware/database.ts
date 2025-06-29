import type { Context, Next } from "hono";
import { initDB } from "../db";

export const databaseMiddleware = async (c: Context, next: Next) => {
	const db = await initDB(c);
	c.set("db", db);
	await next();
};
