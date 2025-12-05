import { socialLinks } from '$/server/database/schemas';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { urlSchema } from '../common/url.schema';

export const socialLinkSchema = createInsertSchema(socialLinks, {
	url: () => urlSchema,
}).pick({
	id: true,
	url: true,
	type: true,
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
