import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import { projectsDataAccessor } from './projects.data-accessor';

class ProjectsService {
	async getProjects({ limit, skip }: PaginationInput) {
		return projectsDataAccessor.findProjects(limit, skip);
	}
}

export const projectsService = new ProjectsService();
