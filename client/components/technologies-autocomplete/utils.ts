import type { TechnologyGroupData } from '$/shared/types/technologies';
import type { TechnologyOption } from './types';

export function convertTechnologiesDataToOptionsArray(
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
