import { TechnologyChip } from '$/client/components/technologies-autocomplete/technology-chip';
import { convertTechnologyDataToOptionItem } from '$/client/components/technologies-autocomplete/utils';
import { Card } from '$/client/components/ui/card';
import { parseDate } from '$/client/lib/utils';
import type { ProjectDetails } from '$/shared/types/projects';
import { CalendarIcon, ClockIcon } from 'lucide-react';

type ProjectReviewCardProps = { project: ProjectDetails };

export function ProjectReviewCard({ project }: ProjectReviewCardProps) {
	return (
		<Card>
			<Card.Header className='gap-6'>
				<Card.Title className='text-royal-blue text-4xl font-semibold'>
					{project.name}
				</Card.Title>
				<Card.Description className='line-clamp-none text-lg'>
					{project.shortDescription}
				</Card.Description>
			</Card.Header>
			{project.technologies && (
				<Card.Body className='flex flex-wrap items-center gap-2'>
					{project.technologies.map((tech) => (
						<TechnologyChip
							key={tech.id}
							technology={convertTechnologyDataToOptionItem(tech)}
						/>
					))}
				</Card.Body>
			)}
			<Card.Footer className='flex gap-8'>
				<span className='flex gap-2'>
					<CalendarIcon /> Created {parseDate(project.createdAt)}
				</span>
				<span className='flex gap-2'>
					<ClockIcon /> Updated {parseDate(project.updatedAt)}
				</span>
			</Card.Footer>
		</Card>
	);
}
