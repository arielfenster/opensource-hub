import {
	technologyGroupNameEnum,
	type Technology,
	type TechnologyGroup,
} from '$/server/database/schemas';

export type TechnologyGroupData = TechnologyGroup & { technologies: Technology[] };
export type TechnologyData = Technology & { group: TechnologyGroup };

export const technologyGroupNames = [...technologyGroupNameEnum.enumValues] as const;
