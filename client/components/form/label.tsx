import { cn } from '$/client/lib/utils';
import type { LabelHTMLAttributes } from 'react';

export type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'label'> & {
	label: string;
	name: string;
	required?: boolean;
};

export function Label({ className, label, required, name, ...rest }: LabelProps) {
	return (
		<label htmlFor={name} className={cn('mb-1', className)} {...rest}>
			<span>
				{label}
				{required && <p className='inline text-red-800'> *</p>}
			</span>
		</label>
	);
}
