import type { ProjectLinks } from './project-links';
import type { TechnologyData } from './technologies';

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

export type Project = {
	id: string;
	name: string;
	slug: string;
	shortDescription: string;
	longDescription: string;
	status: ProjectStatus;
	keyFeatures: string[];
	teamPositions: ProjectTeamPosition[];
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type ProjectDetails = Project & {
	links: ProjectLinks | null;
	technologies: TechnologyData[];
};
