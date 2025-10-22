import { cn } from '$/client/lib/utils';
import type { ReactNode } from 'react';
import { Input, type InputProps } from '../input';
import { useAutoComplete } from './hook';

import './index.css';

export type AutoCompleteProps<T> = Omit<InputProps, 'onSelect'> & {
	options: T[];
	valueKey: keyof T;
	onSelect: (option: T) => void;
	renderOption: (option: T) => ReactNode;
	renderEmptyState?: () => React.ReactNode;
};

export function AutoComplete<T>({
	options,
	valueKey,
	onSelect,
	renderOption,
	renderEmptyState = DefaultEmptyState,
	...rest
}: AutoCompleteProps<T>) {
	const {
		filteredOptions,
		isDropdownOpen,
		selectedOptionIndex,
		inputRef,
		dropdownRef,
		handleChange,
		handleSelect,
		handleKeyDown,
	} = useAutoComplete({ options, valueKey, onSelect });

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
			{isDropdownOpen && (
				<div className='bg-ghost-white absolute z-10 flex max-h-[20rem] w-full flex-col gap-1 overflow-y-scroll shadow-2xl'>
					{filteredOptions.length > 0
						? filteredOptions.map((option, index) => (
								<div
									key={option[valueKey] as string}
									className={cn(
										'cursor-pointer items-center rounded px-4 py-1 hover:bg-gray-100',
										index === selectedOptionIndex && 'bg-gray-200',
									)}
									onClick={() => handleSelect(option)}
								>
									{renderOption(option)}
								</div>
							))
						: renderEmptyState()}
				</div>
			)}
		</div>
	);
}

function DefaultEmptyState() {
	return <div className='h-12 rounded px-4 py-2 text-lg'>No options found</div>;
}
