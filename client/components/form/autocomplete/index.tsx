'use client';

import { useRef, useState, type ChangeEvent, useCallback, useEffect } from 'react';
import { Input, type InputProps } from '../input';
import { type Option, type RenderOptionFn } from './types';
import { cn } from '$/client/lib/utils';

import './index.css';

const Keys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
} as const;

const UNINITIALIZED_OPTION_INDEX = -1;

type Props = InputProps & {
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
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(UNINITIALIZED_OPTION_INDEX);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
				setSelectedOptionIndex(UNINITIALIZED_OPTION_INDEX);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const lowercasedInput = event.target.value.toLowerCase();
		const filtered = options.filter((option) => option.toLowerCase().includes(lowercasedInput));

		setFilteredOptions(filtered);
		setShowDropdown(true);
	}

	const handleSelect = useCallback((option: Option) => {
		onSelect(option);
		setShowDropdown(false);
		setFilteredOptions(options);
		inputRef.current!.value = '';
	}, []);

	function handleKeyDown(event: React.KeyboardEvent) {
		if (!showDropdown) {
			return;
		}

		switch (event.key) {
			case Keys.ARROW_UP: {
				setSelectedOptionIndex((prevIndex) => Math.max(0, prevIndex - 1));
				break;
			}
			case Keys.ARROW_DOWN: {
				setSelectedOptionIndex((prevIndex) =>
					Math.min(filteredOptions.length - 1, prevIndex + 1),
				);
				break;
			}
			case Keys.ENTER: {
				handleSelect(filteredOptions[selectedOptionIndex]);
				setSelectedOptionIndex(UNINITIALIZED_OPTION_INDEX);
				break;
			}
			case Keys.ESCAPE: {
				setShowDropdown(false);
				setSelectedOptionIndex(UNINITIALIZED_OPTION_INDEX);
				break;
			}
		}
	}

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
				<div className='absolute z-10 flex w-full flex-col gap-1 bg-white shadow-2xl'>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, index) => (
							<div
								key={option}
								className={cn(
									'cursor-pointer rounded px-4 py-1 hover:bg-gray-100',
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
