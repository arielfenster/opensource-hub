import { useMemo, useState } from 'react';
import { config } from './config';
import { AutoComplete } from '../form/autocomplete';
import { SearchIcon } from 'lucide-react';
import { cn } from '$/client/lib/utils';
import type { TechnologyGroupData } from '$/shared/types/technologies';
import type { TechnologyName, TechnologyOption } from './types';
import { convertTechnologiesDataToOptionsArray } from './utils';
import { TechnologyChip } from './technology-chip';

type Props = {
	data: TechnologyGroupData[];
};

export function TechnologiesAutocomplete({ data }: Props) {
	const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyOption[]>([]);

	const technologyOptions = useMemo(() => convertTechnologiesDataToOptionsArray(data), [data]);

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

	function renderOption(option: TechnologyOption) {
		const Icon = config[option.groupName as TechnologyName].icon;

		return (
			<div className='flex cursor-pointer justify-between p-2'>
				<span className='text-lg'>{option.value}</span>
				<div
					className={cn(
						'flex items-center gap-2 rounded-lg border bg-gray-100 px-2 py-1',
						config[option.groupName as TechnologyName].className,
					)}
				>
					<Icon className='h-4 w-4' />
					{config[option.groupName as TechnologyName].label}
				</div>
			</div>
		);
	}

	function addTechItem(technology: TechnologyOption) {
		setSelectedTechnologies((prev) => {
			if (prev.includes(technology)) {
				return prev;
			}
			return [...prev, technology];
		});
	}

	function removeTechItem(technology: TechnologyOption) {
		setSelectedTechnologies((prev) => prev.filter((tech) => tech !== technology));
	}

	return (
		<div className='relative flex w-1/2 flex-col gap-3'>
			<AutoComplete
				onSelect={addTechItem}
				options={technologyOptions}
				renderOption={renderOption}
				name='technologies'
				className='border border-gray-500 py-3 text-lg'
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
							onClick={() => removeTechItem(technology)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
