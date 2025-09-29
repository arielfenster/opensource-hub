import type { ComponentPropsWithoutRef } from 'react';
import { Button, type ButtonProps } from './button';

type LinkButtonProps = ButtonProps & Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string };

export function LinkButton({ children, href, ...rest }: LinkButtonProps) {
	return (
		<a href={href}>
			<Button className='bg-purple-300' {...rest}>{children}</Button>
		</a>
	);
}
