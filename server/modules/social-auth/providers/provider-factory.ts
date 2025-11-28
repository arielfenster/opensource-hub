import { buildOauthCallbackUrl } from '$/server/lib/social-auth';
import { env } from '$/shared/env';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { GithubProvider } from './github.provider';
import { GitlabProvider } from './gitlab.provider';
import { GoogleProvider } from './google.provider';
import type { OauthProvider } from './oauth-provider';

class OauthProviderFactory {
	private providers: Map<SocialAuthProvider, OauthProvider>;

	constructor() {
		this.providers = new Map();

		this.providers.set(
			'google',
			new GoogleProvider(
				env.SOCIAL_AUTH.GOOGLE_CLIENT_ID,
				env.SOCIAL_AUTH.GOOGLE_CLIENT_SECRET,
				buildOauthCallbackUrl('google'),
			),
		);
		this.providers.set(
			'github',
			new GithubProvider(
				env.SOCIAL_AUTH.GITHUB_CLIENT_ID,
				env.SOCIAL_AUTH.GITHUB_CLIENT_SECRET,
				buildOauthCallbackUrl('github'),
			),
		);
		this.providers.set(
			'gitlab',
			new GitlabProvider(
				env.SOCIAL_AUTH.GITLAB_CLIENT_ID,
				env.SOCIAL_AUTH.GITLAB_CLIENT_SECRET,
				buildOauthCallbackUrl('gitlab'),
			),
		);
	}

	getProvider(provider: SocialAuthProvider): OauthProvider {
		const oauthProvider = this.providers.get(provider);
		if (!oauthProvider) {
			throw new Error(`OAuth provider for ${provider} not found`);
		}
		return oauthProvider;
	}
}

export const oauthProviderFactory = new OauthProviderFactory();
