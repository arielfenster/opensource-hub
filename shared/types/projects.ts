import { teamPositionEnum, type ProjectWithTechnologies } from '$/server/database/schemas';

export type RecentProject = Pick<
	ProjectWithTechnologies,
	'id' | 'name' | 'shortDescription' | 'technologies'
>;

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
