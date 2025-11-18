import { HomePage } from '$/client/pages/home';
import { projectsService } from '$/server/modules/projects/projects.service';
import { PREFETCHED_RECENT_PROJECTS_KEY } from '$/shared/constants';
import { type Context } from 'hono';
import { renderServerPage } from './render';
import { FindProjectsDTO } from '$/server/modules/projects/dto/find-projects.dto';

export async function renderHomePage(c: Context) {
	const findProjectsDto = FindProjectsDTO.create(
		{ limit: 4, skip: 0 },
		{
			orderBy: {
				createdAt: {
					direction: 'desc',
				},
			},
		},
	);
	const recentProjects = await projectsService.getProjects(findProjectsDto);

	const html = await renderServerPage(c, <HomePage />, {
		page: 'home',
		title: 'Home',
		prefetchedState: [
			{
				key: PREFETCHED_RECENT_PROJECTS_KEY,
				data: recentProjects,
			},
		],
	});

	return c.html(html);
}
