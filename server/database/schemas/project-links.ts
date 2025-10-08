import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { projects } from './projects';
import { id, createdAt, updatedAt } from './utils';

export const sourceControlTypeEnum = pgEnum('sourceControlTypeEnum', ['Github', 'Gitlab']);
export const chatTypeEnum = pgEnum('chatTypeEnum', ['Slack', 'Discord']);
export const projectManagementTypeEnum = pgEnum('projectManagementTypeEnum', ['Jira', 'Trello']);

export const projectLinks = pgTable('projectLinks', {
	id: id,
	projectLink: varchar('projectLink'),
	sourceControlType: sourceControlTypeEnum('sourceControlType'),
	sourceControlLink: varchar('sourceControlLink'),
	chatType: chatTypeEnum('chatType'),
	chatLink: varchar('chatLink'),
	projectManagementType: projectManagementTypeEnum('projectManagementType'),
	projectManagementLink: varchar('projectManagementLink'),
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
