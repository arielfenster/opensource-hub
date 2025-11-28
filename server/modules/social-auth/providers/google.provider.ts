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

export class GoogleProvider implements OauthProvider {
	public readonly requiresCodeVerifier = true;
	private client: Google;

	constructor(clientId: string, clientSecret: string, callbackUrl: string) {
		this.client = new Google(clientId, clientSecret, callbackUrl);
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
