import { useState } from 'react';
import type { Option } from '../form/autocomplete/types';
import { config } from './config';
import { AutoComplete } from '../form/autocomplete';
import { SearchIcon } from 'lucide-react';
import { Chip } from '../ui/chip';
import { cn } from '$/client/lib/utils';

type Props = {
	options: Option[];
};

export function TechStackAutocomplete({ options }: Props) {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>(['React', 'Node.js']);

	function renderOption(option: Option) {
		return (
			<div className='flex cursor-pointer justify-between p-2'>
				<span className='text-md'>{option}</span>
				<div
					className={cn(
						'flex gap-2 rounded-md border bg-gray-100 p-1',
						config.framework.color,
					)}
				>
					{config.framework.label} {config.framework.text}
				</div>
			</div>
		);
	}

	function removeOption(option: Option) {
		setSelectedOptions((prev) => prev.filter((o) => o !== option));
	}

	function addOption(option: Option) {
		setSelectedOptions((prev) => {
			if (prev.includes(option)) {
				return prev;
			}
			return [...prev, option];
		});
	}

	return (
		<div className='relative flex w-1/2 flex-col gap-3'>
			<AutoComplete
				onSelect={addOption}
				options={options}
				renderOption={renderOption}
				name='techStack'
				className='border border-gray-500 py-3 text-lg'
				startIcon={<SearchIcon className='text-gray-300' />}
				placeholder='Search projects by tech stack - start typing to see the available options'
				autoFocus
			/>
			{selectedOptions.length > 0 && (
				<div className='flex flex-wrap gap-1'>
					{selectedOptions.map((option) => (
						<Chip
							key={option}
							color={config.language.color}
							outlined
							removable
							onClick={() => removeOption(option)}
						>
							{option}
						</Chip>
					))}
				</div>
			)}
		</div>
	);
}
