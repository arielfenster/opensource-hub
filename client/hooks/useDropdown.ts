import { useState, useRef, useEffect, useCallback } from 'react';

type Props = {
	onClose?: () => void;
};

export function useDropdown({ onClose }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const openDropdown = useCallback(() => setIsDropdownOpen(true), []);
	const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				closeDropdown();
				if (onClose) {
					onClose();
				}
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return {
		isDropdownOpen,
		openDropdown,
		closeDropdown,
		dropdownRef,
	};
}
