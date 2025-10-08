import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import type { ProjectDetails } from '$/shared/types/projects';
import { nanoid } from 'nanoid';
import { projectsDataAccessor } from './projects.data-accessor';
import type { FindProjectParams, FindProjectUniqueIdentifier } from './types';

type FindProjectReturnValue = NonNullable<
	Awaited<ReturnType<typeof projectsDataAccessor.findProjectByUniqueIdentifier>>
>;

class ProjectsService {
	async getProjects({ limit, skip }: PaginationInput) {
		const projects = await projectsDataAccessor.findProjects(limit, skip);

		return projects.flatMap(this.processProject);
	}

	async findProject(params: FindProjectParams) {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return null;
		}

		const searchKey = keys[0] as FindProjectUniqueIdentifier;
		const project = await projectsDataAccessor.findProjectByUniqueIdentifier(
			searchKey,
			params[searchKey] as string,
		);

		return project ? this.processProject(project) : null;
	}

	generateProjectSlug(name: string) {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `${slug}-${nanoid(10)}`;
	}

	private processProject(project: FindProjectReturnValue): ProjectDetails {
		return {
			...project,
			technologies: project.technologies.map((tech) => tech.technology),
		};
	}
}

export const projectsService = new ProjectsService();
