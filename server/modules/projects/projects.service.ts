import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
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
}

export const projectsService = new ProjectsService();
