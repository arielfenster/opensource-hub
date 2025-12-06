import { Card } from '$/client/components/ui/card';
import { LinkButton } from '$/client/components/ui/link-button';
import type { ProjectDetails } from '$/shared/types/projects';
import {
	CodeIcon,
	ExternalLinkIcon,
	GlobeIcon,
	MessageSquareIcon,
	SquareKanbanIcon,
} from 'lucide-react';
import type { ElementType } from 'react';

function shouldRenderCard(links: ProjectDetails['links']) {
	if (!links) {
		return false;
	}

	const shouldRenderFlags = [
		links.projectLink,
		links.chatLink,
		links.projectManagementLink,
		links.sourceControlLink,
	];

	return shouldRenderFlags.some(Boolean);
}

type ProjectLinksCardProps = { links: ProjectDetails['links'] };

export function ProjectLinksCard({ links }: ProjectLinksCardProps) {
	if (!shouldRenderCard(links)) {
		return null;
	}

	return (
		<Card>
			<Card.Title>Project Links</Card.Title>
			<Card.Body className='flex flex-col gap-4'>
				{links?.projectLink && (
					<ProjectLinkButton
						link={links.projectLink}
						header='Live Demo'
						subheader='Try it out'
						icon={GlobeIcon}
					/>
				)}
				{links?.sourceControlLink && (
					<ProjectLinkButton
						link={links.sourceControlLink}
						header='Source Code'
						subheader={`View on ${links.sourceControlType}`}
						icon={CodeIcon}
					/>
				)}
				{links?.chatLink && (
					<ProjectLinkButton
						link={links.chatLink}
						header='Team Chat'
						subheader={`Join ${links.chatType}`}
						icon={MessageSquareIcon}
					/>
				)}
				{links?.projectManagementLink && (
					<ProjectLinkButton
						link={links.projectManagementLink}
						header='Project Board'
						subheader={`View on ${links.projectManagementType}`}
						icon={SquareKanbanIcon}
					/>
				)}
			</Card.Body>
		</Card>
	);
}

function ProjectLinkButton({
	header,
	subheader,
	link,
	icon,
}: {
	header: string;
	subheader: string;
	link: string;
	icon: ElementType;
}) {
	const Icon = icon;
	return (
		<LinkButton
			href={link}
			className='hover:bg-celestial-blue hover:text-ghost-white flex h-full w-full justify-between'
		>
			<div className='flex items-center gap-3'>
				<Icon height={24} width={24} />
				<div className='flex flex-col items-start gap-1'>
					<span className='text-base font-medium'>{header}</span>
					<span className='text-xs font-light'>{subheader}</span>
				</div>
			</div>
			<ExternalLinkIcon height={16} width={16} />
		</LinkButton>
	);
}
