import { createContext, useContext } from 'react';

type DropdownMenuContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
};
export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenu() {
	const context = useContext(DropdownMenuContext);
	if (!context) {
		throw new Error('useDropdownMenu must be used within a DropdownMenuProvider');
	}
	return context;
}
