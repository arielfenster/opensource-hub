import { useProjects } from '$/client/hooks/useProjects';
import { useTechnologies } from '$/client/hooks/useTechnologies';
import type { ProjectTeamPosition } from '$/shared/types/projects';
import { useState } from 'react';
import { ResultsSection } from './components/results-section';
import { SearchSection } from './components/search-section';
import { getFilteredProjects, type SearchFilter } from './service';

export function ProjectsPage() {
	const { data: technologies } = useTechnologies();
	const { data: projects } = useProjects();

	const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
	const [selectedPositions, setSelectedPositions] = useState<ProjectTeamPosition[]>([]);

	function handleApplyFilter(filter: SearchFilter) {
		if (filter.type === 'tech') {
			const isTechnologyAlreadySelected = selectedTechnologies.some(
				(tech) => tech === filter.value.value,
			);
			if (isTechnologyAlreadySelected) {
				setSelectedTechnologies((prev) =>
					prev.filter((tech) => tech !== filter.value.value),
				);
			} else {
				setSelectedTechnologies((prev) => [...prev, filter.value.value]);
			}
			return;
		}

		const isPositionAlreadySelected = selectedPositions.some(
			(position) => position === filter.value,
		);
		if (isPositionAlreadySelected) {
			setSelectedPositions((prev) => prev.filter((position) => position !== filter.value));
		} else {
			setSelectedPositions((prev) => [...prev, filter.value]);
		}
	}

	const filteredProjects = getFilteredProjects(
		projects as any,
		selectedTechnologies,
		selectedPositions,
	);

	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<div className='flex flex-col gap-12'>
				<SearchSection technologies={technologies} onFilter={handleApplyFilter} />
				<ResultsSection projects={filteredProjects} />
			</div>
		</div>
	);
}
