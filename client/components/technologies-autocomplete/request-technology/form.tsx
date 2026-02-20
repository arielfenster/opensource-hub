import {
	requestTechnologySchema,
	type RequestTechnologyInput,
} from '$/shared/schemas/technologies/request-technology.schema';
import { type TechnologyData } from '$/shared/types/technologies';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { forwardRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FieldControl } from '../../form/controls/field-control';
import { LabelControl } from '../../form/controls/label-control';
import { Select } from '../../form/select';
import { TextField } from '../../form/textfield';

type RequestTechnologyFormProps = {
	technologies: TechnologyData[];
	onSubmit: (input: RequestTechnologyInput) => void;
};

export const RequestTechnologyForm = forwardRef<HTMLFormElement, RequestTechnologyFormProps>(
	function RequestTechnologyForm({ technologies, onSubmit }, ref) {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<RequestTechnologyInput>({
			resolver: valibotResolver(requestTechnologySchema),
		});

		const selectTechnologyGroupItems = useMemo(() => {
			const map = new Map<string, string>();
			technologies.forEach((tech) => {
				map.set(tech.group.id, tech.group.name);
			});

			return Array.from(map.entries()).map(([id, name]) => ({
				label: name,
				value: id,
			}));
		}, [technologies]);

		return (
			<form
				ref={ref}
				onSubmit={(event) => {
					event.stopPropagation();
					handleSubmit(onSubmit)(event);
				}}
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
							{...register('groupId')}
							onSelect={() => {}}
						/>
					</LabelControl>
				</FieldControl>
			</form>
		);
	},
);
