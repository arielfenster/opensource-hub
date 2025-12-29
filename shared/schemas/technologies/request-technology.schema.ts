import { technologyGroupNameValues } from '$/shared/types/technologies';
import * as v from 'valibot';

export const MAX_COMMENT_LENGTH = 200;

export const requestTechnologySchema = v.object({
	name: v.pipe(v.string(), v.minLength(2), v.maxLength(50)),
	group: v.picklist(technologyGroupNameValues),
	comment: v.optional(v.pipe(v.string(), v.maxLength(MAX_COMMENT_LENGTH))),
});

export type RequestTechnologyInput = v.InferInput<typeof requestTechnologySchema>;
