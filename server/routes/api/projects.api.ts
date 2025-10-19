import { projectsHandler } from '$/server/modules/projects/projects.handler';
import { paginationSchema } from '$/shared/schemas/common/pagination.schema';
import { createProjectSchema } from '$/shared/schemas/project/create-project.schema';
import { superjsonStringify } from '$/shared/superjson';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const projectsRouter = new Hono()
	.get('/', zValidator('query', paginationSchema), async (c) => {
		try {
			const projects = await projectsHandler.listProjects(c);
			return c.newResponse(superjsonStringify(projects));
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw error;
		}
	})
	.post('/create', zValidator('json', createProjectSchema), async (c) => {
		try {
			const project = await projectsHandler.createProject(c);
			return c.redirect(`/projects/${project.slug}`);
		} catch (error) {
			console.error('Error creating project:', error);
			throw error;
		}
	});
