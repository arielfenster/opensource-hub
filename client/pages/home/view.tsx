import type { ProjectDetails } from '$/shared/types/projects';
import { CallToActionSection } from './sections/call-to-action';
import { FeaturesSection } from './sections/features';
import { HeroSection } from './sections/hero';
import { RecentProjectsSection } from './sections/recent-projects';

type HomeViewProps = {
	recentProjects: ProjectDetails[];
};

export function HomeView({ recentProjects }: HomeViewProps) {
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
