import { type Technology, type TechnologyGroup } from '$/server/database/schemas';

export type TechnologyGroupData = TechnologyGroup & { technologies: Technology[] };
export type TechnologyData = Technology & { group: TechnologyGroup };

export const technologyGroupNameValues = [
	'languages',
	'frameworks',
	'databases',
	'infra',
	'services',
	'developerTools',
	'clouds',
] as const;
export type TechnologyName = (typeof technologyGroupNameValues)[number];
