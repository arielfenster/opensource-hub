import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { users, type Technology } from '.';
import { createdAt, id, updatedAt } from './utils';
import { projectLinks } from './project-links';
import { usersToProjects } from './users-to-projects';
import { projectsToTechnologies } from './projects-to-technologies';

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
	technologies: many(projectsToTechnologies),
}));

export type Project = typeof projects.$inferSelect;
export type ProjectStatus = Project['status'];
export type ProjectTeamPosition = Project['teamPositions'][number];
export type ProjectWithTechnologies = Project & {
	technologies: Technology[];
};
