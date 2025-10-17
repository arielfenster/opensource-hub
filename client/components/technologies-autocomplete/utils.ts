import type { TechnologyData } from '$/shared/types/technologies';

export type TechnologyOption = TechnologyData & { value: string };

// TODO: remove?
export function convertTechnologyGroupsToOptionsArray(data: TechnologyData[]): TechnologyOption[] {
	return data.map(convertTechnologyDataToOptionItem);
}

// TODO: remove?
export function convertTechnologyDataToOptionItem(technology: TechnologyData): TechnologyOption {
	return {
		...technology,
		value: technology.name,
	};
}
