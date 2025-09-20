import { TechnologiesAutocomplete } from '$/client/components/technologies-autocomplete';
import { Card } from '$/client/components/ui/card';
import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologies } from '$/client/hooks/useTechnologies';
import { projectTeamPositions } from '$/shared/types/projects';

export function ProjectsPage() {
	const { data: technologies } = useTechnologies();
	const { data: projects } = useProjects();

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<TechnologiesAutocomplete data={technologies} />
			<div className='flex w-full justify-between'>
				<div className='flex flex-1 flex-col'>
					<Card>
						<Card.Header>
							<Card.Title>Filters</Card.Title>
						</Card.Header>
						<Card.Body>
							<div className='flex flex-col gap-1'>
								<span className='text-lg'>Roles</span>
								<ul>
									{projectTeamPositions.map((role) => (
										<li key={role}>
											<label className='flex w-fit cursor-pointer gap-2 px-2 py-1'>
												<input type='checkbox' name='teamPosition' />
												<span>{role}</span>
											</label>
										</li>
									))}
								</ul>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='flex-3 bg-purple-200'>hello</div>
			</div>
		</div>
	);
}
