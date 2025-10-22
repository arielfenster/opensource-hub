import { useFetchTechnologies } from '$/client/hooks/useFetchTechnologies';
import { cn } from '$/client/lib/utils';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import type { TechnologyData } from '$/shared/types/technologies';
import { SearchIcon } from 'lucide-react';
import { AutoComplete } from '../form/autocomplete';
import { config } from './config';
import { TechnologyChip } from './technology-chip';

export function TechnologiesAutoCompleteContainer(
	props: Omit<TechnologiesAutoCompleteProps, 'data'>,
) {
	const { data: technologies } = useFetchTechnologies();

	return <TechnologiesAutoComplete data={technologies} {...props} />;
}

export type TechnologiesAutoCompleteProps = {
	data: TechnologyData[];
	onSelect?: (item: TechnologyData) => void;
	onRemove?: (item: TechnologyData) => void;
	className?: string;
};

function TechnologiesAutoComplete({
	data,
	onSelect,
	onRemove,
	className,
}: TechnologiesAutoCompleteProps) {
	const { selectedTechnologies, addTechnology, removeTechnology } = useTechnologiesStore();

	function renderEmptyState() {
		return (
			<div className='p-3 text-sm text-gray-600'>
				<p>No matches found.</p>
				<button
					className='mt-1 text-blue-600 underline hover:text-blue-800'
					onClick={console.log}
				>
					Request a new technology
				</button>
			</div>
		);
	}

	function renderOption(option: TechnologyData) {
		const Icon = config[option.group.name].icon;

		return (
			<div className='flex cursor-pointer justify-between p-2'>
				<span className='text-lg'>{option.name}</span>
				<div
					className={cn(
						'flex items-center gap-2 rounded-lg border bg-gray-100 px-2 py-1',
						config[option.group.name].className,
					)}
				>
					<Icon className='h-4 w-4' />
					{config[option.group.name].label}
				</div>
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
