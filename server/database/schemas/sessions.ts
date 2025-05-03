import { relations } from 'drizzle-orm';
import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';
import { users } from '.';
import { createdAt, updatedAt } from './utils';

export const sessions = pgTable('sessions', {
	id: varchar('id').primaryKey(),
	expiresAt: bigint('expiresAt', { mode: 'number' }).notNull(),
	userId: varchar('userId')
		.references(() => users.id)
		.notNull(),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

export const sessionRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export type Session = typeof sessions.$inferSelect;
