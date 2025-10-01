import { TechnologiesAutocomplete } from '$/client/components/technologies-autocomplete';
import { Card } from '$/client/components/ui/card';
import { projectTeamPositions } from '$/shared/types/projects';
import type { TechnologyGroupData } from '$/shared/types/technologies';
import type { SearchFilter } from '../service';

type SearchSectionProps = {
	technologies: TechnologyGroupData[];
	onFilter: (filter: SearchFilter) => void;
};

export function SearchSection({ onFilter, technologies }: SearchSectionProps) {
	return (
		<section className='flex gap-2'>
			<TechnologiesAutocomplete
				data={technologies}
				onSelect={(technology) => onFilter({ type: 'tech', value: technology })}
			/>
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
											<label
												className='flex w-fit cursor-pointer gap-2 px-2 py-1'
												onClick={() =>
													onFilter({ type: 'position', value: role })
												}
											>
												<input type='checkbox' name='teamPosition' className='cursor-pointer' />
												<span>{role}</span>
											</label>
										</li>
									))}
								</ul>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</section>
	);
}
