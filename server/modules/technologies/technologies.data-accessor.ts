import { db } from '$/server/database/db';

export class TechnologiesDataAccessor {
	async findAllTechnologies() {
		return db.query.technologyGroups.findMany({ with: { technologies: true } });
	}
}

export const technologiesDataAccessor = new TechnologiesDataAccessor();
