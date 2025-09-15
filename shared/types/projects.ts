import { type Project, teamPositionEnum } from '$/server/database/schemas';

export type RecentProject = Pick<Project, 'id' | 'name' | 'shortDescription'>;
export type { ProjectWithTechnologies } from '$/server/database/schemas';

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
