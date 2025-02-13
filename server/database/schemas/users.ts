import { index, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from './utils';
import { relations } from 'drizzle-orm';
import { socialLinks, usersToProjects } from '.';

export const userRoleEnum = pgEnum('userRoleEnum', ['User', 'Admin']);

export const users = pgTable(
	'users',
	{
		id: id,
		firstName: varchar('firstName').notNull(),
		lastName: varchar('lastName').notNull(),
		email: varchar('email').notNull().unique(),
		password: varchar('password'),
		bio: varchar('bio'),
		imageUrl: varchar('imageUrl'),
		role: userRoleEnum('role').notNull().default('User'),
		createdAt: createdAt,
		updatedAt: updatedAt,
	},
	(t) => [index('email_index').on(t.email)],
);

export const userRelations = relations(users, ({ many }) => ({
	socialLinks: many(socialLinks),
	projects: many(usersToProjects),
}));

export type User = typeof users.$inferSelect;
export type UserRole = User['role'];
