import { index, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from './utils';
import { relations } from 'drizzle-orm';
import { socialLinks, usersToProjects } from '.';
import { userRoleValues } from '$/shared/types/users';

export const userRoleEnum = pgEnum('userRoleEnum', userRoleValues);

export const users = pgTable(
	'users',
	{
		id: id,
		firstName: varchar('firstName').notNull(),
		lastName: varchar('lastName').notNull(),
		email: varchar('email').notNull().unique(),
		password: varchar('password').notNull(),
		bio: varchar('bio'),
		imageUrl: varchar('imageUrl'),
		googleId: varchar('googleId'),
		githubId: varchar('githubId'),
		gitlabId: varchar('gitlabId'),
		role: userRoleEnum('role').notNull().default('User'),
		createdAt: createdAt,
		updatedAt: updatedAt,
	},
	(table) => [index('email_index').on(table.email)],
);

export const userRelations = relations(users, ({ many }) => ({
	socialLinks: many(socialLinks),
	projects: many(usersToProjects),
}));
