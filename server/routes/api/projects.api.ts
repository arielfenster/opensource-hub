import { superjsonResponse } from '$/server/lib/superjson';
import { projectsHandler } from '$/server/modules/projects/projects.handler';
import { paginationSchema } from '$/shared/schemas/common/pagination.schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const projectsRouter = new Hono().get(
	'/',
	zValidator('query', paginationSchema),
	async (c) => {
		try {
			const projects = await projectsHandler.listProjects(c);
			return superjsonResponse(c, projects);
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw error;
		}
	},
);
