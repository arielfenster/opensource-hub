import { loggedInMiddleware } from '$/server/modules/auth/logged-in.middleware';
import { projectsHandler } from '$/server/modules/projects/projects.handler';
import { paginationSchema } from '$/shared/schemas/common/pagination.schema';
import { createProjectSchema } from '$/shared/schemas/project/create-project.schema';
import { superjsonStringify } from '$/shared/superjson';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';

export const projectsRouter = new Hono()
	.get('/', vValidator('query', paginationSchema), async (c) => {
		try {
			const projects = await projectsHandler.listProjects(c);
			return c.newResponse(superjsonStringify(projects));
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw error;
		}
	})
	.post('/create', loggedInMiddleware, vValidator('json', createProjectSchema), async (c) => {
		try {
			const project = await projectsHandler.createProject(c);
			return c.redirect(`/projects/${project.slug}`);
		} catch (error) {
			console.error('Error creating project:', error);
			return c.newResponse((error as Error).message, { status: 500 });
		}
	});
