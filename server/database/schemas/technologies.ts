import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { id } from './utils';
import { projectsToTechnologies } from '.';
import { technologyGroupNameValues } from '$/shared/types/technologies';

export const technologyGroupNameEnum = pgEnum('technologyGroupNameEnum', technologyGroupNameValues);

export const technologyGroups = pgTable('technologyGroups', {
	id: id,
	name: technologyGroupNameEnum('name').notNull().unique(),
});

export const technologyGroupRelations = relations(technologyGroups, ({ many }) => ({
	technologies: many(technologies),
}));

export const technologies = pgTable(
	'technologies',
	{
		id: id,
		name: varchar('name').notNull(),
		groupId: varchar('groupId')
			.notNull()
			.references(() => technologyGroups.id),
	},
	(table) => ({
		uniqueNamePerGroup: uniqueIndex('unique_name_per_group').on(table.name, table.groupId),
	}),
);

export const technologyRelations = relations(technologies, ({ one, many }) => ({
	group: one(technologyGroups, {
		fields: [technologies.groupId],
		references: [technologyGroups.id],
	}),
	projects: many(projectsToTechnologies),
}));
