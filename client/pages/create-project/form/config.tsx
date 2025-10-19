import type { ElementType } from 'react';
import { GeneralInfoStep } from './steps/general-info-step';
import { ProjectLinksStep } from './steps/project-links-step';
import { ProjectTechnologiesStep } from './steps/project-technologies-step';

type FormStepConfig = {
	title: string;
	component: ElementType;
};

export const formStepsConfig: FormStepConfig[] = [
	{
		title: 'General Info',
		component: GeneralInfoStep,
	},
	{
		title: 'Project Links',
		component: ProjectLinksStep,
	},
	{
		title: 'Technology Stack',
		component: ProjectTechnologiesStep,
	},
];
