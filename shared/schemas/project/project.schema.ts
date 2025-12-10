import { projectStatusValues, projectTeamPositionValues } from '$/shared/types/projects';
import z from 'zod';

export const projectSchema = z.object({
	name: z.string().min(2).max(40),
	shortDescription: z.string().min(2).max(100),
	longDescription: z.string().min(2).max(1000),
	status: z.enum(projectStatusValues).optional().default('Created'),
	keyFeatures: z.string().array().optional(),
	teamPositions: z.array(z.enum(projectTeamPositionValues)).optional(),
	ownerId: () => z.nanoid(),
});
