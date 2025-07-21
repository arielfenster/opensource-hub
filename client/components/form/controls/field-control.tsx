import type { PropsWithChildren } from 'react';

export type FieldControlProps = PropsWithChildren<{}>;

export function FieldControl({ children }: FieldControlProps) {
	return <div className='my-2 flex w-full flex-col items-start'>{children}</div>;
}
