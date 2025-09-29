import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologies } from '$/client/hooks/useTechnologies';
import { useState } from 'react';
import { ResultsSection } from './results-section';
import { SearchSection } from './search-section';

export function ProjectsPage() {
	const { data: technologies } = useTechnologies();
	const { data: projects, isSuccess } = useProjects();

	const [filteredProjects, setFilteredProjects] = useState(projects);

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<SearchSection technologies={technologies} onFilter={console.log} />
			<ResultsSection projects={filteredProjects} />
		</div>
	);
}
