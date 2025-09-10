import { cn } from '$/client/lib/utils';
import { Input, type InputProps } from '../input';
import { useAutocomplete } from './hook';
import { type Option, type RenderOptionFn } from './types';

import './index.css';

type Props = Omit<InputProps, 'onSelect'> & {
	options: Option[];
	onSelect: (option: Option) => void;
	renderOption?: RenderOptionFn;
};

export function AutoComplete({
	options,
	name,
	onSelect,
	renderOption = (option) => <span>{option}</span>,
	...rest
}: Props) {
	const {
		filteredOptions,
		showDropdown,
		selectedOptionIndex,
		inputRef,
		dropdownRef,
		handleChange,
		handleSelect,
		handleKeyDown,
	} = useAutocomplete({ options, onSelect });

	return (
		<div className='relative' ref={dropdownRef}>
			<Input
				{...rest}
				name={name}
				list={name}
				ref={inputRef}
				type='search'
				id={undefined}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{showDropdown && (
				<div className='absolute z-10 flex max-h-[20rem] w-full flex-col gap-1 overflow-y-scroll bg-white shadow-2xl'>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, index) => (
							<div
								key={option}
								className={cn(
									'cursor-pointer items-center rounded px-4 py-1 hover:bg-gray-100',
									index === selectedOptionIndex && 'bg-gray-200',
								)}
								onClick={() => handleSelect(option)}
							>
								{renderOption(option)}
							</div>
						))
					) : (
						<div className='px-3 py-1 text-gray-500'>No options found</div>
					)}
				</div>
			)}
		</div>
	);
}
