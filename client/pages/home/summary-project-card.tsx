import { Card } from '$/client/components/ui/card';
import type { RecentProject } from '$/shared/types/projects';
import { useMemo } from 'react';

export function SummaryProjectCard({ name, shortDescription, technologies }: RecentProject) {
	const subtitle = useMemo(
		() => technologies.map((tech) => tech.name).join(', '),
		[technologies],
	);

	return (
		<Card className='bg-ghost-white w-80'>
			<Card.Header title={name} subtitle={subtitle} />
			<Card.Body>{shortDescription}</Card.Body>
		</Card>
	);
}
