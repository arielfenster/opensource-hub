import { PREFETCHED_PROJECT_DETAILS_QUERY_KEY } from '$/shared/constants';
import { type ProjectDetails } from '$/shared/types/projects';
import { useQueryClient } from '@tanstack/react-query';
import { ProjectDetailsView } from './view';

export function ProjectDetailsPage() {
	const project = useQueryClient().getQueryData<ProjectDetails>(
		PREFETCHED_PROJECT_DETAILS_QUERY_KEY,
	)!;

	return <ProjectDetailsView project={project} />;
}
