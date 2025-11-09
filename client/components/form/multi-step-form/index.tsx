import { cn } from '$/client/lib/utils';
import { CheckIcon } from 'lucide-react';
import {
	Children,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type MouseEvent,
	type PropsWithChildren,
} from 'react';
import { Button, type ButtonProps } from '../../ui/button';
import {
	MultiStepFormProvider,
	StepIndicatorProvider,
	StepProvider,
	useMultiStepForm,
	useStepIndicator,
} from './context';
import { buildFormId, filterChildren, getTypedChildren } from './utils';

type MultiStepFormProps<T> = PropsWithChildren<{
	onSubmit: (data: T) => void;
	loading: boolean;
	error?: string;
	className?: string;
}>;

function MultiStepForm<T>({
	onSubmit,
	loading,
	error,
	className,
	children,
}: MultiStepFormProps<T>) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<T>({} as T);
	const getValuesRef = useRef<(() => Partial<T>) | null>(null);

	const stepIndicatorsContainer = filterChildren(
		getTypedChildren(children),
		StepIndicatorsContainer,
	)[0];
	const totalSteps = Children.count(stepIndicatorsContainer.props.children);

	function goToPreviousStep() {
		setCurrentStep(currentStep - 1);
	}

	function goToNextStep() {
		setCurrentStep(currentStep + 1);
	}

	function onStepSubmit(data: Partial<T>) {
		const isLastStep = currentStep === totalSteps - 1;
		if (!isLastStep) {
			updateFormData(data);
			goToNextStep();
			return;
		}

		onSubmit({ ...formData, ...data });
	}

	function updateFormData(data?: Partial<T>) {
		if (data) {
			setFormData({ ...formData, ...data });
			return;
		}

		if (!getValuesRef.current) {
			return;
		}

		const stepData = getValuesRef.current();
		setFormData({ ...formData, ...stepData });
	}

	function registerGetValues(getValues: () => Partial<T>) {
		getValuesRef.current = getValues;
	}

	return (
		<MultiStepFormProvider<T>
			value={{
				data: formData,
				updateData: updateFormData,
				currentStep,
				totalSteps,
				goToPreviousStep,
				goToNextStep,
				onStepSubmit,
				registerGetValues,
				loading,
				error,
			}}
		>
			<div className={cn('flex flex-col items-center gap-8', className)}>{children}</div>
		</MultiStepFormProvider>
	);
}

// type FormContainerProps = PropsWithChildren<{ className?: string }>;
// function FormContainer({ className, children }: FormContainerProps) {
// 	const {} = useMultiStepForm();
// 	// const { stepId } = useStep();

// 	return;
// }

type StepIndicatorsContainerProps = PropsWithChildren<ComponentPropsWithoutRef<'ul'>>;
function StepIndicatorsContainer({ children }: StepIndicatorsContainerProps) {
	return (
		<ul className='flex gap-2'>
			{Children.map(children, (child, index) => (
				<StepIndicatorProvider value={{ index }}>{child}</StepIndicatorProvider>
			))}
		</ul>
	);
}

type StepIndicatorProps = { title: string };
function StepIndicator({ title }: StepIndicatorProps) {
	const { currentStep, totalSteps } = useMultiStepForm();
	const { index } = useStepIndicator();

	const isLastStep = index === totalSteps - 1;

	return (
		<div className={cn('flex items-center gap-4', !isLastStep && 'w-full')}>
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
			{!isLastStep && <div className='w-full border-2 border-gray-300' />}
		</div>
	);
}

type StepsContainerProps = PropsWithChildren;
function StepsContainer({ children }: StepsContainerProps) {
	const { currentStep } = useMultiStepForm();

	const activeStep = getTypedChildren(children)[currentStep];

	return <div className='w-full'>{activeStep}</div>;
}

type StepProps = PropsWithChildren;
function Step({ children }: StepProps) {
	const { currentStep } = useMultiStepForm();

	const formId = buildFormId(currentStep);

	return <StepProvider value={{ formId }}>{children}</StepProvider>;
}

type NavigationProps = PropsWithChildren;
function Navigation({ children }: NavigationProps) {
	const { currentStep } = useMultiStepForm();

	const typedChildren = getTypedChildren(children);
	const previousButton = filterChildren(typedChildren, PreviousButton)[0];
	const nextButton = filterChildren(typedChildren, NextButton)[0];

	return (
		<div className='flex w-full justify-between'>
			{currentStep !== 0 && previousButton}
			{nextButton}
		</div>
	);
}

type PreviousButtonProps = PropsWithChildren<ButtonProps>;
function PreviousButton({ children, onClick, className, ...rest }: PreviousButtonProps) {
	const { goToPreviousStep, updateData } = useMultiStepForm();

	return (
		<Button
			className={cn(
				'text-eerie-black hover:text-eerie-black/80 flex gap-1 bg-transparent px-0 font-normal hover:bg-transparent',
				className,
			)}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				updateData();
				goToPreviousStep();
				if (onClick) {
					onClick(event);
				}
			}}
			{...rest}
		>
			{children}
		</Button>
	);
}

type NextButtonProps = PropsWithChildren<ButtonProps>;
function NextButton({ children, onClick, ...rest }: NextButtonProps) {
	const { currentStep, loading } = useMultiStepForm();

	return (
		<Button
			className='text-ghost-white bg-celestial-blue hover:bg-celestial-blue-hover ml-auto flex gap-1 rounded-lg font-normal'
			form={buildFormId(currentStep)}
			type='submit'
			loading={loading}
			{...rest}
		>
			{children}
		</Button>
	);
}

// MultiStepForm.FormContainer = FormContainer;
MultiStepForm.StepIndicatorsContainer = StepIndicatorsContainer;
MultiStepForm.StepIndicator = StepIndicator;
MultiStepForm.StepsContainer = StepsContainer;
MultiStepForm.Step = Step;
MultiStepForm.Navigation = Navigation;
MultiStepForm.PreviousButton = PreviousButton;
MultiStepForm.NextButton = NextButton;

export { MultiStepForm };
