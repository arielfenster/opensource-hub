import { type Project, teamPositionEnum } from '$/server/database/schemas';

export type RecentProject = Pick<Project, 'id' | 'name' | 'tags' | 'shortDescription'>;

export const projectTeamPositions = [...teamPositionEnum.enumValues] as const;
