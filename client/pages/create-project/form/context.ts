import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { createContext, useContext } from 'react';

type CreateProjectContextValue = {
	goBack: () => void;
	onStepSubmit: (data: Partial<CreateProjectInput>) => void;
};
export const CreateProjectContext = createContext<CreateProjectContextValue | null>(null);

export function useCreateProjectContext() {
	const context = useContext(CreateProjectContext);
	if (!context) {
		throw new Error('useCreateProjectContext must be used within a CreateProjectContext');
	}
	return context;
}
