import { db } from '$/server/database/db';
import type { TechnologyData } from '$/shared/types/technologies';
import { DataAccessor } from '../dal/data-accessor';

export class TechnologiesDataAccessor extends DataAccessor {
	async findAllTechnologies(): Promise<TechnologyData[]> {
		return db.query.technologies.findMany({
			with: {
				group: true,
			},
		});
	}
}

export const technologiesDataAccessor = new TechnologiesDataAccessor(db);
