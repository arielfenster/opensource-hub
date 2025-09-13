import type { technologyGroupNames } from '$/shared/types/technologies';

export type TechnologyName = (typeof technologyGroupNames)[number];

export type TechnologyOption = {
	id: string;
	value: string;
	groupName: TechnologyName;
};
