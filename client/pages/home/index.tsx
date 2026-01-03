import { PREFETCHED_RECENT_PROJECTS_KEY } from '$/shared/constants';
import type { ProjectDetails } from '$/shared/types/projects';
import { useQueryClient } from '@tanstack/react-query';
import { HomeView } from './view';

export function HomePage() {
	const recentProjects = useQueryClient().getQueryData<ProjectDetails[]>(
		PREFETCHED_RECENT_PROJECTS_KEY,
	)!;

	return <HomeView recentProjects={recentProjects} />;
}
