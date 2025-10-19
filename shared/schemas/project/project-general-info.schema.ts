import { z } from 'zod';
import { projectSchema } from './project.schema';

export const projectGeneralInfoSchema = projectSchema
	.pick({
		name: true,
		shortDescription: true,
		longDescription: true,
		// keyFeatures: true,
		teamPositions: true,
		// ownerId: true,
	})
	.extend({
		keyFeatures: z.array(z.object({ feature: z.string() })),
	});

export type ProjectGeneralInfoInput = z.infer<typeof projectGeneralInfoSchema>;
