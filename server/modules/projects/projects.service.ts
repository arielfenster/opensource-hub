import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import { nanoid } from 'nanoid';
import { projectsDataAccessor } from './projects.data-accessor';

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

	generateProjectSlug(name: string) {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `${slug}-${nanoid(10)}`;
	}
}

export const projectsService = new ProjectsService();
