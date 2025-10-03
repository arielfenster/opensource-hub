import { teamPositionEnum, type Project, type ProjectLinks } from '$/server/database/schemas';
import type { TechnologyData } from './technologies';

export type ProjectDetails = Project & {
	links: ProjectLinks;
	technologies: TechnologyData[];
};

export type RecentProject = Pick<
	ProjectDetails,
	'id' | 'name' | 'shortDescription' | 'technologies'
>;

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
export type ProjectTeamPosition = Project['teamPositions'][number];
