import { db } from '$/server/database/db';
import { DataAccessor } from '../dal/data-accessor';
import type { FindProjectUniqueIdentifier } from './types';

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

	async findProjectByUniqueIdentifier(key: FindProjectUniqueIdentifier, value: string) {
		return db.query.projects
			.findFirst({
				where: (fields, { eq }) => eq(fields[key], value),
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
			})
			.execute();
	}
}

export const projectsDataAccessor = new ProjectsDataAccessor(db);
