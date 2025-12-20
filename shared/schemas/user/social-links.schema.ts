import { socialLinkTypeValues } from '$/shared/types/users';
import * as v from 'valibot';
import { urlSchema } from '../common/url.schema';

export const socialLinkSchema = v.object({
	id: v.optional(v.string()),
	url: urlSchema,
	type: v.picklist(socialLinkTypeValues),
});

export type SocialLinkInput = v.InferInput<typeof socialLinkSchema>;
