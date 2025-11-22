import type { SocialAuthProvider } from '$/shared/types/auth';
import { encryptionService } from '../auth/encryption.service';
import { usersService } from '../users/users.service';
import type { JwtPayload } from './social-auth.handler';

type ParsedJwtPayload = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	imageUrl?: string;
};

class SocialAuthService {
	async getSocialAccount(data: JwtPayload, provider: SocialAuthProvider) {
		const parsedData = this.parseJwtPayload(data);

		let user = await this.findUserBySocialId(parsedData.id, provider);
		if (user) {
			console.debug(`Found existing ${provider} user by id: `, user.id);
			return user;
		}

		user = await usersService.findUser({ email: parsedData.email });
		if (user) {
			console.debug(`Found existing ${provider} user by email: `, user.id);
			const socialId = this.buildSocialAuthId(provider);
			return usersService.updateSocialAuthInfo(user.id, { [socialId]: parsedData.id });
		}

		console.debug(`Social auth user was not found by provider id or email. Creating new user.`);

		return usersService.createSocialAuthUser({
			firstName: parsedData.firstName,
			lastName: parsedData.lastName,
			email: parsedData.email,
			imageUrl: parsedData.imageUrl,
			[this.buildSocialAuthId(provider)]: parsedData.id,
		});
	}

	private parseJwtPayload(payload: JwtPayload): ParsedJwtPayload {
		return {
			id: encryptionService.encrypt(payload.sub),
			firstName: payload.given_name,
			lastName: payload.family_name,
			email: payload.email,
			imageUrl: payload.picture,
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
