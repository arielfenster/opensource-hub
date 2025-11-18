import { db } from '$/server/database/db';
import { projectsToTechnologies } from '$/server/database/schemas';
import type { TechnologyData } from '$/shared/types/technologies';
import { DataAccessor } from '../dal/data-accessor';

export class TechnologiesDataAccessor extends DataAccessor {
	async findAllTechnologies(): Promise<TechnologyData[]> {
		return this.db.query.technologies.findMany({
			with: {
				group: true,
			},
		});
	}

	async linkTechnologiesToProject(projectId: string, technologyIds: string[]) {
		const links = technologyIds.map((technologyId) => ({
			projectId,
			technologyId,
		}));

		await this.db.insert(projectsToTechnologies).values(links).returning().execute();
	}
}

export const technologiesDataAccessor = new TechnologiesDataAccessor(db);
