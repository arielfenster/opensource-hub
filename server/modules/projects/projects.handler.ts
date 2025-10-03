import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import type { Context } from 'hono';
import { projectsService } from './projects.service';

type ListProjectsContext = Context<{}, any, { out: { query: PaginationInput } }>;

class ProjectsHandler {
	async listProjects(c: ListProjectsContext) {
		const filters = c.req.valid('query');

		return projectsService.getProjects(filters);
	}
}

export const projectsHandler = new ProjectsHandler();
