import { cn } from '$/client/lib/utils';
import type { ReactNode } from 'react';
import { Input, type InputProps } from '../input';
import { useAutoComplete } from './hook';
import { Dropdown } from '../../ui/dropdown';

import './index.css';

export type AutoCompleteProps<T> = Omit<InputProps, 'onSelect'> & {
	options: T[];
	valueKey: keyof T;
	onSelect: (option: T) => void;
	renderOption: (option: T) => ReactNode;
	renderEmptyState?: () => React.ReactNode;
};

export function AutoComplete<T>(props: AutoCompleteProps<T>) {
	return (
		<Dropdown>
			<AutoCompleteInner {...props} />
		</Dropdown>
	);
}

function AutoCompleteInner<T>({
	options,
	valueKey,
	onSelect,
	renderOption,
	renderEmptyState = DefaultEmptyState,
	...rest
}: AutoCompleteProps<T>) {
	const {
		filteredOptions,
		selectedOptionIndex,
		inputRef,
		handleChange,
		handleSelect,
		handleKeyDown,
	} = useAutoComplete({ options, valueKey, onSelect });

	return (
		<>
			<Dropdown.Anchor>
				<Input
					{...rest}
					ref={inputRef}
					type='search'
					id={undefined}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</Dropdown.Anchor>
			<Dropdown.Content className='bg-ghost-white flex max-h-[20rem] w-full flex-col gap-1 overflow-y-scroll shadow-2xl'>
				{filteredOptions.length > 0
					? filteredOptions.map((option, index) => (
							<Dropdown.Item
								key={option[valueKey] as string}
								className={cn(
									'cursor-pointer items-center rounded px-4 py-1 hover:bg-gray-100',
									index === selectedOptionIndex && 'bg-gray-200',
								)}
								onClick={() => handleSelect(option)}
							>
								{renderOption(option)}
							</Dropdown.Item>
						))
					: renderEmptyState()}
			</Dropdown.Content>
		</>
	);
}

function DefaultEmptyState() {
	return <div className='h-12 rounded px-4 py-2 text-lg'>No options found</div>;
}
