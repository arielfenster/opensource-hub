import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { projects, technologies } from '.';
import { createdAt, updatedAt } from './utils';
import { relations } from 'drizzle-orm';

export const projectsToTechnologies = pgTable(
	'projectsToTechnologies',
	{
		projectId: varchar('projectId')
			.notNull()
			.references(() => projects.id),
		technologyId: varchar('technologyId')
			.notNull()
			.references(() => technologies.id),
		createdAt: createdAt,
		updatedAt: updatedAt,
	},
	(table) => [uniqueIndex('project_id_technology_id').on(table.projectId, table.technologyId)],
);

export const projectsToTechnologiesRelations = relations(projectsToTechnologies, ({ one }) => ({
	project: one(projects, {
		fields: [projectsToTechnologies.projectId],
		references: [projects.id],
	}),
	technology: one(technologies, {
		fields: [projectsToTechnologies.technologyId],
		references: [technologies.id],
	}),
}));
