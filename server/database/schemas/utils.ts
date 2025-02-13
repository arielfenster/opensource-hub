import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const id = varchar('id').primaryKey().default(nanoid());

export const createdAt = timestamp('createdAt', { withTimezone: true }).notNull().defaultNow();
export const updatedAt = timestamp('updatedAt', { withTimezone: true })
	.notNull()
	.$onUpdateFn(() => new Date());
