import { Select } from '$/client/components/form/select';
import { TechnologiesAutoCompleteContainer } from '$/client/components/technologies-autocomplete';
import { projectTeamPositionValues, type ProjectTeamPosition } from '$/shared/types/projects';
import { useMemo } from 'react';
import { useTeamPositionsStore } from '../team-positions.store';

export function SearchSection() {
	const { togglePosition } = useTeamPositionsStore();

	const selectPositionItems = useMemo(
		() =>
			projectTeamPositionValues.map((position) => ({
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
				onSelect={(position) => togglePosition(position as ProjectTeamPosition)}
			/>
		</section>
	);
}
