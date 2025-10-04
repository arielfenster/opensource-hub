import { ProjectDetailsPage } from '$/client/pages/project-details';
import { ProjectsPage } from '$/client/pages/projects';
import { projectsService } from '$/server/modules/projects/projects.service';
import { PREFETCHED_PROJECT_DETAILS_QUERY_KEY } from '$/shared/constants';
import type { Context } from 'hono';
import { renderServerPageWithUser } from './render';

export async function renderProjectsPage(c: Context) {
	const html = await renderServerPageWithUser(c, <ProjectsPage />, {
		page: 'projects',
		title: 'Projects',
	});

	return c.html(html);
}

export async function renderProjectDetailsPage(c: Context) {
	const slug = c.req.param('slug');
	if (!slug) {
		return c.html('Project not found', 404);
	}

	const project = await projectsService.findProject({ slug });
	if (!project) {
		return c.html('Project not found', 404);
	}

	const html = await renderServerPageWithUser(c, <ProjectDetailsPage />, {
		page: 'project-details',
		title: project.name,
		prefetchedState: [
			{
				key: PREFETCHED_PROJECT_DETAILS_QUERY_KEY,
				data: project,
			},
		],
	});

	return c.html(html);
}
