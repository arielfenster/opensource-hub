import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import { nanoid } from 'nanoid';
import { projectsDataAccessor } from './projects.data-accessor';
import type { FindProjectParams, FindProjectUniqueIdentifier } from './types';

class ProjectsService {
	async getProjects({ limit, skip }: PaginationInput) {
		const projects = await projectsDataAccessor.findProjects(limit, skip);

		return projects.flatMap((project) => {
			return {
				...project,
				technologies: project.technologies.map((tech) => tech.technology),
			};
		});
	}

	async findProject(params: FindProjectParams) {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return null;
		}

		const searchKey = keys[0] as FindProjectUniqueIdentifier;
		return projectsDataAccessor.findProjectByUniqueIdentifier(searchKey, params[searchKey] as string);
	}

	generateProjectSlug(name: string) {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `${slug}-${nanoid(10)}`;
	}

}

export const projectsService = new ProjectsService();
