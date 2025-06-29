import type { Context } from "hono";
import { getDB } from "../../db";
import { findUserByUid } from "../../db/sql/user/findUser";
import { verifyAndExtractFirebaseJwt } from "../../utils/firebaseJwt";

export async function handleFindUser(c: Context) {
	try {
		const authHeader = c.req.header("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return c.json({ error: "Authorization header is required" }, 401);
		}

		const token = authHeader.substring(7);

		const jwtResult = await verifyAndExtractFirebaseJwt(token);
		if (!jwtResult.success) {
			return c.json(
				{ error: jwtResult.error },
				jwtResult.code as 400 | 401 | 500,
			);
		}

		const { uid, email } = jwtResult;

		if (!uid) {
			return c.json({ error: "Invalid token: uid not found" }, 403);
		}

		if (!email) {
			return c.json({ error: "Invalid token: email not found" }, 403);
		}

		const db = getDB();
		const user = await findUserByUid(db, uid, email);

		if (!user) {
			return c.json(
				{
					exists: false,
					message: "User not found",
				},
				200,
			);
		}

		return c.json({
			exists: true,
			user: {
				user_id: user.user_id,
				name: user.name,
				img: user.img,
				language: user.language,
				speaker: user.speaker,
			},
		});
	} catch (error) {
		console.error("Error in find-user endpoint:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
}
