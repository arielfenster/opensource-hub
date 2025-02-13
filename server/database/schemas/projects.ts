import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { users } from '.';
import { createdAt, id, updatedAt } from './utils';

export const sourceControlTypeEnum = pgEnum('sourceControlTypeEnum', ['Github', 'Gitlab']);
export const chatTypeEnum = pgEnum('chatTypeEnum', ['Slack', 'Discord']);
export const projectManagementTypeEnum = pgEnum('projectManagementTypeEnum', ['Jira', 'Trello']);

export const projectLinks = pgTable('projectLinks', {
	id: id,
	sourceControlType: sourceControlTypeEnum('sourceControlType').notNull(),
	sourceControlLink: varchar('sourceControlLink').notNull(),
	chatType: chatTypeEnum('chatType').notNull(),
	chatLink: varchar('chatLink').notNull(),
	projectManagementType: projectManagementTypeEnum('projectManagementType').notNull(),
	projectManagementLink: varchar('projectManagementLink').notNull(),
	projectId: varchar('projectId')
		.notNull()
		.references(() => projects.id),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

export const projectLinksRelations = relations(projectLinks, ({ one }) => ({
	project: one(projects, {
		fields: [projectLinks.projectId],
		references: [projects.id],
	}),
}));

export type ProjectLinks = typeof projectLinks.$inferSelect;

export const projectStatusEnum = pgEnum('projectStatusEnum', [
	'Created',
	'In Progress',
	'Finished',
	'Aborted',
]);
export const teamPositionEnum = pgEnum('teamPositionEnum', [
	'Backend',
	'Frontend',
	'Fullstack',
	'Devops',
	'QA',
	'Product Manager',
	'UI Developer',
	'UX Developer',
]);

export const projects = pgTable('projects', {
	id: id,
	name: varchar('name').notNull().unique(),
	shortDescription: varchar('shortDescription').notNull(),
	longDescription: varchar('longDescription').notNull(),
	tags: varchar('tags')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	status: projectStatusEnum('status').notNull().default('Created'),
	teamPositions: teamPositionEnum('teamPositions')
		.array()
		.notNull()
		.default(sql`ARRAY[]::"teamPositionEnum"[]`),
	ownerId: varchar('ownerId')
		.notNull()
		.references(() => users.id),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

export const projectRelations = relations(projects, ({ one, many }) => ({
	owner: one(users, {
		fields: [projects.ownerId],
		references: [users.id],
	}),
	members: many(usersToProjects),
	links: many(projectLinks),
}));

export type Project = typeof projects.$inferSelect;
export type ProjectStatus = Project['status'];
export type ProjectTeamPosition = Project['teamPositions'][number];

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
	(t) => [uniqueIndex('user_id_project_id').on(t.userId, t.projectId)],
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
