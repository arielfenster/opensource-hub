import type { TechnologyData, TechnologyGroupData } from '$/shared/types/technologies';
import type { TechnologyOption } from './types';

export function convertTechnologyGroupsToOptionsArray(
	data: TechnologyGroupData[],
): TechnologyOption[] {
	return data
		.map((techGroup) => {
			return techGroup.technologies.map((tech) => ({
				id: tech.id,
				value: tech.name,
				groupName: techGroup.name,
			}));
		})
		.flat();
}

export function convertTechnologyDataToOptionItem(technology: TechnologyData): TechnologyOption {
	return {
		id: technology.id,
		value: technology.name,
		groupName: technology.group.name,
	};
}
