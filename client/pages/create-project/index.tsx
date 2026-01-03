import { useCreateProject } from './hook';
import { CreateProjectView } from './view';

export function CreateProjectPage() {
	const { createProject, loading, error } = useCreateProject();

	return <CreateProjectView createProject={createProject} loading={loading} error={error} />;
}
