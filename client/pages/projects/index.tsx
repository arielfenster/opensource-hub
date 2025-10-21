import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologiesStore } from '$/client/stores/technologies.store';
import type { ProjectTeamPosition } from '$/shared/types/projects';
import { useState } from 'react';
import { ResultsSection } from './components/results-section';
import { SearchSection } from './components/search-section';
import { getFilteredProjects, type SearchFilter } from './service';

// TODO: fix this mess
// maybe bring back container components?
export function ProjectsPage() {
	const { data: projects } = useProjects();

	const { selectedTechnologies } = useTechnologiesStore();
	const [selectedPositions, setSelectedPositions] = useState<ProjectTeamPosition[]>([]);

	function handleApplyFilter(filter: SearchFilter) {
		if (filter.type === 'position') {
			const isPositionAlreadySelected = selectedPositions.some(
				(position) => position === filter.value,
			);
			if (isPositionAlreadySelected) {
				setSelectedPositions((prev) =>
					prev.filter((position) => position !== filter.value),
				);
			} else {
				setSelectedPositions((prev) => [...prev, filter.value]);
			}
		}
	}

	const filteredProjects = getFilteredProjects(projects, selectedTechnologies, selectedPositions);

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<div className='flex flex-col gap-12'>
				<SearchSection onFilter={handleApplyFilter} />
				<ResultsSection projects={filteredProjects} />
			</div>
		</div>
	);
}
