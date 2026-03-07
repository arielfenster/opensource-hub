import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { getFilteredProjects } from './service';
import { useTeamPositionsStore } from './team-positions.store';
import { ProjectsView } from './view';

export function ProjectsPage() {
	// TODO: keep only this hook call here and move the rest of the stuff to ProjectsContainer?
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

	// TODO: rename the props to:
	/**
	 * projects={filteredProjects}
	 * isLoading={isFetchingNextPage || isFetching}
	 * hasMore={hasNextPage}
	 * loadMoreTargetRef={observationTargetRef} not sure about this one
	 */
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
