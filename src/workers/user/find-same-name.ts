import type { Context } from "hono";
import { getDB } from "../../db";
import { findSameName } from "../../db/sql/user/findSameName";

interface FindSameNameRequest {
	name: string;
}

export async function handleFindSameName(c: Context) {
	try {
		// 1. リクエストボディからユーザー名を取得
		const body = await c.req.json<FindSameNameRequest>();
		const { name } = body;

		// 2. 必須パラメータの検証
		if (!name) {
			return c.json(
				{
					error: "Missing required parameter: name",
				},
				400,
			);
		}

		// 3. ユーザー名の重複チェック
		const db = getDB();
		const isNameTaken = await findSameName(db, name);

		// 4. 結果を返す
		return c.json({
			exists: isNameTaken,
			message: isNameTaken
				? "このユーザー名は既に使用されています"
				: "このユーザー名は使用可能です",
		});
	} catch (error) {
		console.error("Error in find-same-name endpoint:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
}
