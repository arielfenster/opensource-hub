import { useState, useRef, useEffect, type ChangeEvent, useCallback } from 'react';
import type { Option } from './types';

const Keys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
} as const;

const UNINITIALIZED_OPTION_INDEX = -1;

type Props = {
	options: Option[];
	onSelect: (option: Option) => void;
};

export function useAutocomplete({ options, onSelect }: Props) {
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
