import { cn } from '$/client/lib/utils';
import type { PropsWithChildren } from 'react';

export type FieldControlProps = PropsWithChildren<{
	className?: string;
}>;

export function FieldControl({ className, children }: FieldControlProps) {
	return <div className={cn('my-2 flex w-full flex-col items-start', className)}>{children}</div>;
}
