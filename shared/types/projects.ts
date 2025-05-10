import type { Project } from '$/server/database/schemas';

export type RecentProject = Pick<Project, 'id' | 'name' | 'tags' | 'shortDescription'>;
