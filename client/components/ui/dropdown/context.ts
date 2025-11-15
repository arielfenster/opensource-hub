import { createContext, useContext } from 'react';

export type DropdownContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	triggerRef: React.RefObject<HTMLElement | null>;
	contentRef: React.RefObject<HTMLElement | null>;
};
export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdown() {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('useDropdownContext must be used within a DropdownContext');
	}
	return context;
}
