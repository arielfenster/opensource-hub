import { useEffect } from 'react';
import type { DropdownContextValue } from './context';

export function useDropdownClickOutside({
	triggerRef,
	contentRef,
	setOpen,
	onClose,
}: Pick<DropdownContextValue, 'triggerRef' | 'contentRef' | 'setOpen'> & { onClose?: () => void }) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node) &&
				contentRef.current &&
				!contentRef.current.contains(event.target as Node)
			) {
				setOpen(false);
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
}
