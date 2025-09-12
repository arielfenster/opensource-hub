import { useMemo, useState } from 'react';
import { config } from './config';
import { AutoComplete } from '../form/autocomplete';
import { SearchIcon } from 'lucide-react';
import { Chip } from '../ui/chip';
import { cn } from '$/client/lib/utils';
import type { TechnologyGroupData } from '$/shared/types/technologies';
import type { TechnologyName, TechnologyOption } from './types';
import { convertTechnologiesDataToOptionsArray } from './utils';

type Props = {
	data: TechnologyGroupData[];
};

export function TechnologiesAutocomplete({ data }: Props) {
	const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyOption[]>([]);

	const technologyOptions = useMemo(() => convertTechnologiesDataToOptionsArray(data), [data]);

	function renderEmptyState() {
		return <div className='h-12 rounded px-4 py-2 text-lg'>my custom empty state</div>;
	}

	function renderOption(option: TechnologyOption) {
		return (
			<div className='flex cursor-pointer justify-between p-2'>
				<span className='text-lg'>{option.value}</span>
				<div
					className={cn(
						'flex gap-2 rounded-md border bg-gray-100 p-1',
						config[option.groupName as TechnologyName].color,
					)}
				>
					{config[option.groupName as TechnologyName].icon}{' '}
					{config[option.groupName as TechnologyName].text}
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
						<Chip
							key={technology.id}
							color={config[technology.groupName as TechnologyName].color}
							outlined
							removable
							onClick={() => removeTechItem(technology)}
						>
							{technology.value}
						</Chip>
					))}
				</div>
			)}
		</div>
	);
}
