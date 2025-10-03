import { Card } from '$/client/components/ui/card';
import type { RecentProject } from '$/shared/types/projects';
import { useMemo } from 'react';

export function SummaryProjectCard({ name, shortDescription, technologies }: RecentProject) {
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
