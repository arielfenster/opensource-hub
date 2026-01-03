import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { getFilteredProjects } from './service';
import { useTeamPositionsStore } from './team-positions.store';
import { ProjectsView } from './view';

export function ProjectsPage() {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useProjects({
		limit: 9,
	});

	const { selectedTechnologies } = useTechnologiesStore();
	const { selectedPositions } = useTeamPositionsStore();

	const observationTargetRef = useInfiniteScroll({
		shouldHandleIntersection: hasNextPage && !isFetchingNextPage,
		onIntersection: () => {
			fetchNextPage({ cancelRefetch: false });
		},
	});

	const filteredProjects = getFilteredProjects(
		data.pages.flat(),
		selectedTechnologies,
		selectedPositions,
	);

	return (
		<ProjectsView
			filteredProjects={filteredProjects}
			observationTargetRef={observationTargetRef}
			isFetchingNextPage={isFetchingNextPage}
			isFetching={isFetching}
			hasNextPage={hasNextPage}
		/>
	);
}
