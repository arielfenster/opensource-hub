import type { Database } from '$/server/database/db';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core';

export type Transaction = PgTransaction<
	PgQueryResultHKT,
	typeof import('$/server/database/schemas/index'),
	ExtractTablesWithRelations<typeof import('$/server/database/schemas/index')>
>;

export class DataAccessor {
	protected db: Database | Transaction;

	constructor(db: Database | Transaction) {
		this.db = db;
	}
}
