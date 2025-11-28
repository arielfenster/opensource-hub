import { GitLab } from 'arctic';
import type { UserProfile, VerifiedCallbackParams } from '../types';
import type { OauthProvider } from './oauth-provider';

type UserResponse = {
	id: number;
	name: string;
	email: string;
	avatar_url: string;
};

export class GitlabProvider implements OauthProvider {
	public readonly requiresCodeVerifier = false;
	private client: GitLab;

	constructor(clientId: string, clientSecret: string, callbackUrl: string) {
		this.client = new GitLab('https://gitlab.com', clientId, clientSecret, callbackUrl);
	}

	createAuthorizationURL(state: string): string {
		// TODO: change scope
		// it seems that this is the only acceptable scope - other scopes cause errors, even if changing in the app settings in gitlab
		return this.client.createAuthorizationURL(state, ['api']).toString();
	}

	async extractUserProfile(params: VerifiedCallbackParams): Promise<UserProfile> {
		const tokens = await this.client.validateAuthorizationCode(params.code);
		const accessToken = tokens.accessToken();

		const userRequest = await fetch('https://gitlab.com/api/v4/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const userResponse = (await userRequest.json()) as UserResponse;

		return this.buildUserProfile(userResponse);
	}

	private buildUserProfile(userResponse: UserResponse): UserProfile {
		const nameTokens = userResponse.name.split(' ');
		const firstName = nameTokens[0];
		const lastName = nameTokens.slice(1).join(' ');

		return {
			id: userResponse.id.toString(),
			firstName: firstName,
			lastName: lastName,
			email: userResponse.email,
			imageUrl: userResponse.avatar_url,
		};
	}
}
