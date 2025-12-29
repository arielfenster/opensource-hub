import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from './utils';
import { technologyGroupNameEnum, technologyGroups, users } from '.';

export const technologyRequestEnum = pgEnum('technologyRequestEnum', [
	'pending',
	'approved',
	'rejected',
]);

export const technologyRequests = pgTable('technologyRequests', {
	id: id,
	name: varchar('name').notNull(),
	group: technologyGroupNameEnum('group')
		.references(() => technologyGroups.name)
		.notNull(),
	// comment: varchar('comment'),
	requestedBy: varchar('requestedBy')
		.references(() => users.email)
		.notNull(),
	status: technologyRequestEnum('status').notNull().default('pending'),
	createdAt: createdAt,
	updatedAt: updatedAt,
});
