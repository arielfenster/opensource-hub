import { forwardRef } from 'react';
import { ErrorControl } from './controls/error-control';
import { FieldControl } from './controls/field-control';
import { LabelControl } from './controls/label-control';
import { type FieldErrorProps } from './field-error';
import { Input, type InputProps } from './input';
import { cn } from '$/client/utils/classnames';

export type TextFieldProps = InputProps &
	FieldErrorProps & {
		label: string;
	};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
	{ name, className, label, required, error, ...rest },
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
							className,
						)}
						ref={ref}
						{...rest}
					/>
				</ErrorControl>
			</LabelControl>
		</FieldControl>
	);
});
