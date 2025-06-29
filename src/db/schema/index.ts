import { relations } from "drizzle-orm";
import { speaker, user_speaker } from "./speaker";
import { users } from "./user";

export * from "./user";
export * from "./word";
export * from "./tag";
export * from "./speaker";
export * from "./ai";
export * from "./language";

export const usersRelations = relations(users, ({ many }) => ({
	user_speakers: many(user_speaker),
}));

export const user_speakersRelations = relations(user_speaker, ({ one }) => ({
	speaker: one(speaker, {
		fields: [user_speaker.speakerId],
		references: [speaker.id],
	}),
}));
