import type { Project } from '$/server/database/schemas';

export type FindProjectParams = Partial<Pick<Project, 'id' | 'slug'>>;
export type FindProjectUniqueIdentifier = keyof FindProjectParams;
