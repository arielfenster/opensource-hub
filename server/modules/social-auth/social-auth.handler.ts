import { createUserSession } from '$/server/lib/auth';
import {
	buildOauthCodeVerifierCookieName,
	buildOauthStateCookieName,
} from '$/server/lib/social-auth';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { OAuth2RequestError, generateCodeVerifier, generateState } from 'arctic';
import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import type { CookieOptions } from 'hono/utils/cookie';
import { oauthProviderFactory } from './providers/provider-factory';
import { socialAuthService } from './social-auth.service';
import type { CallbackParams, VerifiedCallbackParams } from './types';

class SocialAuthHandler {
	async connectWithSocialAuth(c: Context, provider: SocialAuthProvider) {
		const authProvider = oauthProviderFactory.getProvider(provider);

		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		const authUrl = authProvider.createAuthorizationURL(state, codeVerifier);

		this.setOauthCookies(c, provider, state, codeVerifier);

		return authUrl;
	}

	async verifySocialAuthCallback(c: Context, provider: SocialAuthProvider) {
		const authProvider = oauthProviderFactory.getProvider(provider);

		const params = this.extractCallbackParams(c, provider);
		if (!authProvider.requiresCodeVerifier) {
			delete params.cookieCodeVerifier;
		}
		this.verifyCallbackParams(params);

		try {
			const userProfile = await authProvider.extractUserProfile(params);
			const user = await socialAuthService.getSocialAccount(userProfile, provider);
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
