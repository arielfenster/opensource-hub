import type { SocialAuthProvider } from '$/shared/types/auth';
import { encryptionService } from '../auth/encryption.service';
import { usersService } from '../users/users.service';
import type { UserProfile } from './types';

class SocialAuthService {
	async getSocialAccount(profile: UserProfile, provider: SocialAuthProvider) {
		const parsedProfile = this.parseProfile(profile);

		let user = await this.findUserBySocialId(parsedProfile.id, provider);
		if (user) {
			console.debug(`Found existing ${provider} user by id: `, user.id);
			return user;
		}

		user = await usersService.findUser({ email: parsedProfile.email });
		if (user) {
			console.debug(`Found existing ${provider} user by email: `, user.id);
			const socialId = this.buildSocialAuthId(provider);
			return usersService.updateSocialAuthInfo(user.id, { [socialId]: parsedProfile.id });
		}

		console.debug(`Social auth user was not found by provider id or email. Creating new user.`);

		return usersService.createSocialAuthUser({
			firstName: parsedProfile.firstName,
			lastName: parsedProfile.lastName,
			email: parsedProfile.email,
			imageUrl: parsedProfile.imageUrl,
			[this.buildSocialAuthId(provider)]: parsedProfile.id,
		});
	}

	private parseProfile(profile: UserProfile): UserProfile {
		return {
			...profile,
			id: encryptionService.encrypt(profile.id),
		};
	}

	private async findUserBySocialId(id: string, provider: SocialAuthProvider) {
		const socialId = this.buildSocialAuthId(provider);
		return usersService.findUser({ [socialId]: id });
	}

	private buildSocialAuthId(provider: SocialAuthProvider) {
		return `${provider}Id` as `${SocialAuthProvider}Id`;
	}
}

export const socialAuthService = new SocialAuthService();
