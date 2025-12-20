export const sourceControlTypeValues = ['Github', 'Gitlab'] as const;
export const chatTypeValues = ['Slack', 'Discord'] as const;
export const projectManagementTypeValues = ['Jira', 'Trello'] as const;

export type SourceControlType = (typeof sourceControlTypeValues)[number];
export type ChatType = (typeof chatTypeValues)[number];
export type ProjectManagementType = (typeof projectManagementTypeValues)[number];

export type ProjectLinks = {
	id: string;
	projectLink: string | null;
	sourceControlType: SourceControlType | null;
	sourceControlLink: string | null;
	chatType: ChatType | null;
	chatLink: string | null;
	projectManagementType: ProjectManagementType | null;
	projectManagementLink: string | null;
	projectId: string;
	createdAt: Date;
	updatedAt: Date;
};
