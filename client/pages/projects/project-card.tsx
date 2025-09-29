import { TechnologyChip } from '$/client/components/technologies-autocomplete/technology-chip';
import { convertTechnologyDataToOptionItem } from '$/client/components/technologies-autocomplete/utils';
import { Button } from '$/client/components/ui/button';
import { Card } from '$/client/components/ui/card';
import type { ProjectWithTechnologies } from '$/shared/types/projects';

type Props = {
	project: ProjectWithTechnologies;
};

export function ProjectCard({ project }: Props) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>{project.name}</Card.Title>
			</Card.Header>
			<Card.Body className='flex flex-col gap-4'>
				<Card.Description>{project.shortDescription}</Card.Description>
				<div className='flex gap-2'>
					{project.technologies.slice(0, 4).map((tech) => (
						<TechnologyChip
							key={tech.id}
							technology={convertTechnologyDataToOptionItem(tech)}
						/>
					))}
				</div>
			</Card.Body>
			<Card.Footer>
				<Button>More info</Button>
				<Button>Code</Button>
				<Button>Live demo</Button>
			</Card.Footer>
		</Card>
	);
}
