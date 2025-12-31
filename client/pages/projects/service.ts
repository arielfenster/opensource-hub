import type { ProjectDetails, ProjectTeamPosition } from '$/shared/types/projects';
import type { TechnologyData } from '$/shared/types/technologies';

// TODO: remove
export type SearchFilterType = 'tech' | 'position';
// TODO: remove
export type SearchFilter =
	| {
			type: 'tech';
			value: TechnologyData;
	  }
	| {
			type: 'position';
			value: ProjectTeamPosition;
	  };

export function getFilteredProjects(
	projects: ProjectDetails[],
	filterTechnologies: TechnologyData[],
	filterPositions: ProjectTeamPosition[],
): ProjectDetails[] {
	return filterByTechStack(filterByPosition(projects, filterPositions), filterTechnologies);
}

function filterByTechStack(
	projects: ProjectDetails[],
	filterTechnologies: TechnologyData[],
): ProjectDetails[] {
	return projects.filter((project) =>
		filterTechnologies.every((filterTech) =>
			project.technologies.find((tech) => tech.name === filterTech.name),
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
