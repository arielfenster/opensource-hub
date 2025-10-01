import type { ComponentPropsWithoutRef } from 'react';
import { Button, type ButtonProps } from './button';
import { cn } from '$/client/lib/utils';

type LinkButtonProps = ButtonProps & Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string };

export function LinkButton({ children, className, href, ...rest }: LinkButtonProps) {
	return (
		<a href={href}>
			<Button
				className={cn(
					'bg-ghost-white text-eerie-black flex h-8 flex-1 gap-2 rounded-md border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100',
					className,
				)}
				{...rest}
			>
				{children}
			</Button>
		</a>
	);
}
