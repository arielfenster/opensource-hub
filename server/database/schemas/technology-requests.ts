import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from './utils';
import { technologyGroups, users } from '.';
import { technologyRequestStatusValues } from '$/shared/types/technology-requests';
import { relations } from 'drizzle-orm';

export const technologyRequestEnum = pgEnum('technologyRequestEnum', technologyRequestStatusValues);

export const technologyRequests = pgTable('technologyRequests', {
	id: id,
	name: varchar('name').notNull(),
	groupId: varchar('groupId')
		.notNull()
		.references(() => technologyGroups.id),
	requestedBy: varchar('requestedBy')
		.references(() => users.email)
		.notNull(),
	status: technologyRequestEnum('status').notNull().default('pending'),
	createdAt: createdAt,
	updatedAt: updatedAt,
});

export const technologyRequestRelations = relations(technologyRequests, ({ one }) => ({
	group: one(technologyGroups, {
		fields: [technologyRequests.groupId],
		references: [technologyGroups.id],
	}),
}));
