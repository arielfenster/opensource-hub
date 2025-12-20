import {
	chatTypeValues,
	projectManagementTypeValues,
	sourceControlTypeValues,
} from '$/shared/types/project-links';
import * as v from 'valibot';
import { urlSchema } from '../common/url.schema';

export const projectLinksSchema = v.object({
	id: v.optional(v.string()),
	projectLink: v.union([urlSchema, v.literal('')]),
	sourceControlLink: v.union([urlSchema, v.literal('')]),
	sourceControlType: v.optional(v.picklist(sourceControlTypeValues)),
	chatLink: v.union([urlSchema, v.literal('')]),
	chatType: v.optional(v.picklist(chatTypeValues)),
	projectManagementLink: v.union([urlSchema, v.literal('')]),
	projectManagementType: v.optional(v.picklist(projectManagementTypeValues)),
	projectId: v.optional(v.string()),
	createdAt: v.optional(v.date()),
	updatedAt: v.optional(v.date()),
});

export type ProjectLinksInput = v.InferInput<typeof projectLinksSchema>;
