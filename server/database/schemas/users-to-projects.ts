import { relations } from 'drizzle-orm';
import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { projects, users } from '.';
import { createdAt, updatedAt } from './utils';

export const usersToProjects = pgTable(
	'usersToProjects',
	{
		userId: varchar('userId')
			.notNull()
			.references(() => users.id),
		projectId: varchar('projectId')
			.notNull()
			.references(() => projects.id),
		createdAt: createdAt,
		updatedAt: updatedAt,
	},
	(table) => [uniqueIndex('user_id_project_id').on(table.userId, table.projectId)],
);

export const usersToProjectsRelations = relations(usersToProjects, ({ one }) => ({
	member: one(users, {
		fields: [usersToProjects.userId],
		references: [users.id],
	}),
	project: one(projects, {
		fields: [usersToProjects.projectId],
		references: [projects.id],
	}),
}));
