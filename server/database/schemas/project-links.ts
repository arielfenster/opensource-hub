import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { projects } from './projects';
import { id, createdAt, updatedAt } from './utils';

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
