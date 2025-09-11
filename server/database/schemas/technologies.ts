import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { id } from './utils';

export const technologyGroups = pgTable('technologyGroups', {
	id: id,
	name: varchar('name').notNull().unique(),
});

export type TechnologyGroup = typeof technologyGroups.$inferSelect;

export const technologyGroupRelations = relations(technologyGroups, ({ many }) => ({
	technologies: many(technologies),
}));

export const technologies = pgTable('technologies', {
	id: id,
	name: varchar('name').notNull(),
	groupId: varchar('groupId')
		.notNull()
		.references(() => technologyGroups.id),
});

export type Technology = typeof technologies.$inferSelect;

export const technologyRelations = relations(technologies, ({ one }) => ({
	group: one(technologyGroups, {
		fields: [technologies.groupId],
		references: [technologyGroups.id],
	}),
}));
