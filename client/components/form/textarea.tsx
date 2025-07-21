import { forwardRef, type TextareaHTMLAttributes } from 'react';
import type { LabelProps } from './label';
import type { FieldErrorProps } from './field-error';
import { FieldControl } from './controls/field-control';
import { LabelControl } from './controls/label-control';
import { ErrorControl } from './controls/error-control';

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value'> &
	LabelProps &
	FieldErrorProps & {
		limit?: number;
		value?: string;
	};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
	{ label, name, required, error, limit, value, ...rest }: Props,
	ref,
) {
	return (
		<FieldControl>
			<LabelControl label={label} name={name} required={required}>
				<ErrorControl error={error}>
					<textarea
						className='w-full rounded-lg border border-solid border-gray-400 pt-1 pl-2'
						ref={ref}
						name={name}
						id={name}
						rows={4}
						{...rest}
					/>
					{limit && (
						<span className='self-end'>
							{String(value || '').length}/{limit}
						</span>
					)}
				</ErrorControl>
			</LabelControl>
		</FieldControl>
	);
});
