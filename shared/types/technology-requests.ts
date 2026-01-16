import type { TechnologyGroupName } from './technologies';

export const technologyRequestStatusValues = ['pending', 'approved', 'rejected'] as const;
export type TechnologyRequestStatus = (typeof technologyRequestStatusValues)[number];

export type TechnologyRequest = {
	id: string;
	name: string;
	group: TechnologyGroupName;
	requestedBy: string;
	status: TechnologyRequestStatus;
	createdAt: string;
	updatedAt: string;
};
