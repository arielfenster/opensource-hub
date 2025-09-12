import { useState, useRef, useEffect, type ChangeEvent, useCallback } from 'react';
import type { Option, OptionData } from './types';

const Keys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
} as const;

const UNINITIALIZED_OPTION_INDEX = -1;

type Props<TData extends OptionData> = {
	options: Option<TData>[];
	onSelect: (option: Option<TData>) => void;
};

export function useAutoComplete<TData extends OptionData>({ options, onSelect }: Props<TData>) {
	const [filteredOptions, setFilteredOptions] = useState<Option<TData>[]>(options);
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
		const filtered = options.filter((option) =>
			option.value.toLowerCase().includes(lowercasedInput),
		);

		setFilteredOptions(filtered);
		setShowDropdown(true);
	}

	const handleSelect = useCallback((option: Option<TData>) => {
		onSelect(option);
		setFilteredOptions(options);
		resetState();
	}, []);

	const resetState = useCallback(() => {
		setShowDropdown(false);
		setSelectedOptionIndex(UNINITIALIZED_OPTION_INDEX);
		inputRef.current!.value = '';
		inputRef.current!.focus();
	}, []);

	function handleKeyDown(event: React.KeyboardEvent) {
		if (!showDropdown || filteredOptions.length === 0) {
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
				resetState();
				break;
			}
		}
	}

	return {
		filteredOptions,
		showDropdown,
		selectedOptionIndex,
		inputRef,
		dropdownRef,
		handleChange,
		handleSelect,
		handleKeyDown,
	};
}
