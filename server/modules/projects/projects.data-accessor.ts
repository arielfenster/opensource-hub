import { db } from '$/server/database/db';
import { projects, type Project } from '$/server/database/schemas';
import { DataAccessor } from '../dal/data-accessor';
import type { FindProjectUniqueIdentifier } from './types';

type CreateProjectPayload = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

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
		return this.db.query.projects
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

	async insertProject(data: CreateProjectPayload) {
		const [project] = await this.db.insert(projects).values(data).returning().execute();
		return project;
	}
}

export const projectsDataAccessor = new ProjectsDataAccessor(db);
