import { CreateProjectForm } from './form';
import { useCreateProject } from './hook';

export function CreateProjectPage() {
	const { createProject, loading, error } = useCreateProject();

	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Create New Project</h1>
			<CreateProjectForm onSubmit={createProject} loading={loading} error={error} />
		</div>
	);
}
