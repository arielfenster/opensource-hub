import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { projects } from './projects';
import { id, createdAt, updatedAt } from './utils';
import {
	chatTypeValues,
	projectManagementTypeValues,
	sourceControlTypeValues,
} from '$/shared/types/project-links';

export const sourceControlTypeEnum = pgEnum('sourceControlTypeEnum', sourceControlTypeValues);
export const chatTypeEnum = pgEnum('chatTypeEnum', chatTypeValues);
export const projectManagementTypeEnum = pgEnum(
	'projectManagementTypeEnum',
	projectManagementTypeValues,
);

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
