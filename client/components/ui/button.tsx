import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';

type Props = PropsWithChildren<ComponentPropsWithoutRef<'button'>>;

export function Button({ children, className, ...props }: Props) {
	return (
		<button
			{...props}
			className={cn(
				'bg-cerise text-ghost-white cursor-pointer rounded-full px-6 py-2 font-bold transition-colors duration-100 hover:bg-[#f0426d]',
				className,
			)}
		>
			{children}
		</button>
	);
}
