import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { AutoCompleteProps } from '.';

const Keys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
} as const;

const UNINITIALIZED_OPTION_INDEX = -1;

type Props<T> = Pick<AutoCompleteProps<T>, 'options' | 'valueKey' | 'onSelect'>;

export function useAutoComplete<T>({ options, valueKey, onSelect }: Props<T>) {
	const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
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
			(option[valueKey] as string).toLowerCase().includes(lowercasedInput),
		);

		setFilteredOptions(filtered);
		setShowDropdown(true);
	}

	const handleSelect = useCallback((option: T) => {
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
		// this is to prevent form submissions where this component is used inside a form
		if (event.key === Keys.ENTER) {
			event.preventDefault();
		}

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
