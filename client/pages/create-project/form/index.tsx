import { cn } from '$/client/lib/utils';
import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { CheckIcon } from 'lucide-react';
import { useReducer, useState } from 'react';
import { formStepsConfig } from './config';
import { CreateProjectContext } from './context';

type CreateProjectFormProps = {
	onSubmit: (input: CreateProjectInput) => void;
	loading: boolean;
	error?: string;
};

// TODO:
// consider creating a MultiStepForm component that contains the step logic and can be reused in other parts of the app
// use composition:
// MultiStepForm.PreviousButton
// MultiStepForm.NextButton
// MultiStepForm.StepIndicator (and container)
// MultiStepForm.Step
//

// TODO:
// add default values (so when going back, the data is still there)
// add function to set proper default values (if value is optional and is string, set it as undefined, not empty string)
//
export function CreateProjectForm({ onSubmit, loading, error }: CreateProjectFormProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, dispatch] = useReducer(
		(state: CreateProjectInput, newState: Partial<CreateProjectInput>) => {
			return { ...state, ...newState };
		},
		{} as CreateProjectInput,
	);

	const { component: StepComponent } = formStepsConfig[currentStep];

	function goBack() {
		setCurrentStep(currentStep - 1);
	}

	async function goNext() {
		setCurrentStep(currentStep + 1);
	}

	function handleStepSubmit(data: Partial<CreateProjectInput>) {
		const isLastStep = currentStep === formStepsConfig.length - 1;
		if (!isLastStep) {
			dispatch(data);
			goNext();
			return;
		}

		onSubmit({ ...formData, ...data });
	}

	return (
		<div className='flex flex-col items-center gap-8'>
			<div className='flex w-2/3 justify-around gap-4'>
				{formStepsConfig.map((step, index) => (
					<StepIndicator
						key={index}
						index={index}
						currentStep={currentStep}
						title={step.title}
					/>
				))}
			</div>
			<CreateProjectContext.Provider
				value={{ data: formData, goBack, onStepSubmit: handleStepSubmit, loading, error }}
			>
				<StepComponent />
			</CreateProjectContext.Provider>
		</div>
	);
}

function StepIndicator({
	index,
	currentStep,
	title,
}: {
	index: number;
	currentStep: number;
	title: string;
}) {
	const isLastStepIndicator = index === formStepsConfig.length - 1;

	return (
		<div className={cn('flex items-center gap-4', !isLastStepIndicator && 'w-full')}>
			<div className='flex flex-col items-center gap-1 text-center'>
				<span
					className={cn(
						'flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-xl font-semibold',
						currentStep === index && 'bg-celestial-blue text-ghost-white',
						currentStep > index && 'text-ghost-white bg-green-500',
					)}
				>
					{currentStep > index ? <CheckIcon /> : index + 1}
				</span>
				<span className='text-eerie-black text-base'>{title}</span>
			</div>
			{!isLastStepIndicator && <div className='w-full border-2 border-gray-300' />}
		</div>
	);
}
