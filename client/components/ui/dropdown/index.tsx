import { cn } from '$/client/lib/utils';
import {
	Children,
	cloneElement,
	useEffect,
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
	const { triggerRef } = useDropdown();

	return <div ref={triggerRef as RefObject<HTMLDivElement>}>{children}</div>;
}

function DropdownContent({ className, children }: CommonProps) {
	const { open, contentRef } = useDropdown();

	return (
		<div
			className={cn(
				'pointer-events-auto absolute z-10 rounded-lg opacity-100 shadow-xl bg-ghost-white',
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
