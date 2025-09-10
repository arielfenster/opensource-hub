import { cn } from '$/client/lib/utils';
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	color?: string;
	outlined?: boolean;
	removable?: boolean;
	onClick?: () => void;
}>;

export function Chip({ color, outlined = false, removable = false, onClick, children }: Props) {
	return (
		<div
			className={cn(
				'flex gap-1 rounded-2xl px-3 py-1 font-semibold',
				color,
				outlined && 'border border-solid border-black',
			)}
		>
			{children}
			{removable && (
				<span onClick={onClick} className='ml-1 inline-block cursor-pointer font-normal'>
					&times;
				</span>
			)}
		</div>
	);
}
