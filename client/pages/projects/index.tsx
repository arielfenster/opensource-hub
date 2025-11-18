import { Spinner } from '$/client/components/ui/spinner';
import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import type { ProjectTeamPosition } from '$/shared/types/projects';
import { useEffect, useRef, useState } from 'react';
import { ResultsSection } from './components/results-section';
import { SearchSection } from './components/search-section';
import { getFilteredProjects, type SearchFilter } from './service';

// maybe bring back container components?
export function ProjectsPage() {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useProjects({
		limit: 9,
	});
	const observationTargetRef = useRef<HTMLDivElement | null>(null);

	const { selectedTechnologies } = useTechnologiesStore();
	const [selectedPositions, setSelectedPositions] = useState<ProjectTeamPosition[]>([]);

	useEffect(() => {
		if (observationTargetRef.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					if (entry.isIntersecting) {
						if (hasNextPage && !isFetchingNextPage) {
							fetchNextPage({ cancelRefetch: false });
						}
					}
				},
				{
					root: null,
					rootMargin: '0px',
					threshold: 1.0,
				},
			);

			observer.observe(observationTargetRef.current);
		}
	}, [observationTargetRef.current]);

	function handleApplyFilter(filter: SearchFilter) {
		// TODO: there's no need to check the type of the filter since the technologies
		// are handled separately in the store. try to refactor/simplify this
		// maybe use a context for the page that holds the positions?
		// maybe create a separate store for the positions?

		if (filter.type === 'position') {
			const isPositionAlreadySelected = selectedPositions.some(
				(position) => position === filter.value,
			);
			if (isPositionAlreadySelected) {
				setSelectedPositions((prev) =>
					prev.filter((position) => position !== filter.value),
				);
			} else {
				setSelectedPositions((prev) => [...prev, filter.value]);
			}
		}
	}

	const filteredProjects = getFilteredProjects(
		data.pages.flat(),
		selectedTechnologies,
		selectedPositions,
	);

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<div className='flex flex-col gap-12'>
				<SearchSection onFilter={handleApplyFilter} />
				<ResultsSection projects={filteredProjects} />
				<div className='self-center' ref={observationTargetRef}>
					{isFetchingNextPage || isFetching ? (
						<div className='flex flex-col items-center gap-2'>
							Loading projects...
							<Spinner />
						</div>
					) : !hasNextPage ? (
						'No more projects to load'
					) : null}
				</div>
			</div>
		</div>
	);
}
