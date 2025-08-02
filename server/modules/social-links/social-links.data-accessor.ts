import { db } from '$/server/database/db';
import { socialLinks } from '$/server/database/schemas';
import type { UpdateSocialLinkInput } from '$/shared/schemas/user/social-links.schema';
import { eq } from 'drizzle-orm';
import { DataAccessor } from '../dal/data-accessor';

export class SocialLinksDataAccessor extends DataAccessor {
	async getSocialLinksForUser(userId: string) {
		return this.db.query.socialLinks.findMany({
			where: (fields, { eq }) => eq(fields.userId, userId),
		});
	}

	async updateSocialLinks(data: UpdateSocialLinkInput[]) {
		const updates = data.map((socialLink) => {
			return this.db
				.update(socialLinks)
				.set({
					type: socialLink.type,
					url: socialLink.url,
				})
				.where(eq(socialLinks.id, socialLink.id!))
				.returning();
		});

		const results = await Promise.all(updates);
		return results.flat();
	}
}

export const socialLinksDataAccessor = new SocialLinksDataAccessor(db);
