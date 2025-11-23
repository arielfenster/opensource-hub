import { buildOauthCallbackUrl } from '$/server/lib/social-auth';
import { env } from '$/shared/env';
import { Google, decodeIdToken } from 'arctic';
import type { UserProfile, VerifiedCallbackParams } from '../types';
import type { OauthProvider } from './oauth-provider';

type JwtPayload = {
	sub: string;
	picture?: string;
	given_name: string;
	family_name: string;
	email: string;
};

class GoogleProvider implements OauthProvider {
	private client: Google;

	constructor() {
		this.client = new Google(
			env.SOCIAL_AUTH.GOOGLE_CLIENT_ID,
			env.SOCIAL_AUTH.GOOGLE_CLIENT_SECRET,
			buildOauthCallbackUrl('google'),
		);
	}

	createAuthorizationURL(state: string, codeVerifier: string) {
		return this.client
			.createAuthorizationURL(state, codeVerifier, ['openid', 'profile', 'email'])
			.toString();
	}

	async extractUserProfile(params: VerifiedCallbackParams): Promise<UserProfile> {
		const tokens = await this.client.validateAuthorizationCode(
			params.code,
			params.cookieCodeVerifier!,
		);
		const jwt = decodeIdToken(tokens.idToken()) as JwtPayload;

		return {
			id: jwt.sub,
			firstName: jwt.given_name,
			lastName: jwt.family_name,
			email: jwt.email,
			imageUrl: jwt.picture,
		};
	}
}

export const googleProvider = new GoogleProvider();
