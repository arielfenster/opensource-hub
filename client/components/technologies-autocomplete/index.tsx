import { useFetchTechnologies } from './useFetchTechnologies';
import { cn } from '$/client/lib/utils';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import type { TechnologyData } from '$/shared/types/technologies';
import { SearchIcon } from 'lucide-react';
import { AutoComplete } from '../form/autocomplete';
import { TechnologyChip } from '../ui/technology-chip';
import { Dialog } from '../ui/dialog';
import { RequestTechnologyDialogContent } from './request-technology/dialog-content';
import { TechnologyGroupLabel } from '../ui/technology-group-label';

export function TechnologiesAutoCompleteContainer(
	props: Omit<TechnologiesAutoCompleteProps, 'data'>,
) {
	const { data: technologies } = useFetchTechnologies();

	return <TechnologiesAutoComplete data={technologies} {...props} />;
}

type TechnologiesAutoCompleteProps = {
	data: TechnologyData[];
	className?: string;
	requestNewTechnology?: boolean;
};
function TechnologiesAutoComplete({
	data,
	className,
	requestNewTechnology = false,
}: TechnologiesAutoCompleteProps) {
	const { selectedTechnologies, addTechnology, removeTechnology } = useTechnologiesStore();

	function renderEmptyState(closeDropdown: () => void) {
		return (
			<div className='text-md p-3 text-gray-600'>
				<p>No matches found.</p>
				{requestNewTechnology && (
					<Dialog>
						<Dialog.Trigger>
							<button
								className='mt-1 text-blue-600 underline hover:text-blue-800'
								type='button'
								onClick={closeDropdown}
							>
								Request a new technology
							</button>
						</Dialog.Trigger>
						<RequestTechnologyDialogContent />
					</Dialog>
				)}
			</div>
		);
	}

	function renderOption(option: TechnologyData) {
		return (
			<div className='flex cursor-pointer justify-between p-2'>
				<span className='text-lg'>{option.name}</span>
				<TechnologyGroupLabel technology={option} />
			</div>
		);
	}

	return (
		<div className={cn('relative flex w-1/2 flex-col gap-3', className)}>
			<AutoComplete
				onSelect={addTechnology}
				options={data}
				renderOption={renderOption}
				valueKey='name'
				name='technologies'
				className='bg-ghost-white border border-gray-500 py-3 text-lg'
				startIcon={<SearchIcon className='text-gray-300' />}
				placeholder='Search projects by tech stack - start typing to see the available options'
				autoFocus
				renderEmptyState={renderEmptyState}
			/>
			{selectedTechnologies.length > 0 && (
				<div className='flex flex-wrap gap-3'>
					{selectedTechnologies.map((technology) => (
						<TechnologyChip
							key={technology.id}
							technology={technology}
							removable
							onClick={() => removeTechnology(technology)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
