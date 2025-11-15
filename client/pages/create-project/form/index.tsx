import { MultiStepForm } from '$/client/components/form/multi-step-form';
import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { GeneralInfoStep } from './steps/general-info-step';
import { ProjectLinksStep } from './steps/project-links-step';
import { ProjectTechnologiesStep } from './steps/project-technologies-step';

type CreateProjectFormProps = {
	onSubmit: (input: CreateProjectInput) => void;
	loading: boolean;
	error?: string;
};

export function CreateProjectForm({ onSubmit, loading, error }: CreateProjectFormProps) {
	return (
		<MultiStepForm<CreateProjectInput>
			onSubmit={onSubmit}
			loading={loading}
			error={error}
			className='mx-auto w-3/4'
		>
			<MultiStepForm.StepIndicatorsContainer>
				<MultiStepForm.StepIndicator title='General Info' />
				<MultiStepForm.StepIndicator title='Project Links' />
				<MultiStepForm.StepIndicator title='Technology Stack' />
			</MultiStepForm.StepIndicatorsContainer>

			<MultiStepForm.StepsContainer>
				<MultiStepForm.Step>
					<GeneralInfoStep />
				</MultiStepForm.Step>
				<MultiStepForm.Step>
					<ProjectLinksStep />
				</MultiStepForm.Step>
				<MultiStepForm.Step>
					<ProjectTechnologiesStep />
				</MultiStepForm.Step>
			</MultiStepForm.StepsContainer>

			<MultiStepForm.Navigation>
				<MultiStepForm.PreviousButton>
					<ChevronLeftIcon />
					<span className='text-lg'>Previous</span>
				</MultiStepForm.PreviousButton>
				<MultiStepForm.NextButton>
					<span className='text-lg'>Next</span>
					<ChevronRightIcon />
				</MultiStepForm.NextButton>
			</MultiStepForm.Navigation>
		</MultiStepForm>
	);
}
