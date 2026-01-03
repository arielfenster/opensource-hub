import type { ProjectDetails } from '$/shared/types/projects';
import type { RefObject } from 'react';
import { ProjectsListStatusSection } from './components/projects-list-status-section';
import { ResultsSection } from './components/results-section';
import { SearchSection } from './components/search-section';

type ProjectsViewProps = {
	filteredProjects: ProjectDetails[];
	observationTargetRef: RefObject<HTMLDivElement | null>;
	isFetchingNextPage: boolean;
	isFetching: boolean;
	hasNextPage: boolean;
};

export function ProjectsView({
	filteredProjects,
	observationTargetRef,
	isFetchingNextPage,
	isFetching,
	hasNextPage,
}: ProjectsViewProps) {
	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='page_title'>Discover Projects</h1>
			<div className='flex flex-col gap-12'>
				<SearchSection />
				<ResultsSection projects={filteredProjects} />
				<ProjectsListStatusSection
					observationTargetRef={observationTargetRef}
					isFetchingNextPage={isFetchingNextPage}
					isFetching={isFetching}
					hasNextPage={hasNextPage}
				/>
			</div>
		</div>
	);
}
