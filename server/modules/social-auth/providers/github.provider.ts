import { buildOauthCallbackUrl } from '$/server/lib/social-auth';
import { env } from '$/shared/env';
import { GitHub } from 'arctic';
import type { OauthProvider } from './oauth-provider';
import type { VerifiedCallbackParams, UserProfile } from '../types';

type UserProfileResponse = {
	id: number;
	avatar_url: string;
	name: string;
};

type UserEmailResponse = Array<{
	email: string;
	primary: boolean;
	verified: boolean;
}>;

class GithubProvider implements OauthProvider {
	private client: GitHub;

	constructor() {
		this.client = new GitHub(
			env.SOCIAL_AUTH.GITHUB_CLIENT_ID,
			env.SOCIAL_AUTH.GITHUB_CLIENT_SECRET,
			buildOauthCallbackUrl('github'),
		);
	}

	createAuthorizationURL(state: string): string {
		return this.client.createAuthorizationURL(state, ['user:email']).toString();
	}

	async extractUserProfile(params: VerifiedCallbackParams): Promise<UserProfile> {
		const tokens = await this.client.validateAuthorizationCode(params.code);
		const accessToken = tokens.accessToken();

		const userRequest = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const userProfileResponse = (await userRequest.json()) as UserProfileResponse;

		const emailRequest = await fetch('https://api.github.com/user/emails', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const emailResponse = (await emailRequest.json()) as UserEmailResponse;

		return this.buildUserProfile(userProfileResponse, emailResponse);
	}

	private buildUserProfile(
		userProfileResponse: UserProfileResponse,
		emailResponse: UserEmailResponse,
	): UserProfile {
		const primaryEmail = emailResponse.find((email) => email.primary && email.verified);

		const nameTokens = userProfileResponse.name ? userProfileResponse.name.split(' ') : [];
		const firstName = nameTokens.length > 0 ? nameTokens[0] : '';
		const lastName = nameTokens.length > 1 ? nameTokens.slice(1).join(' ') : '';

		return {
			id: userProfileResponse.id.toString(),
			firstName: firstName,
			lastName: lastName,
			email: primaryEmail ? primaryEmail.email : '',
			imageUrl: userProfileResponse.avatar_url,
		};
	}
}

export const githubProvider = new GithubProvider();
