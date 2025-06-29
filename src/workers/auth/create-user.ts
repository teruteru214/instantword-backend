import type { Context } from "hono";
import { getDB } from "../../db";
import { createUser } from "../../db/sql/user/createUser";
import { verifyAndExtractFirebaseJwt } from "../../utils/firebaseJwt";

interface CreateUserRequest {
	name: string;
	language: string;
	purpose: string;
}

export async function handleCreateUser(c: Context) {
	try {
		// 1. AuthorizationヘッダーからJWTトークンを取得
		const authHeader = c.req.header("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return c.json({ error: "Authorization header is required" }, 401);
		}

		const token = authHeader.substring(7);

		// 2. JWTトークンを検証してuid、img、email、providerを取得
		const jwtResult = await verifyAndExtractFirebaseJwt(token);
		if (!jwtResult.success) {
			return c.json(
				{ error: jwtResult.error },
				jwtResult.code as 400 | 401 | 500,
			);
		}

		const { uid, img, email, provider } = jwtResult;

		if (!uid || !email) {
			return c.json({ error: "Invalid token: uid or email not found" }, 401);
		}

		// 3. リクエストボディからパラメータを取得
		const body = await c.req.json<CreateUserRequest>();
		const { name, language, purpose } = body;

		// 必須パラメータの検証
		if (!name) {
			return c.json(
				{
					error: "Missing required parameters: name, language, purpose",
				},
				400,
			);
		}

		// 4. JWTから取得したproviderを適切な値に変換
		let providerName: "google" | "magic_link";
		if (provider === "google.com") {
			providerName = "google";
		} else if (provider === "password") {
			providerName = "magic_link";
		} else {
			return c.json({ error: "Unsupported provider" }, 400);
		}

		// 5. ユーザーを作成
		const db = getDB();
		const userResult = await createUser(db, {
			uid,
			name,
			email,
			img,
			language,
			purpose,
			provider: providerName,
		});

		// 6. 作成成功レスポンス
		return c.json(
			{
				success: true,
				message: "User created successfully",
				user: {
					user_id: userResult.user_id,
					name: userResult.name,
					img: userResult.img,
					language: userResult.language,
				},
			},
			201,
		);
	} catch (error) {
		console.error("Error in create-user endpoint:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
}
