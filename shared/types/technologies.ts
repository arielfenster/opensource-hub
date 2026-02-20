export const technologyGroupNameValues = [
	'Languages',
	'Frameworks',
	'Databases',
	'Infra',
	'Services',
	'Developer Tools',
	'Clouds',
] as const;
export type TechnologyGroupName = (typeof technologyGroupNameValues)[number];

export type Technology = { id: string; name: string };
export type TechnologyGroup = {
	id: string;
	name: TechnologyGroupName;
};

export type TechnologyData = Technology & { group: TechnologyGroup };
