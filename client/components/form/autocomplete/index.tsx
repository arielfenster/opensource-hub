'use client';

import { type ChangeEvent, forwardRef } from 'react';
import { Input, type InputProps } from '../input';

import './index.css';

type OptionItem = { label: string; value: any };

type AutoCompleteProps = InputProps & {
	// options: OptionItem[];
	options: string[];
	onChange: (value: string) => void;
};

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(function AutoComplete(
	{ options, name, onChange, ...rest },
	ref,
) {
	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		// const displayValue = event.target.value;

		// const matchingElement = document.querySelector(`option[value="${displayValue}"]`);
		// const actualValue = matchingElement?.getAttribute('data-value');

		// if (onChange && actualValue) {
		// 	onChange({
		// 		target: {
		// 			value: actualValue,
		// 		},
		// 	} as ChangeEvent<HTMLInputElement>);
		// }

		const { value } = event.target;
		const matchingElement = document.querySelector(`option[value="${value}"]`);

		if (matchingElement) {
			onChange(value);
		}
	}

	return (
		<>
			<Input
				name={name}
				ref={ref}
				list={name}
				type='search'
				id={undefined}
				onChange={handleInputChange}
				{...rest}
			/>
			<datalist id={name}>
				{options.map((option) => (
					<option key={option} value={option} />
				))}
			</datalist>
		</>
	);
});
