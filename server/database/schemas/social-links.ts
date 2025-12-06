import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from './utils';
import { users } from '.';
import { relations } from 'drizzle-orm';

export const socialLinkTypeEnum = pgEnum('socialLinkTypeEnum', [
	'Github',
	'Facebook',
	'Linkedin',
	'Personal Website',
	'Other',
]);

export const socialLinks = pgTable('socialLinks', {
	id: id,
	url: varchar('url').notNull(),
	type: socialLinkTypeEnum('type').notNull(),
	userId: varchar('userId').references(() => users.id),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

export const socialLinkRelations = relations(socialLinks, ({ one }) => ({
	user: one(users, {
		fields: [socialLinks.userId],
		references: [users.id],
	}),
}));

export type SocialLink = typeof socialLinks.$inferSelect;
