import {
	chatTypeValues,
	projectManagementTypeValues,
	sourceControlTypeValues,
} from '$/shared/types/project-links';
import { z } from 'zod';
import { urlSchema } from '../common/url.schema';

export const projectLinksSchema = z.object({
	id: z.string().optional(),
	projectLink: urlSchema.or(z.literal('')),
	sourceControlLink: urlSchema.or(z.literal('')),
	sourceControlType: z.enum(sourceControlTypeValues).optional(),
	chatLink: urlSchema.or(z.literal('')),
	chatType: z.enum(chatTypeValues).optional(),
	projectManagementLink: urlSchema.or(z.literal('')),
	projectManagementType: z.enum(projectManagementTypeValues).optional(),
	projectId: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type ProjectLinksInput = z.infer<typeof projectLinksSchema>;
