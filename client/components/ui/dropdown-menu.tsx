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
	type ReactNode,
} from 'react';

type DropdownMenuContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
};
const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
	const context = useContext(DropdownMenuContext);
	if (!context) {
		throw new Error('useDropdownMenu must be used within a DropdownMenuProvider');
	}
	return context;
}

function DropdownMenu({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(true);

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

	const modifiedChildren = Children.map(
		children as ReactElement<HTMLProps<Element>>,
		(child: ReactElement<HTMLProps<Element>>) => {
			if (isValidElement(child)) {
				return cloneElement(child, {
					className: `${child.props.className || ''} cursor-pointer`,
					onClick: (event: MouseEvent) => {
						toggleDropdownMenu();
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

function DropdownMenuContent({ children }: PropsWithChildren) {
	const { open } = useDropdownMenu();

	return (
		<div
			className={cn(
				'absolute right-1 w-44 transition-all duration-300 ease-in-out',
				open && 'pointer-events-auto translate-y-2 opacity-100',
				!open && 'pointer-events-none translate-y-[-8px] opacity-0',
			)}
		>
			<ul className='bg-ghost-white flex flex-col rounded-lg shadow-xl'>{children}</ul>
		</div>
	);
}

type DropdownMenuItemProps = {
	text: string;
	image: string | ReactNode;
	onClick?: () => void;
	href?: string;
};

function DropdownMenuItem({ text, image, onClick, href = '#' }: DropdownMenuItemProps) {
	function handleClick(event: MouseEvent) {
		if (href === '#') {
			event.stopPropagation();
		}

		if (onClick) {
			onClick();
		}
	}
	return (
		<li className='hover:border-royal-blue border-2 pl-4 transition-all duration-300 ease-in-out first:pt-4 first:pb-2 last:pt-2 last:pb-4'>
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
