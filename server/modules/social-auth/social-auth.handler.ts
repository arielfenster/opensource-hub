import { env } from '$/shared/env';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { GitHub, GitLab, Google, generateCodeVerifier, generateState } from 'arctic';
import type { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import type { CookieOptions } from 'hono/utils/cookie';

class SocialAuthHandler {
	async connectWithGoogle(c: Context) {
		const callbackUrl = this.getCallbackUrl(c);

		const google = new Google(
			env.SOCIAL_AUTH.GOOGLE_CLIENT_ID,
			env.SOCIAL_AUTH.GOOGLE_CLIENT_SECRET,
			callbackUrl,
		);

		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		this.setOauthCookies(c, 'google', state, codeVerifier);

		return google.createAuthorizationURL(state, codeVerifier, ['profile']).toString();
	}

	async connectWithGithub(c: Context) {
		const callbackUrl = this.getCallbackUrl(c);

		const github = new GitHub(
			env.SOCIAL_AUTH.GITHUB_CLIENT_ID,
			env.SOCIAL_AUTH.GITHUB_CLIENT_SECRET,
			callbackUrl,
		);

		const state = generateState();
		this.setOauthCookies(c, 'github', state);

		return github.createAuthorizationURL(state, ['read:user']).toString();
	}

	async connectWithGitlab(c: Context) {
		const callbackUrl = this.getCallbackUrl(c);

		const gitlab = new GitLab(
			'',
			env.SOCIAL_AUTH.GITLAB_CLIENT_ID,
			env.SOCIAL_AUTH.GITLAB_CLIENT_SECRET,
			callbackUrl,
		);

		const state = generateState();
		this.setOauthCookies(c, 'gitlab', state);

		return gitlab.createAuthorizationURL(state, ['read_user']).toString();
	}

	private getCallbackUrl(c: Context) {
		const requestUrl = c.req.url;

		return `${requestUrl}/callback`;
	}

	private setOauthCookies(
		c: Context,
		provider: SocialAuthProvider,
		state: string,
		codeVerifier?: string,
	) {
		const cookieOptions: CookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 10, // 10 minutes
			path: '/',
		};

		setCookie(c, `${provider}_oauth_state`, state, cookieOptions);

		if (codeVerifier) {
			setCookie(c, `${provider}_oauth_code_verifier`, codeVerifier, cookieOptions);
		}
	}
}

export const socialAuthHandler = new SocialAuthHandler();
