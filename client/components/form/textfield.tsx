import { forwardRef } from 'react';
import { ErrorControl } from './controls/error-control';
import { FieldControl } from './controls/field-control';
import { LabelControl } from './controls/label-control';
import { type FieldErrorProps } from './field-error';
import { Input, type InputProps } from './input';
import { cn } from '$/client/lib/utils';

export type TextFieldProps = InputProps &
	FieldErrorProps & {
		label: string;
		inputClassName?: string;
	};

// TODO: the className prop isn't used.
// the Input component should have the inputClassName prop as well as className.
// this component should pass inputClassName={inputClassName} and className={cn(..., className)}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
	{ name, className, inputClassName, label, required, error, ...rest },
	ref,
) {
	return (
		<FieldControl>
			<LabelControl label={label} name={name} required={required}>
				<ErrorControl error={error}>
					<Input
						name={name}
						className={cn(
							error && 'border-red-600 outline-1 outline-red-600',
							inputClassName,
						)}
						ref={ref}
						{...rest}
					/>
				</ErrorControl>
			</LabelControl>
		</FieldControl>
	);
});
