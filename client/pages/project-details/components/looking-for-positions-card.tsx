import { Card } from '$/client/components/ui/card';
import type { ProjectDetails } from '$/shared/types/projects';

type LookingForPositionsCardProps = { project: ProjectDetails };

export function LookingForPositionsCard({ project }: LookingForPositionsCardProps) {
	if (!project.teamPositions.length) {
		return null;
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title>{`We're Looking For`}</Card.Title>
			</Card.Header>
			<Card.Body>
				<ul className='flex flex-col gap-4'>
					{project.teamPositions.map((position) => (
						<li className='flex items-center gap-3 text-lg' key={position}>
							<span className='h-2 w-2 rounded-full bg-red-500'></span>
							<span>{position}</span>
						</li>
					))}
				</ul>
			</Card.Body>
		</Card>
	);
}
