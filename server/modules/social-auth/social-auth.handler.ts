import {
	buildOauthCodeVerifierCookieName,
	buildOauthStateCookieName,
	createUserSession,
} from '$/server/lib/auth';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { OAuth2RequestError, decodeIdToken, generateCodeVerifier, generateState } from 'arctic';
import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import type { CookieOptions } from 'hono/utils/cookie';
import { github, google } from './social-auth.providers';
import { socialAuthService } from './social-auth.service';

export type JwtPayload = {
	sub: string;
	picture?: string;
	given_name: string;
	family_name: string;
	email: string;
};

type CallbackParams = {
	code: string | null;
	state: string | null;
	cookieState?: string;
	cookieCodeVerifier?: string;
};

type VerifiedCallbackParams = {
	[Key in keyof CallbackParams]-?: string;
};

class SocialAuthHandler {
	async connectWithGoogle(c: Context) {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		this.setOauthCookies(c, 'google', state, codeVerifier);

		return google
			.createAuthorizationURL(state, codeVerifier, ['openid', 'profile', 'email'])
			.toString();
	}

	async connectWithGithub(c: Context) {
		const state = generateState();
		this.setOauthCookies(c, 'github', state);

		return github.createAuthorizationURL(state, ['user:email']).toString();
	}

	// async connectWithGitlab(c: Context) {
	// 	const callbackUrl = this.getCallbackUrl(c);

	// 	const gitlab = new GitLab(
	// 		'',
	// 		env.SOCIAL_AUTH.GITLAB_CLIENT_ID,
	// 		env.SOCIAL_AUTH.GITLAB_CLIENT_SECRET,
	// 		callbackUrl,
	// 	);

	// 	const state = generateState();
	// 	this.setOauthCookies(c, 'gitlab', state);

	// 	return gitlab.createAuthorizationURL(state, ['read_user']).toString();
	// }

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

		setCookie(c, buildOauthStateCookieName(provider), state, cookieOptions);

		if (codeVerifier) {
			setCookie(c, buildOauthCodeVerifierCookieName(provider), codeVerifier, cookieOptions);
		}
	}

	async verifyGoogleCallback(c: Context) {
		const params = this.extractCallbackParams(c, 'google');
		this.verifyCallbackParams(params);

		try {
			const tokens = await google.validateAuthorizationCode(
				params.code,
				params.cookieCodeVerifier!,
			);
			const jwt = decodeIdToken(tokens.idToken()) as JwtPayload;
			const user = await socialAuthService.getSocialAccount(jwt, 'google');
			await createUserSession(c, user.id);
			return user;
		} catch (error) {
			if (error instanceof OAuth2RequestError) {
				throw new HTTPException(400, { cause: error.cause, message: error.message });
			}

			const e = error as Error;
			throw new HTTPException(500, { message: e.message });
		}
	}

	async verifyGithubCallback(c: Context) {
		const { code, state, cookieState } = this.extractCallbackParams(c, 'github');
		this.verifyCallbackParams({ code, state, cookieState });

		try {
			const tokens = await github.validateAuthorizationCode(code!);
			const jwt = decodeIdToken(tokens.idToken()) as JwtPayload;
			const user = await socialAuthService.getSocialAccount(jwt, 'github');
			await createUserSession(c, user.id);
			return user;
		} catch (error) {
			if (error instanceof OAuth2RequestError) {
				throw new HTTPException(400, { cause: error.cause, message: error.message });
			}

			const e = error as Error;
			throw new HTTPException(500, { message: e.message });
		}
	}

	private extractCallbackParams(c: Context, provider: SocialAuthProvider): CallbackParams {
		const url = new URL(c.req.url);

		const code = url.searchParams.get('code');
		const state = url.searchParams.get('state');
		const cookieState = getCookie(c, buildOauthStateCookieName(provider));
		const cookieCodeVerifier = getCookie(c, buildOauthCodeVerifierCookieName(provider));

		return {
			code,
			state,
			cookieState,
			cookieCodeVerifier,
		};
	}

	private verifyCallbackParams(params: CallbackParams): asserts params is VerifiedCallbackParams {
		for (const value of Object.values(params)) {
			if (!value) {
				throw new HTTPException(400, { message: 'Invalid OAuth callback parameters' });
			}
		}
		if (params.state !== params.cookieState) {
			throw new HTTPException(400, { message: 'Invalid OAuth state' });
		}
	}
}

export const socialAuthHandler = new SocialAuthHandler();
