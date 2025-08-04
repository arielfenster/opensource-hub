import { ProjectsPage } from '$/client/pages/projects';
import type { Context } from 'hono';
import { renderServerPageWithUser } from './render';

export async function renderProjectsPage(c: Context) {
	const html = await renderServerPageWithUser(c, <ProjectsPage />, {
		page: 'projects',
		title: 'Projects',
	});

	return c.html(html);
}
