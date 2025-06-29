import { eq, or } from "drizzle-orm";
import type { DB } from "../../index";
import {
	language,
	providers,
	speaker,
	user_language,
	user_speaker,
	users,
} from "../../schema";

export interface FindUserResult {
	user_id: number;
	name: string;
	img: string | null;
	language: string | null;
	speaker: string | null;
}

export async function findUserByUid(
	db: DB,
	uid: string,
	email: string,
): Promise<FindUserResult | null> {
	try {
		const userResult = await db
			.select({
				user_id: users.id,
				name: users.name,
				img: users.img,
			})
			.from(users)
			.innerJoin(providers, eq(providers.userId, users.id))
			.where(or(eq(providers.uid, uid), eq(users.email, email)))
			.limit(1);

		if (userResult.length === 0) {
			return null;
		}

		const user = userResult[0];

		const languageResult = await db
			.select({
				language_name: language.name,
			})
			.from(user_language)
			.innerJoin(language, eq(user_language.languageId, language.id))
			.where(eq(user_language.userId, user.user_id))
			.limit(1);

		const speakerResult = await db
			.select({
				speaker_identifier: speaker.identifier,
			})
			.from(user_speaker)
			.innerJoin(speaker, eq(user_speaker.speakerId, speaker.id))
			.where(eq(user_speaker.userId, user.user_id))
			.limit(1);

		return {
			user_id: user.user_id,
			name: user.name,
			img: user.img,
			language:
				languageResult.length > 0 ? languageResult[0].language_name : null,
			speaker:
				speakerResult.length > 0 ? speakerResult[0].speaker_identifier : null,
		};
	} catch (error) {
		console.error("Error finding user by uid or email:", error);
		throw new Error("Failed to find user");
	}
}
