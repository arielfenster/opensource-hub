import { projectsHandler } from '$/server/modules/projects/projects.handler';
import { paginationSchema } from '$/shared/schemas/common/pagination.schema';
import { superjsonStringify } from '$/shared/superjson';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const projectsRouter = new Hono().get(
	'/',
	zValidator('query', paginationSchema),
	async (c) => {
		try {
			const projects = await projectsHandler.listProjects(c);
			return c.newResponse(superjsonStringify(projects));
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw error;
		}
	},
);
