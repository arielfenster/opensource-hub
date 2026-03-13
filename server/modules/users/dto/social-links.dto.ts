import type { SocialLinkInput } from '$/shared/schemas/user/social-links.schema';
import type { SocialLink } from '$/shared/types/users';

type SocialLinkInputWithId = SocialLinkInput & { id: string };

export type ParsedSocialLinksData = {
	toAdd: SocialLinkInput[];
	toUpdate: SocialLinkInputWithId[];
	toDelete: SocialLinkInputWithId[];
};

export class SocialLinksDTO {
	private constructor(
		public readonly toAdd: ParsedSocialLinksData['toAdd'],
		public readonly toUpdate: ParsedSocialLinksData['toUpdate'],
		public readonly toDelete: ParsedSocialLinksData['toDelete'],
	) {}

	static create(inputSocialLinks: SocialLinkInput[], existingSocialLinks: SocialLink[]) {
		const data: ParsedSocialLinksData = {
			toAdd: [],
			toUpdate: [],
			toDelete: [],
		};

		existingSocialLinks.forEach((link) => {
			const socialLinkToUpdate = inputSocialLinks.find((l) => l.id === link.id);
			if (socialLinkToUpdate) {
				data.toUpdate.push(socialLinkToUpdate as SocialLinkInputWithId);
			} else {
				data.toDelete.push(link as SocialLinkInputWithId);
			}
		});

		inputSocialLinks.forEach((link) => {
			if (link.id) {
				data.toUpdate.push(link as SocialLinkInputWithId);
			} else {
				data.toAdd.push(link);
			}
		});

		return new SocialLinksDTO(data.toAdd, data.toUpdate, data.toDelete);
	}
}
