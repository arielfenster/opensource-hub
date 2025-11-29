import { useMultiStepForm, useStep } from '$/client/components/form/multi-step-form/context';
import { TechnologiesAutoCompleteContainer } from '$/client/components/technologies-autocomplete';
import { Card } from '$/client/components/ui/card';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import { type CreateProjectInput } from '$/shared/schemas/project/create-project.schema';

export function ProjectTechnologiesStep() {
	const { selectedTechnologies } = useTechnologiesStore();
	const { onStepSubmit, error } = useMultiStepForm<CreateProjectInput>();
	const { formId } = useStep();

	return (
		<Card>
			<Card.Title className='text-3xl'>Technology Stack</Card.Title>
			<Card.Body className='flex flex-col gap-4'>
				<form
					className='flex flex-col gap-4'
					id={formId}
					onSubmit={(event) => {
						event.preventDefault();
						onStepSubmit({ technologies: selectedTechnologies });
					}}
				>
					<TechnologiesAutoCompleteContainer className='w-full' />
				</form>
				{error && (
					<div className='border-2 border-red-600 bg-red-100 p-4'>
						<div className='flex items-center gap-4'>
							<span className='text-ghost-white h-5 w-5 rounded-full bg-red-600 text-center text-sm font-semibold'>
								X
							</span>
							<div className='flex flex-col'>
								<span className='text-lg font-medium text-red-800'>
									Error creating project
								</span>
								<span className='text-base text-red-600'>{error}</span>
							</div>
						</div>
					</div>
				)}
			</Card.Body>
		</Card>
	);
}
