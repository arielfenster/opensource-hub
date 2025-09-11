import type { Technology, TechnologyGroup } from '$/server/database/schemas';

export type TechnologyGroupData = TechnologyGroup & { technologies: Technology[] };
