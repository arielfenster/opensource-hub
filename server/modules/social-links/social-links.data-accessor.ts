import { db } from '$/server/database/db';
import { socialLinks } from '$/server/database/schemas';
import { SQL, inArray, sql } from 'drizzle-orm';
import { DataAccessor } from '../dal/data-accessor';
import type { SocialLinksDTO } from '../users/dto/social-links.dto';

export class SocialLinksDataAccessor extends DataAccessor {
	async getSocialLinksForUser(userId: string) {
		return this.db.query.socialLinks.findMany({
			where: (fields, { eq }) => eq(fields.userId, userId),
		});
	}

	async createSocialLinks(userId: string, data: SocialLinksDTO['toAdd']) {
		const links = data.map((socialLink) => ({ ...socialLink, userId }));

		return this.db.insert(socialLinks).values(links).returning().execute();
	}

	async updateSocialLinks(data: SocialLinksDTO['toUpdate']) {
		const ids = data.map((link) => link.id);

		const urlSqlChunks: SQL[] = [];
		const typeSqlChunks: SQL[] = [];

		urlSqlChunks.push(sql`(case`);
		typeSqlChunks.push(sql`(case`);
		data.forEach((link) => {
			urlSqlChunks.push(sql`when ${socialLinks.id} = ${link.id} then ${link.url} `);
			typeSqlChunks.push(
				sql`when ${socialLinks.id} = ${link.id} then ${link.type}::"socialLinkTypeEnum" `,
			);
		});
		urlSqlChunks.push(sql`end)`);
		typeSqlChunks.push(sql`end)`);

		const updateUrlsSql = sql.join(urlSqlChunks, sql.raw(' '));
		const updateTypesSql = sql.join(typeSqlChunks, sql.raw(' '));

		return this.db
			.update(socialLinks)
			.set({ url: updateUrlsSql, type: updateTypesSql })
			.where(inArray(socialLinks.id, ids))
			.returning()
			.execute();
	}

	async deleteSocialLinks(data: SocialLinksDTO['toDelete']) {
		const ids = data.map((link) => link.id);

		return this.db
			.delete(socialLinks)
			.where(inArray(socialLinks.id, ids))
			.returning()
			.execute();
	}
}

export const socialLinksDataAccessor = new SocialLinksDataAccessor(db);
