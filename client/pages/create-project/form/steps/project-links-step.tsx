import { useMultiStepForm } from '$/client/components/form/multi-step-form/context';
import { TextField } from '$/client/components/form/textfield';
import { Card } from '$/client/components/ui/card';
import { type CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import {
	projectLinksSchema,
	type ProjectLinksInput,
} from '$/shared/schemas/project/project-links.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function ProjectLinksStep() {
	const { data, onStepSubmit, registerGetValues } = useMultiStepForm<CreateProjectInput>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<ProjectLinksInput>({
		resolver: zodResolver(projectLinksSchema),
		defaultValues: data.links ?? {},
	});

	useEffect(() => {
		registerGetValues(() => ({ links: getValues() }));
	}, [registerGetValues, getValues]);

	return (
		<Card>
			<Card.Header>
				<Card.Title className='text-3xl'>Project Links</Card.Title>
			</Card.Header>
			<Card.Body>
				<form
					className='flex flex-col gap-4'
					id='multi-step-form-step-1'
					onSubmit={(event) => {
						handleSubmit((data) => {
							onStepSubmit({ links: data });
						})(event);
					}}
				>
					<TextField
						label='Project/Demo Link'
						{...register('projectLink')}
						error={errors.projectLink?.message}
						placeholder='https://myproject.com'
					/>
					<TextField
						label='Source Control'
						{...register('sourceControlLink')}
						error={errors.sourceControlLink?.message}
						placeholder='https://github.com/username/repo'
					/>
					<TextField
						label='Chat'
						{...register('chatLink')}
						error={errors.chatLink?.message}
						placeholder='https://discord.gg/invite'
					/>
					<TextField
						label='Project Management'
						{...register('projectManagementLink')}
						error={errors.projectManagementLink?.message}
						placeholder='https://trello.com/b/boardid'
					/>
				</form>
			</Card.Body>
			{/* <Card.Footer className='flex justify-between'>
				<Button
					className={cn(
						'text-eerie-black hover:text-eerie-black/80 flex gap-1 bg-transparent px-0 font-normal hover:bg-transparent',
					)}
					onClick={() => {
						const form = document.getElementById('multi-step-form-step-1') as HTMLFormElement;
						const fd = new FormData(form);
						fd.forEach(console.log)
						// updateData({ links: getValues() });
						// goToPreviousStep();
					}}
				>
					<ChevronLeftIcon />
					<span className='text-lg'>Previous</span>
				</Button>
				<Button
					className='text-ghost-white bg-celestial-blue hover:bg-celestial-blue-hover flex gap-1 self-end rounded-lg font-normal'
					type='submit'
					form='project-links-step'
				>
					<span className='text-lg'>Next</span>
					<ChevronRightIcon />
				</Button>
			</Card.Footer> */}
		</Card>
	);
}
