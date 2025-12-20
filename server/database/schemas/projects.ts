import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { projectLinks, users } from '.';
import { projectsToTechnologies } from './projects-to-technologies';
import { usersToProjects } from './users-to-projects';
import { createdAt, id, updatedAt } from './utils';
import { projectStatusValues, projectTeamPositionValues } from '$/shared/types/projects';

export const projectStatusEnum = pgEnum('projectStatusEnum', projectStatusValues);
export const teamPositionEnum = pgEnum('teamPositionEnum', projectTeamPositionValues);

export const projects = pgTable('projects', {
	id: id,
	name: varchar('name').notNull().unique(),
	slug: varchar('slug').notNull().unique(),
	shortDescription: varchar('shortDescription').notNull(),
	longDescription: varchar('longDescription').notNull(),
	status: projectStatusEnum('status').notNull().default('Created'),
	keyFeatures: varchar('keyFeatures')
		.array()
		.notNull()
		.default(sql`ARRAY[]::varchar[]`),
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
	links: one(projectLinks),
	technologies: many(projectsToTechnologies),
}));
