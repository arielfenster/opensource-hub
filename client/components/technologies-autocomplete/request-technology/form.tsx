import { capitalize, fromKebabCase } from '$/client/lib/utils';
import {
	requestTechnologySchema,
	type RequestTechnologyInput,
} from '$/shared/schemas/technologies/request-technology.schema';
import { technologyGroupNameValues } from '$/shared/types/technologies';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { forwardRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FieldControl } from '../../form/controls/field-control';
import { LabelControl } from '../../form/controls/label-control';
import { Select } from '../../form/select';
import { TextField } from '../../form/textfield';

type RequestTechnologyFormProps = {
	onSubmit: (input: RequestTechnologyInput) => void;
};

export const RequestTechnologyForm = forwardRef<HTMLFormElement, RequestTechnologyFormProps>(
	function RequestTechnologyForm({ onSubmit }, ref) {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<RequestTechnologyInput>({
			resolver: valibotResolver(requestTechnologySchema),
		});

		const selectTechnologyGroupItems = useMemo(
			() =>
				technologyGroupNameValues.map((value) => ({
					label: fromKebabCase(value).split(' ').map(capitalize).join(' '),
					value,
				})),
			[],
		);

		return (
			<form
				ref={ref}
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center gap-2'
			>
				<TextField
					label='Technology Name'
					error={errors.name?.message}
					placeholder='e.g, React, Node.js, Docker'
					{...register('name')}
				/>

				<FieldControl>
					<LabelControl name='group' label='Group'>
						<Select
							className='w-full'
							items={selectTechnologyGroupItems}
							{...register('group')}
							onSelect={console.log}
						/>
					</LabelControl>
				</FieldControl>
			</form>
		);
	},
);
