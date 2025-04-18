import { Layout } from '$/client/components/layout';
import { Button } from '$/client/components/ui/button';
import { getImagePath } from '$/client/utils/images';
import { PageSection } from './page-section';
import { SummaryProjectCard } from './summary-project-card';
import type { RecentProject } from './types';

type Props = {
	recentProjects: RecentProject[];
};

export function HomePage({ recentProjects }: Props) {
	return (
		<Layout>
			<div className='bg-royal-blue py-12'>
				<h1 className='mx-auto w-2/3 text-center text-5xl font-semibold text-white'>
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
				<div className='bg-celestial-blue flex w-full flex-col items-center gap-4 p-8'>
					<h3 className='text-ghost-white text-3xl font-semibold'>
						Recently Added Projects
					</h3>
					<div className='flex w-full justify-between'>
						{recentProjects.slice(0, 4).map((project) => (
							<SummaryProjectCard key={project.id} {...project} />
						))}
					</div>
				</div>
				<div className='text-royal-blue flex flex-col items-center gap-4 text-center'>
					<span className='text-3xl'>What are you waiting for? Join the hub</span>
					<a href='/login'>
						<Button>Get started</Button>
					</a>
				</div>
			</div>
		</Layout>
	);
}
