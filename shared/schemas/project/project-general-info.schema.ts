import * as v from 'valibot';
import { projectSchema } from './project.schema';

export const projectGeneralInfoSchema = v.object({
	...v.pick(projectSchema, [
		'name',
		'shortDescription',
		'longDescription',
		// keyFeatures,
		'teamPositions',
		// ownerId,
	]).entries,
	keyFeatures: v.array(v.object({ feature: v.string() })),
});

export type ProjectGeneralInfoInput = v.InferInput<typeof projectGeneralInfoSchema>;
