import { Card } from '$/client/components/ui/card';
import type { ProjectDetails } from '$/shared/types/projects';
import { useMemo } from 'react';

type RecentProjectsSectionProps = { recentProjects: ProjectDetails[] };

export function RecentProjectsSection({ recentProjects }: RecentProjectsSectionProps) {
	return (
		recentProjects.length > 0 && (
			<div className='bg-celestial-blue flex w-full flex-col items-center gap-4 p-8'>
				<h3 className='text-ghost-white text-3xl font-semibold'>Recently Added Projects</h3>
				<div className='flex w-full justify-around'>
					{recentProjects.map((project) => (
						<SummaryProjectCard key={project.id} {...project} />
					))}
				</div>
			</div>
		)
	);
}

export function SummaryProjectCard({ name, shortDescription, technologies }: ProjectDetails) {
	const technologiesList = useMemo(
		() => technologies.map((tech) => tech.name).join(', '),
		[technologies],
	);

	return (
		<Card className='bg-ghost-white w-[22rem]'>
			<Card.Header>
				<Card.Title>{name}</Card.Title>
				<Card.Description>{technologiesList}</Card.Description>
			</Card.Header>
			<Card.Body>
				<span className='text-eerie-black-black text-lg'>{shortDescription}</span>
			</Card.Body>
		</Card>
	);
}
