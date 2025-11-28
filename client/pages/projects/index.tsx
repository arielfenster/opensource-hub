import { Spinner } from '$/client/components/ui/spinner';
import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import { useEffect, useRef } from 'react';
import { ResultsSection } from './components/results-section';
import { SearchSection } from './components/search-section';
import { getFilteredProjects } from './service';
import { useTeamPositionsStore } from './team-positions.store';

// maybe bring back container components?

/**
 * search projects:
tech stack
position
keywords? Tags/keywords (beyond tech stack — e.g., "AI", "social impact", "climate").
Category/domain (web, mobile, ML, DevOps, education, games, etc.).
Last update

post-MVP: Recommendations ("similar to projects you viewed" or "based on your skills").
 */
export function ProjectsPage() {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useProjects({
		limit: 9,
	});
	const observationTargetRef = useRef<HTMLDivElement | null>(null);

	const { selectedTechnologies } = useTechnologiesStore();
	const { selectedPositions } = useTeamPositionsStore();

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

	const filteredProjects = getFilteredProjects(
		data.pages.flat(),
		selectedTechnologies,
		selectedPositions,
	);

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<div className='flex flex-col gap-12'>
				<SearchSection />
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
