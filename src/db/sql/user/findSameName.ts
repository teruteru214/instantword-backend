import { eq, sql } from "drizzle-orm";
import type { DB } from "../../index";
import { users } from "../../schema";

export async function findSameName(db: DB, name: string): Promise<boolean> {
	try {
		const result = await db
			.select({ exists: sql`1` })
			.from(users)
			.where(eq(users.name, name))
			.limit(1);

		return result.length > 0;
	} catch (error) {
		console.error("Error checking for same name:", error);
		throw new Error("Failed to check for same name");
	}
}
