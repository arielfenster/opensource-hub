import { db } from '$/server/database/db';
import { DataAccessor } from '../dal/data-accessor';

export class TechnologiesDataAccessor extends DataAccessor {
	async findAllTechnologies() {
		return db.query.technologyGroups.findMany({ with: { technologies: true } });
	}
}

export const technologiesDataAccessor = new TechnologiesDataAccessor(db);
