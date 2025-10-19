import { ErrorControl } from '$/client/components/form/controls/error-control';
import { FieldControl } from '$/client/components/form/controls/field-control';
import { Input } from '$/client/components/form/input';
import { Textarea } from '$/client/components/form/textarea';
import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import { Card } from '$/client/components/ui/card';
import { cn } from '$/client/lib/utils';
import {
	projectGeneralInfoSchema,
	type ProjectGeneralInfoInput,
} from '$/shared/schemas/project/project-general-info.schema';
import { projectTeamPositions } from '$/shared/types/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useController, useFieldArray, useForm, type UseFormReturn } from 'react-hook-form';
import { useCreateProjectContext } from '../context';

export function GeneralInfoStep() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<ProjectGeneralInfoInput>({
		resolver: zodResolver(projectGeneralInfoSchema),
		defaultValues: {
			keyFeatures: [{ feature: '' }],
		},
	});
	const { onStepSubmit } = useCreateProjectContext();

	console.log(getValues());

	const selectPositionItems = useMemo(
		() =>
			projectTeamPositions.map((position) => ({
				label: position,
				value: position,
			})),
		[],
	);

	return (
		<Card className='w-2/3'>
			<Card.Header>
				<Card.Title className='text-3xl'>General Info</Card.Title>
			</Card.Header>
			<Card.Body>
				<form
					className='flex flex-col gap-4'
					id='general-info-step'
					onSubmit={(event) => {
						handleSubmit((data) => {
							onStepSubmit(data);
						})(event);
					}}
				>
					<TextField
						label='Project Name'
						{...register('name')}
						error={errors.name?.message}
						required
						placeholder='My Awesome Project'
					/>
					<TextField
						label='Short Description'
						{...register('shortDescription')}
						error={errors.shortDescription?.message}
						required
						placeholder='A short description of your project. This will be displayed in the projects filter page'
					/>
					<Textarea
						label='Long Description'
						{...register('longDescription')}
						error={errors.longDescription?.message}
						required
						placeholder="A detailed description of your project, its goals, and what makes it unique. This will be displayed in the project's page"
					/>
					<KeyFeaturesSection control={control} register={register} />

					{/* <Select
						name='teamPositions'
						items={selectPositionItems}
						multiple
						onSelect={console.log}
					/> */}
				</form>
			</Card.Body>
			<Card.Footer className='flex justify-between'>
				<Button
					type='submit'
					className='text-ghost-white bg-celestial-blue hover:bg-celestial-blue-hover flex gap-1 self-end rounded-lg font-normal'
					form='general-info-step'
				>
					<span className='text-lg'>Next</span>
					<ChevronRightIcon />
				</Button>
			</Card.Footer>
		</Card>
	);
}

function KeyFeaturesSection({
	register,
	control,
}: Pick<UseFormReturn<ProjectGeneralInfoInput>, 'control' | 'register'>) {
	const { fields, append, remove } = useFieldArray({ control, name: 'keyFeatures' });
	const {
		formState: { errors },
	} = useController({ name: 'keyFeatures', control });

	return (
		<div className='flex flex-col'>
			{fields.map((field, index) => (
				<div key={field.id} className='flex items-end justify-between gap-4'>
					{index === 0 ? (
						<TextField
							label='Key Features'
							{...register(`keyFeatures.${index}.feature`)}
							error={errors.keyFeatures?.[index]?.message}
						/>
					) : (
						<FieldControl>
							<ErrorControl error={errors.keyFeatures?.[index]?.message}>
								<Input
									className={cn(
										errors.keyFeatures?.[index]?.message &&
											'border-red-600 outline-1 outline-red-600',
									)}
									{...register(`keyFeatures.${index}.feature`)}
								/>
							</ErrorControl>
						</FieldControl>
					)}
					<Button
						type='button'
						className='text-eerie-black mb-5 flex h-5 w-5 justify-center bg-gray-200 p-0 text-sm hover:bg-gray-300'
						onClick={() => remove(index)}
					>
						X
					</Button>
				</div>
			))}
			<Button
				type='button'
				className='text-celestial-blue hover:text-celestial-blue-hover m-0 self-start bg-transparent p-0 font-medium hover:bg-transparent'
				onClick={() => append({ feature: '' })}
			>
				+ Add feature
			</Button>
		</div>
	);
}

function TeamPositionsSection() {}
