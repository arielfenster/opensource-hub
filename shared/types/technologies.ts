export const technologyGroupNameValues = [
	'languages',
	'frameworks',
	'databases',
	'infra',
	'services',
	'developerTools',
	'clouds',
] as const;
export type TechnologyGroupName = (typeof technologyGroupNameValues)[number];

type Technology = { id: string; name: string; groupId: string };
type TechnologyGroup = {
	id: string;
	name: TechnologyGroupName;
};

export type TechnologyData = Technology & { group: TechnologyGroup };
