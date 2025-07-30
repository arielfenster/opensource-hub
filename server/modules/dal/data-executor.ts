import { db } from '$/server/database/db';
import type { Transaction } from './data-accessor';
import { dataAccessorsRegistry, type DataAccessors } from './registry';

function createScopedDataAccessors(tx: Transaction) {
	const accessors = {} as any;

	for (const [key, AccessorClass] of Object.entries(dataAccessorsRegistry)) {
		accessors[key] = new AccessorClass(tx);
	}
	return accessors as DataAccessors;
}

export async function executeDataOperation(work: (da: DataAccessors) => Promise<any>) {
	return db.transaction(async (tx) => {
		const scopedAccessors = createScopedDataAccessors(tx);
		return work(scopedAccessors);
	});
}
