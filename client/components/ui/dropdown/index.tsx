import { cn } from '$/client/lib/utils';
import {
	Children,
	cloneElement,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type HTMLProps,
	type PropsWithChildren,
	type ReactElement,
	type MouseEvent as ReactMouseEvent,
	type RefObject,
} from 'react';
import { DropdownContext, useDropdown } from './context';
import { useDropdownClickOutside } from './hook';

type CommonProps = PropsWithChildren<{
	className?: string;
}>;

function Dropdown({ className, children }: CommonProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLElement>(null);

	return (
		<DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
			<div className={cn('relative', className)}>{children}</div>
		</DropdownContext.Provider>
	);
}

type DropdownTriggerProps = CommonProps & {
	onClose?: () => void;
};
function DropdownTrigger({ onClose, children }: DropdownTriggerProps) {
	const { open, setOpen, triggerRef, contentRef } = useDropdown();
	useDropdownClickOutside({ triggerRef, contentRef, setOpen, onClose });

	function toggleDropdown() {
		setOpen(!open);
	}

	const child = Children.only(children) as ReactElement<HTMLProps<Element>>;

	return cloneElement(child as ReactElement<HTMLProps<Element>>, {
		className: cn(child.props.className, 'cursor-pointer'),
		ref: triggerRef,
		onClick: (event: ReactMouseEvent) => {
			toggleDropdown();
			if (child.props.onClick) {
				child.props.onClick(event);
			}
		},
	});
}

function DropdownAnchor({ children }: CommonProps) {
	const { triggerRef, contentRef, setOpen } = useDropdown();
	useDropdownClickOutside({ triggerRef, contentRef, setOpen });

	return <div ref={triggerRef as RefObject<HTMLDivElement>}>{children}</div>;
}

function DropdownContent({ className, children }: CommonProps) {
	const { open, contentRef } = useDropdown();

	return (
		<div
			className={cn(
				'bg-ghost-white pointer-events-auto absolute z-10 rounded-lg opacity-100 shadow-xl',
				!open && 'pointer-events-none opacity-0',
				className,
			)}
			ref={contentRef as RefObject<HTMLDivElement>}
		>
			<ul className='flex flex-col gap-2'>{children}</ul>
		</div>
	);
}

type DropdownItemProps = CommonProps & ComponentPropsWithoutRef<'li'>;

function DropdownItem({ children, ...props }: DropdownItemProps) {
	return <li {...props}>{children}</li>;
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Anchor = DropdownAnchor;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

export { Dropdown };
