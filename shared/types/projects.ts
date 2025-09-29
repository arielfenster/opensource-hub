import { teamPositionEnum, type Project } from '$/server/database/schemas';
import type { TechnologyData } from './technologies';

export type ProjectWithTechnologies = Project & {
	technologies: TechnologyData[];
};

export type RecentProject = Pick<
	ProjectWithTechnologies,
	'id' | 'name' | 'shortDescription' | 'technologies'
>;

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
