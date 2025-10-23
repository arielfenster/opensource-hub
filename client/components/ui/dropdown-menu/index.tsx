import { cn } from '$/client/lib/utils';
import {
	Children,
	cloneElement,
	useState,
	type HTMLProps,
	type MouseEvent,
	type PropsWithChildren,
	type ReactElement,
	type ReactNode,
} from 'react';
import { DropdownMenuContext, useDropdownMenu } from './context';

function DropdownMenu({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);

	return (
		<DropdownMenuContext.Provider value={{ open, setOpen }}>
			<div className='relative'>{children}</div>
		</DropdownMenuContext.Provider>
	);
}

function DropdownMenuTrigger({ children }: PropsWithChildren) {
	const { open, setOpen } = useDropdownMenu();

	function toggleDropdownMenu() {
		setOpen(!open);
	}

	return Children.map(
		children as ReactElement<HTMLProps<Element>>,
		(child: ReactElement<HTMLProps<Element>>) =>
			cloneElement(child, {
				className: cn(child.props.className, 'cursor-pointer'),
				onClick: (event: MouseEvent) => {
					toggleDropdownMenu();
					if (child.props.onClick) {
						child.props.onClick(event);
					}
				},
			}),
	);
}

function DropdownMenuContent({ children }: PropsWithChildren) {
	const { open } = useDropdownMenu();

	return (
		<div
			className={cn(
				'bg-ghost-white absolute right-1 rounded-lg shadow-xl transition-all duration-300 ease-in-out',
				open && 'pointer-events-auto translate-y-2 opacity-100',
				!open && 'pointer-events-none translate-y-[-8px] opacity-0',
			)}
		>
			<ul className='flex flex-col gap-2'>{children}</ul>
		</div>
	);
}

type DropdownMenuItemProps = {
	text: string;
	image: string | ReactNode;
	// supports either performing an action (e.g logout) or navigating to a page (e.g profile)
	onClick?: () => void;
	href?: string;
};

function DropdownMenuItem({ text, image, onClick, href = '#' }: DropdownMenuItemProps) {
	const { setOpen } = useDropdownMenu();

	function handleClick(event: MouseEvent) {
		if (href === '#') {
			event.stopPropagation();
		}

		if (onClick) {
			onClick();
		}
		setOpen(false);
	}

	return (
		<li className='p-3 transition-all duration-300 ease-in-out hover:rounded-lg hover:bg-gray-300'>
			<a
				href={href}
				className='text-eerie-black flex items-center gap-4'
				onClick={handleClick}
			>
				{typeof image === 'string' ? (
					<img className='h-6 w-6' src={image} alt={text} />
				) : (
					image
				)}
				<span>{text}</span>
			</a>
		</li>
	);
}

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;

export { DropdownMenu };
