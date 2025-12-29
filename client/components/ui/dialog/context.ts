import { createContext, useContext } from 'react';

type DialogContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	closeable: boolean;
};
export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useDialog must be used within a DialogContext');
	}
	return context;
}
