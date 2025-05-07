import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';
import { Spinner } from './spinner';

type Props = PropsWithChildren<ComponentPropsWithoutRef<'button'>> & {
	loading?: boolean;
};

export function Button({ className, loading, children, ...props }: Props) {
	return (
		<button
			{...props}
			className={cn(
				'bg-cerise text-ghost-white flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 font-bold transition-colors duration-100 hover:bg-[#f0426d]',
				className,
			)}
		>
			{loading ? (
				<>
					<Spinner />
					{children}
				</>
			) : (
				children
			)}
		</button>
	);
}
