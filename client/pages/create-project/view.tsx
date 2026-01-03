import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { CreateProjectForm } from './form';

type CreateProjectViewProps = {
	createProject: (data: CreateProjectInput) => void;
	loading: boolean;
	error?: string;
};

export function CreateProjectView({ createProject, loading, error }: CreateProjectViewProps) {
	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='page_title'>Create New Project</h1>
			<CreateProjectForm onSubmit={createProject} loading={loading} error={error} />
		</div>
	);
}
