import { cn } from '$/client/lib/utils';
import { Input, type InputProps } from '../input';
import { useAutoComplete } from './hook';
import type { Option, OptionData, RenderOptionFn } from './types';

import './index.css';

type Props<TData extends OptionData = OptionData> = Omit<InputProps, 'onSelect'> & {
	options: Option<TData>[];
	onSelect: (option: Option<TData>) => void;
	renderOption?: RenderOptionFn<TData>;
};

export function AutoComplete<TData extends OptionData = OptionData>({
	options,
	onSelect,
	renderOption = (option) => <span>{option.value}</span>,
	...rest
}: Props<TData>) {
	const {
		filteredOptions,
		showDropdown,
		selectedOptionIndex,
		inputRef,
		dropdownRef,
		handleChange,
		handleSelect,
		handleKeyDown,
	} = useAutoComplete({ options, onSelect });

	return (
		<div className='relative' ref={dropdownRef}>
			<Input
				{...rest}
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
								key={option.value}
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
