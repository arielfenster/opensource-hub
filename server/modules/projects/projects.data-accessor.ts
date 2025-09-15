import { db } from '$/server/database/db';
import { DataAccessor } from '../dal/data-accessor';

export class ProjectsDataAccessor extends DataAccessor {
	async findProjects(limit: number, skip: number) {
		return this.db.query.projects.findMany({
			limit: limit,
			offset: skip,
			with: {
				technologies: {
					with: {
						technology: true,
					},
				},
			},
		});
	}
}

export const projectsDataAccessor = new ProjectsDataAccessor(db);
