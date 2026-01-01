import { PREFETCHED_RECENT_PROJECTS_KEY } from '$/shared/constants';
import { useQueryClient } from '@tanstack/react-query';
import type { ProjectDetails } from '$/shared/types/projects';
import { CallToActionSection } from './sections/call-to-action';
import { FeaturesSection } from './sections/features';
import { HeroSection } from './sections/hero';
import { RecentProjectsSection } from './sections/recent-projects';

export function HomePage() {
	const recentProjects = useQueryClient().getQueryData<ProjectDetails[]>(
		PREFETCHED_RECENT_PROJECTS_KEY,
	)!;

	return (
		<>
			<HeroSection />
			<div className='mt-16 flex flex-col space-y-16'>
				<FeaturesSection />
				<RecentProjectsSection recentProjects={recentProjects} />
				<CallToActionSection />
			</div>
		</>
	);
}
