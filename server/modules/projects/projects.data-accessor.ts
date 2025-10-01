import { db } from '$/server/database/db';
import { DataAccessor } from '../dal/data-accessor';

export class ProjectsDataAccessor extends DataAccessor {
	async findProjects(limit: number, skip: number) {
		return this.db.query.projects.findMany({
			limit: limit,
			offset: skip,
			with: {
				links: true,
				technologies: {
					with: {
						technology: {
							with: {
								group: true,
							},
						},
					},
				},
			},
		});
	}
}

export const projectsDataAccessor = new ProjectsDataAccessor(db);
