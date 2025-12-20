import { Button } from '$/client/components/ui/button';
import { getImagePath } from '$/client/lib/images';
import { PREFETCHED_RECENT_PROJECTS_KEY } from '$/shared/constants';
import { useQueryClient } from '@tanstack/react-query';
import { PageSection } from './page-section';
import { SummaryProjectCard, type RecentProject } from './summary-project-card';

export function HomePage() {
	const recentProjects = useQueryClient().getQueryData<RecentProject[]>(
		PREFETCHED_RECENT_PROJECTS_KEY,
	)!;

	return (
		<>
			<div className='py-12'>
				<h1 className='text-royal-blue mx-auto w-2/3 text-center text-5xl font-bold'>
					{'Your one-stop shop for sharing and collaborating open source projects'}
				</h1>
			</div>
			<div className='mt-16 flex flex-col space-y-16'>
				<div className='container mx-auto flex flex-col px-16'>
					<PageSection
						heading='Have an awesome idea for a project?'
						subheading='Are you looking for more collaborators to work with you? Create your project and search for your dream team!'
						image={getImagePath('bookshelf.svg')}
					/>
					<PageSection
						heading='Expand your knowledge!'
						subheading='Want to expand your knowledge and tech stack? Looking to dive deep into a framework but never had the opportunity? Search for projects by specific technologies to find exactly what you want!'
						image={getImagePath('bookshelf.svg')}
						orientation='flip'
					/>
					<PageSection
						heading='Various 3rd-party tools integrations!'
						subheading='Create your project with your favorite source control, chat and project management tools to bootstrap and kickstart your project!'
						image={getImagePath('bookshelf.svg')}
					/>
				</div>
				{recentProjects.length > 0 && (
					<div className='bg-celestial-blue flex w-full flex-col items-center gap-4 p-8'>
						<h3 className='text-ghost-white text-3xl font-semibold'>
							Recently Added Projects
						</h3>
						<div className='flex w-full justify-around'>
							{recentProjects.map((project) => (
								<SummaryProjectCard key={project.id} {...project} />
							))}
						</div>
					</div>
				)}
				<div className='text-royal-blue flex flex-col items-center gap-4 text-center'>
					<span className='text-3xl'>What are you waiting for? Join the Hub</span>
					<a href='/login'>
						<Button>Get started</Button>
					</a>
				</div>
			</div>
		</>
	);
}
