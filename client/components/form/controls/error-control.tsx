import { type PropsWithChildren } from 'react';
import { FieldError, type FieldErrorProps } from '../field-error';

export type ErrorControlProps = PropsWithChildren<FieldErrorProps>;

export function ErrorControl({ error, children }: ErrorControlProps) {
	return (
		<>
			{children}
			<FieldError error={error} />
		</>
	);
}
