import { Select } from '$/client/components/form/select';
import {
	TechnologiesAutocomplete,
	type TechnologiesAutocompleteProps,
} from '$/client/components/technologies-autocomplete';
import { Card } from '$/client/components/ui/card';
import { projectTeamPositions } from '$/shared/types/projects';

type SearchSectionProps = {
	technologies: Pick<TechnologiesAutocompleteProps, 'data'>['data'];
	onFilter: (type: 'tech' | 'position', value: string) => void;
};

export function SearchSection({ onFilter, technologies }: SearchSectionProps) {
	return (
		<div className='flex gap-2'>
			<TechnologiesAutocomplete
				data={technologies}
				onSelect={(option) => onFilter('tech', option.value)}
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
												onClick={() => onFilter('position', role)}
											>
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
			</div>
		</div>
	);
}
