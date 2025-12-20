import type { Project } from '$/shared/types/projects';

export type FindProjectParams = Partial<Pick<Project, 'id' | 'slug'>>;
export type FindProjectUniqueIdentifier = keyof FindProjectParams;
