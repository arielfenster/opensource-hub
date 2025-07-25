import { socialLinkTypeEnum, socialLinks } from '$/server/database/schemas';
import { createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { urlSchema } from '../common/url.schema';

export const updateSocialLinksSchema = createUpdateSchema(socialLinks, {
	url: () => z.union([z.literal(''), urlSchema]),
	type: () => z.enum(socialLinkTypeEnum.enumValues),
});

export type SocialLink = z.infer<typeof updateSocialLinksSchema>;
