import { projectLinks } from '$/server/database/schemas';
import { createSelectSchema } from 'drizzle-zod';
import { urlSchema } from '../common/url.schema';
import { z } from 'zod';

export const projectLinksSchema = createSelectSchema(projectLinks, {
	id: (schema) => schema.optional(),
	projectLink: () => urlSchema.or(z.literal('')),
	sourceControlLink: () => urlSchema.or(z.literal('')),
	sourceControlType: (schema) => schema.optional(),
	chatLink: () => urlSchema.or(z.literal('')),
	chatType: (schema) => schema.optional(),
	projectManagementLink: () => urlSchema.or(z.literal('')),
	projectManagementType: (schema) => schema.optional(),
	projectId: (schema) => schema.optional(),
	createdAt: (schema) => schema.optional(),
	updatedAt: (schema) => schema.optional(),
});

export type ProjectLinksInput = z.infer<typeof projectLinksSchema>;
