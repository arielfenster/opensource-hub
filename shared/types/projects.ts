import { type Project, type ProjectLinks } from '$/server/database/schemas';
import type { TechnologyData } from './technologies';

export type ProjectDetails = Project & {
	links: ProjectLinks | null;
	technologies: TechnologyData[];
};

export type RecentProject = Pick<
	ProjectDetails,
	'id' | 'name' | 'shortDescription' | 'technologies'
>;

export const projectStatusValues = ['Created', 'In Progress', 'Finished', 'Aborted'] as const;
export const projectTeamPositionValues = [
	'Backend',
	'Frontend',
	'Fullstack',
	'Devops',
	'QA',
	'Product Manager',
	'UI Developer',
	'UX Developer',
] as const;

export type ProjectStatus = (typeof projectStatusValues)[number];
export type ProjectTeamPosition = (typeof projectTeamPositionValues)[number];
