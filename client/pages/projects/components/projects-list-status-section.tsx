import { Spinner } from '$/client/components/ui/spinner';
import type { RefObject } from 'react';

type ProjectsListStatusSectionProps = {
	observationTargetRef: RefObject<HTMLDivElement | null>;
	isFetchingNextPage: boolean;
	isFetching: boolean;
	hasNextPage: boolean;
};

export function ProjectsListStatusSection({
	observationTargetRef,
	isFetching,
	isFetchingNextPage,
	hasNextPage,
}: ProjectsListStatusSectionProps) {
	return (
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
	);
}
