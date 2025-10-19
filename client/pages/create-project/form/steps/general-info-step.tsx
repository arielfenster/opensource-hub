import { Select } from '$/client/components/form/select';
import { Textarea } from '$/client/components/form/textarea';
import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import { Card } from '$/client/components/ui/card';
import {
	projectGeneralInfoSchema,
	type ProjectGeneralInfoInput,
} from '$/shared/schemas/project/project-general-info.schema';
import { projectTeamPositions } from '$/shared/types/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProjectContext } from '../context';

export function GeneralInfoStep() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProjectGeneralInfoInput>({
		resolver: zodResolver(projectGeneralInfoSchema),
		defaultValues: {},
	});
	const { onStepSubmit } = useCreateProjectContext();

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
					<TextField
						label='Key Features'
						{...register('keyFeatures')}
						error={errors.keyFeatures?.message}
					/>
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
