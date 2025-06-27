import { Card } from '$/client/components/ui/card';
import type { RecentProject } from '$/shared/types/projects';

export function SummaryProjectCard({ name, tags, shortDescription }: RecentProject) {
	return (
		<Card className='bg-ghost-white w-80'>
			<Card.Header title={name} subtitle={tags.join(', ')} />
			<Card.Body>{shortDescription}</Card.Body>
		</Card>
	);
}
