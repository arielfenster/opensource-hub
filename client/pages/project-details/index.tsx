import { PREFETCHED_PROJECT_DETAILS_QUERY_KEY } from '$/shared/constants';
import { type ProjectDetails } from '$/shared/types/projects';
import { useQueryClient } from '@tanstack/react-query';
import { AboutThisProjectCard } from './components/about-this-project-card';
import { KeyFeaturesCard } from './components/key-features-card';
import { LookingForPositionsCard } from './components/looking-for-positions-card';
import { ProjectLinksCard } from './components/project-links-card';
import { ProjectReviewCard } from './components/project-review-card';
import { RecentActivityCard } from './components/recent-activity-card';

export function ProjectDetailsPage() {
	const project = useQueryClient().getQueryData<ProjectDetails>(
		PREFETCHED_PROJECT_DETAILS_QUERY_KEY,
	)!;

	return (
		<div className='py-8'>
			<h3 className='text-royal-blue text-lg font-medium'>Project details</h3>
			<div className='grid grid-cols-[2fr_1fr] gap-8'>
				<div className='flex flex-col gap-8'>
					<ProjectReviewCard project={project} />
					<KeyFeaturesCard project={project} />
					<RecentActivityCard />
					<AboutThisProjectCard project={project} />
				</div>
				<div className='flex flex-col gap-8'>
					<ProjectLinksCard links={project.links} />
					<LookingForPositionsCard project={project} />
				</div>
			</div>
		</div>
	);
}
