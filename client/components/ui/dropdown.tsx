import { cn } from '$/client/lib/utils';
import {
	Children,
	cloneElement,
	createContext,
	isValidElement,
	useContext,
	useState,
	type HTMLProps,
	type MouseEvent,
	type PropsWithChildren,
	type ReactElement,
} from 'react';

type DropdownContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
};
const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('useDropdown must be used within a DropdownProvider');
	}
	return context;
}

function Dropdown({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);

	return (
		<DropdownContext.Provider value={{ open, setOpen }}>{children}</DropdownContext.Provider>
	);
}

function DropdownTrigger({ children }: PropsWithChildren) {
	const { open, setOpen } = useDropdown();

	function toggleDropdown() {
		setOpen(!open);
	}

	const modifiedChildren = Children.map(
		children as ReactElement<HTMLProps<Element>>,
		(child: ReactElement<HTMLProps<Element>>) => {
			if (isValidElement(child)) {
				return cloneElement(child, {
					className: `${child.props.className || ''} cursor-pointer`,
					onClick: (event: MouseEvent) => {
						toggleDropdown();
						if (child.props.onClick) {
							child.props.onClick(event);
						}
					},
				});
			}
			return child;
		},
	);

	return modifiedChildren;
}

function DropdownContent({ children }: PropsWithChildren) {
	const { open } = useDropdown();

	return (
		<div
			className={cn(
				'absolute right-8 flex w-[150px] flex-col gap-4 rounded-lg bg-neutral-400 p-4 shadow-lg transition-all duration-300 ease-in-out',
				open && 'pointer-events-auto translate-y-2 opacity-100',
				!open && 'pointer-events-none translate-y-[-8px] opacity-0',
			)}
		>
			{children}
		</div>
	);
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;

export { Dropdown };
