import { projectStatusValues, projectTeamPositionValues } from '$/shared/types/projects';
import * as v from 'valibot';

export const projectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(2), v.maxLength(40)),
	shortDescription: v.pipe(v.string(), v.minLength(2), v.maxLength(100)),
	longDescription: v.pipe(v.string(), v.minLength(2), v.maxLength(1000)),
	status: v.optional(v.picklist(projectStatusValues), 'Created'),
	keyFeatures: v.optional(v.array(v.string())),
	teamPositions: v.optional(v.array(v.picklist(projectTeamPositionValues))),
	ownerId: v.pipe(v.string(), v.nanoid()),
});
