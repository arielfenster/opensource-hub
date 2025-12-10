import { socialLinkTypeValues } from '$/shared/types/users';
import { z } from 'zod';
import { urlSchema } from '../common/url.schema';

export const socialLinkSchema = z.object({
	id: z.string().optional(),
	url: urlSchema,
	type: z.enum(socialLinkTypeValues),
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
