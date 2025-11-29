import { Card } from '$/client/components/ui/card';
import type { ProjectDetails } from '$/shared/types/projects';

type WhatYouWillLearnCardProps = { project: ProjectDetails };

export function KeyFeaturesCard({ project }: WhatYouWillLearnCardProps) {
	if (!project.keyFeatures.length) {
		return null;
	}

	return (
		<Card>
			<Card.Title>Key Features</Card.Title>
			<Card.Body>
				<ul className='flex flex-col gap-4'>
					{project.keyFeatures.map((value) => (
						<li className='flex items-center gap-3 text-lg' key={value}>
							<span className='bg-celestial-blue h-2 w-2 rounded-full'></span>
							<span>{value}</span>
						</li>
					))}
				</ul>
			</Card.Body>
		</Card>
	);
}
