import { createContext, useContext, type PropsWithChildren } from 'react';

type MultiStepFormContextValue<T> = {
	data: Partial<T>;
	updateData: (data?: Partial<T>) => void;
	currentStep: number;
	totalSteps: number;
	goToNextStep: () => void;
	goToPreviousStep: () => void;
	onStepSubmit: (data: Partial<T>) => void;
	registerGetValues: (getValues: () => Partial<T>) => void;
	loading: boolean;
	error?: string;
};
const MultiStepFormContext = createContext<MultiStepFormContextValue<any> | null>(null);

export function MultiStepFormProvider<T>({
	children,
	value,
}: PropsWithChildren<{ value: MultiStepFormContextValue<T> }>) {
	return <MultiStepFormContext.Provider value={value}>{children}</MultiStepFormContext.Provider>;
}

export function useMultiStepForm<T>() {
	const context = useContext(MultiStepFormContext);
	if (!context) {
		throw new Error('useMultiStepForm must be used within a MultiStepFormProvider');
	}
	return context as MultiStepFormContextValue<T>;
}

type StepIndicatorsContextValue = {
	index: number;
};
const StepIndicatorsContext = createContext<StepIndicatorsContextValue | null>(null);

export function StepIndicatorProvider({
	children,
	value,
}: PropsWithChildren<{ value: StepIndicatorsContextValue }>) {
	return (
		<StepIndicatorsContext.Provider value={value}>{children}</StepIndicatorsContext.Provider>
	);
}
export function useStepIndicator() {
	const context = useContext(StepIndicatorsContext);
	if (!context) {
		throw new Error('useStepIndicator must be used within a StepIndicatorProvider');
	}
	return context;
}

type StepContextValue = {
	formId: string;
};
const StepContext = createContext<StepContextValue | null>(null);

export function StepProvider({ children, value }: PropsWithChildren<{ value: StepContextValue }>) {
	return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
export function useStep() {
	const context = useContext(StepContext);
	if (!context) {
		throw new Error('useStep must be used within a StepProvider');
	}
	return context;
}
