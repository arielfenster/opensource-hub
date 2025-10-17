import { socialLinks } from '$/server/database/schemas';
import { createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { urlSchema } from '../common/url.schema';

// TODO: change the z.union to z.or()
export const updateSocialLinksSchema = createUpdateSchema(socialLinks, {
	url: () => z.union([z.literal(''), urlSchema]),
}).pick({
	id: true,
	url: true,
	type: true,
});

export type UpdateSocialLinkInput = z.infer<typeof updateSocialLinksSchema>;
