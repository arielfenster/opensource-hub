import { cn } from '$/client/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
	name: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, name, startIcon, endIcon, ...rest },
	ref,
) {
	return (
		<div className={cn('relative flex w-full items-center justify-between', className)}>
			{startIcon && <div className='absolute left-2'>{startIcon}</div>}
			<input
				className={cn(
					'w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow-sm',
					className,
				)}
				ref={ref}
				id={name}
				name={name}
				{...rest}
			/>
			{endIcon && <div className='absolute right-2'>{endIcon}</div>}
		</div>
	);
});
