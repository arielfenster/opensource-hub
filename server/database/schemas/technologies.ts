import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { id } from './utils';

export const technologyGroupNameEnum = pgEnum('technologyGroupNameEnum', [
	'languages',
	'frameworks',
	'databases',
	'infra',
	'services',
	'developerTools',
	'clouds',
]);

export const technologyGroups = pgTable('technologyGroups', {
	id: id,
	name: technologyGroupNameEnum('name').notNull().unique(),
});

export type TechnologyGroup = typeof technologyGroups.$inferSelect;

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

export type Technology = typeof technologies.$inferSelect;

export const technologyRelations = relations(technologies, ({ one }) => ({
	group: one(technologyGroups, {
		fields: [technologies.groupId],
		references: [technologyGroups.id],
	}),
}));
