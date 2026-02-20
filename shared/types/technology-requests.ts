import type { TechnologyGroup } from './technologies';

export const technologyRequestStatusValues = ['pending', 'approved', 'declined'] as const;
export type TechnologyRequestStatus = (typeof technologyRequestStatusValues)[number];

export type TechnologyRequest = {
	id: string;
	name: string;
	groupId: string;
	requestedBy: string;
	status: TechnologyRequestStatus;
	createdAt: string;
	updatedAt: string;
} & { group: TechnologyGroup };
