import { Card } from '$/client/components/ui/card';
import type { ProjectDetails } from '$/shared/types/projects';

type AboutThisProjectCardProps = { project: ProjectDetails };

export function AboutThisProjectCard({ project }: AboutThisProjectCardProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>About This Project</Card.Title>
			</Card.Header>
			<Card.Body className='text-lg whitespace-pre-line'>{project.longDescription}</Card.Body>
		</Card>
	);
}
