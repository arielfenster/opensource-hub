import { Select } from '$/client/components/form/select';
import type { SelectItem } from '$/client/components/form/select/types';
import { TechnologiesAutocomplete } from '$/client/components/technologies-autocomplete';
import { projectTeamPositions, type ProjectTeamPosition } from '$/shared/types/projects';
import type { TechnologyGroupData } from '$/shared/types/technologies';
import { useMemo } from 'react';
import type { SearchFilter } from '../service';

type SearchSectionProps = {
	technologies: TechnologyGroupData[];
	onFilter: (filter: SearchFilter) => void;
};

export function SearchSection({ onFilter, technologies }: SearchSectionProps) {
	const selectPositionItems: SelectItem<ProjectTeamPosition>[] = useMemo(
		() =>
			projectTeamPositions.map((position) => ({
				label: position,
				value: position,
			})),
		[],
	);

	return (
		<section className='flex gap-2'>
			<TechnologiesAutocomplete
				data={technologies}
				onSelect={(technology) => onFilter({ type: 'tech', value: technology })}
			/>
			<Select
				items={selectPositionItems}
				emptyItem={'Filter by position'}
				onSelect={(position) => onFilter({ type: 'position', value: position })}
			/>
		</section>
	);
}
