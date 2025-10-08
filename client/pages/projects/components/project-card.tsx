import { TechnologyChip } from '$/client/components/technologies-autocomplete/technology-chip';
import { convertTechnologyDataToOptionItem } from '$/client/components/technologies-autocomplete/utils';
import { Card } from '$/client/components/ui/card';
import { Chip } from '$/client/components/ui/chip';
import { LinkButton } from '$/client/components/ui/link-button';
import type { ProjectDetails } from '$/shared/types/projects';
import { InfoIcon, CodeIcon, ExternalLinkIcon } from 'lucide-react';

type Props = {
	project: ProjectDetails;
};

export function ProjectCard({ project }: Props) {
	return (
		<Card className='border-t-celestial-blue border-t-4 duration-300 hover:-translate-y-3'>
			<Card.Header>
				<Card.Title>{project.name}</Card.Title>
			</Card.Header>
			<Card.Body className='flex flex-col gap-6'>
				<Card.Description>{project.shortDescription}</Card.Description>
				<div className='flex flex-wrap items-center gap-2'>
					{project.technologies.slice(0, 5).map((tech) => (
						<TechnologyChip
							key={tech.id}
							technology={convertTechnologyDataToOptionItem(tech)}
						/>
					))}
					{project.technologies.length > 5 && (
						<span>+{project.technologies.length - 5} more</span>
					)}
				</div>
				{project.teamPositions.length > 0 && (
					<div className='flex flex-wrap items-center gap-2'>
						<span>Looking for:</span>
						{project.teamPositions.map((position) => (
							<Chip
								key={position}
								outlined
								className='text-eerie-black flex h-6 items-center rounded py-0 text-sm font-light'
							>
								{position}
							</Chip>
						))}
					</div>
				)}
			</Card.Body>
			<Card.Footer className='flex justify-between' separator>
				<LinkButton href={`/projects/${project.slug}`}>
					<InfoIcon height={20} width={20} />
					More info
				</LinkButton>
				{project.links?.sourceControlLink && (
					<LinkButton href={project.links.sourceControlLink}>
						<CodeIcon height={20} width={20} />
						Code
					</LinkButton>
				)}
				{project.links?.projectLink && (
					<LinkButton
						href={project.links.projectLink}
						className='bg-celestial-blue hover:bg-celestial-blue-hover text-ghost-white'
					>
						<ExternalLinkIcon height={20} width={20} />
						Live demo
					</LinkButton>
				)}
			</Card.Footer>
		</Card>
	);
}
