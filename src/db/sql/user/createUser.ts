import { eq } from "drizzle-orm";
import type { DB } from "../../index";
import {
	language,
	providers,
	purpose,
	tags,
	user_language,
	users,
} from "../../schema";

export interface CreateUserResult {
	user_id: number;
	name: string;
	img: string | null;
	language: string | null;
}

export interface CreateUserParams {
	uid: string;
	name: string;
	email: string;
	img: string | null;
	language: string;
	purpose: string;
	provider: "google" | "magic_link";
}

export async function createUser(
	db: DB,
	params: CreateUserParams,
): Promise<CreateUserResult> {
	try {
		let userId: number;

		await db.transaction(async (tx) => {
			// 1. usersテーブルにユーザーを登録
			const userResult = await tx
				.insert(users)
				.values({
					name: params.name,
					email: params.email,
					img: params.img,
				})
				.execute();

			// TiDB Serverlessの戻り値からinsertIdを取得
			// @ts-ignore - TiDB Serverlessの型定義の問題を回避
			userId = userResult.lastInsertId;

			if (!userId || userId <= 0) {
				throw new Error("Failed to get valid userId from insert result");
			}

			// 2. providersテーブルにプロバイダー情報を登録
			await tx
				.insert(providers)
				.values({
					userId: userId,
					name: params.provider,
					uid: params.uid,
				})
				.execute();

			// 3. 言語IDを取得
			const languageResult = await tx
				.select({
					id: language.id,
				})
				.from(language)
				.where(eq(language.name, params.language))
				.limit(1);

			if (languageResult.length > 0) {
				// 4. user_languageテーブルに言語設定を登録
				await tx
					.insert(user_language)
					.values({
						userId: userId,
						languageId: languageResult[0].id,
					})
					.execute();
			}

			// 5. purposeテーブルに目的を登録
			await tx
				.insert(purpose)
				.values({
					userId: userId,
					name: params.purpose,
				})
				.execute();

			// 6. __root__タグを作成
			await tx
				.insert(tags)
				.values({
					userId: userId,
					name: "__root__",
				})
				.execute();
		});

		// 登録されたユーザー情報を取得して返す
		const userResult = await db
			.select({
				user_id: users.id,
				name: users.name,
				img: users.img,
			})
			.from(users)
			.where(eq(users.email, params.email))
			.limit(1);

		const languageResult = await db
			.select({
				language_name: language.name,
			})
			.from(user_language)
			.innerJoin(language, eq(user_language.languageId, language.id))
			.where(eq(user_language.userId, userResult[0].user_id))
			.limit(1);

		return {
			user_id: userResult[0].user_id,
			name: userResult[0].name,
			img: userResult[0].img,
			language:
				languageResult.length > 0 ? languageResult[0].language_name : null,
		};
	} catch (error) {
		console.error("Error creating user:", error);
		throw new Error("Failed to create user");
	}
}
