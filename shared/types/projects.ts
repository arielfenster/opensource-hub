import {
	teamPositionEnum,
	type Project,
	type ProjectLinks,
	projectStatusEnum,
} from '$/server/database/schemas';
import type { TechnologyData } from './technologies';

export type ProjectDetails = Project & {
	links: ProjectLinks | null;
	technologies: TechnologyData[];
};

export type RecentProject = Pick<
	ProjectDetails,
	'id' | 'name' | 'shortDescription' | 'technologies'
>;

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
export type ProjectTeamPosition = Project['teamPositions'][number];

export const projectStatus = [...projectStatusEnum.enumValues] as const;
export type ProjectStatus = (typeof projectStatus)[number];
