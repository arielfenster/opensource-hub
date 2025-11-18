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

type DataOperation<T = any> = (dataAccessors: DataAccessors) => Promise<T>;

export async function executeDataOperation<T>(operation: DataOperation<T>) {
	return db.transaction(async (tx) => {
		try {
			const scopedAccessors = createScopedDataAccessors(tx);
			return operation(scopedAccessors);
		} catch (error) {
			console.error('Data operation failed:', error);
			tx.rollback();
			throw error;
		}
	});
}
