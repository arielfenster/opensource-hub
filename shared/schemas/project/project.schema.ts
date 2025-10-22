import { projects } from '$/server/database/schemas';
import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';

export const projectSchema = createSelectSchema(projects, {
	name: (schema) => schema.min(2).max(40),
	shortDescription: (schema) => schema.min(2).max(100),
	longDescription: (schema) => schema.min(2).max(1000),
	status: (schema) => schema.optional().default('Created'),
	keyFeatures: (schema) => schema.optional(),
	teamPositions: (schema) => schema.optional(),
	ownerId: () => z.nanoid(),
});
