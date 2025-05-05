import { cn } from '$/client/utils/classnames';
import type { LabelHTMLAttributes } from 'react';

export type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'label'> & {
	label: string;
	name: string;
	required?: boolean;
};

export function Label({ className, label, required, name, ...rest }: LabelProps) {
	return (
		<label htmlFor={name} className={cn('mb-1 ml-0.5', className)} {...rest}>
			<span>
				{label}
				{required && <p className='inline text-red-800'> *</p>}
			</span>
		</label>
	);
}
