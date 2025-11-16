import type { PaginationInput } from '$/shared/schemas/common/pagination.schema';
import type { Context } from 'hono';
import { projectsService } from './projects.service';
import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { sessionService } from '../session/session.service';
import { FindProjectsDTO } from './dto/find-projects.dto';

type ListProjectsContext = Context<{}, any, { out: { query: PaginationInput } }>;

type CreateProjectContext = Context<{}, any, { out: { json: CreateProjectInput } }>;

class ProjectsHandler {
	async listProjects(c: ListProjectsContext) {
		const filters = c.req.valid('query');

		const findProjectsDto = FindProjectsDTO.create(filters);

		return projectsService.getProjects(findProjectsDto);
	}

	async createProject(c: CreateProjectContext) {
		const input = c.req.valid('json');
		const ownerId = (await sessionService.getCurrentUserId(c))!;

		return projectsService.createProject(input, ownerId);
	}
}

export const projectsHandler = new ProjectsHandler();
