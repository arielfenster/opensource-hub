import { Select } from '$/client/components/form/select';
import { TechnologiesAutoCompleteContainer } from '$/client/components/technologies-autocomplete';
import { projectTeamPositions, type ProjectTeamPosition } from '$/shared/types/projects';
import { useMemo } from 'react';
import type { SearchFilter } from '../service';

type SearchSectionProps = {
	onFilter: (filter: SearchFilter) => void;
};

export function SearchSection({ onFilter }: SearchSectionProps) {
	const selectPositionItems = useMemo(
		() =>
			projectTeamPositions.map((position) => ({
				label: position,
				value: position,
			})),
		[],
	);

	return (
		<section className='flex gap-2'>
			<TechnologiesAutoCompleteContainer className='w-1/2' />
			<Select
				items={selectPositionItems}
				emptyItem={'Filter by position'}
				multiple
				onSelect={(position) =>
					onFilter({ type: 'position', value: position as ProjectTeamPosition })
				}
			/>
		</section>
	);
}
