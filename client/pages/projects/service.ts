import type { TechnologyOption } from '$/client/components/technologies-autocomplete/types';
import type { ProjectTeamPosition, ProjectDetails } from '$/shared/types/projects';

export type SearchFilterType = 'tech' | 'position';
export type SearchFilter =
	| {
			type: 'tech';
			value: TechnologyOption;
	  }
	| {
			type: 'position';
			value: ProjectTeamPosition;
	  };

export function getFilteredProjects(
	projects: ProjectDetails[],
	filterTechnologies: string[],
	filterPositions: ProjectTeamPosition[],
): ProjectDetails[] {
	return filterByTechStack(filterByPosition(projects, filterPositions), filterTechnologies);
}

function filterByTechStack(
	projects: ProjectDetails[],
	filterTechnologies: string[],
): ProjectDetails[] {
	return projects.filter((project) =>
		filterTechnologies.every((filterTech) =>
			project.technologies.find((tech) => tech.name === filterTech),
		),
	);
}

function filterByPosition(
	projects: ProjectDetails[],
	filterPositions: ProjectTeamPosition[],
): ProjectDetails[] {
	return projects.filter((project) =>
		filterPositions.every((filterPosition) => project.teamPositions.includes(filterPosition)),
	);
}
