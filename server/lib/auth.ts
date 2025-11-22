import { env } from '$/shared/env';
import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { sessionService } from '../modules/session/session.service';
import { SESSION_COOKIE_NAME } from '../modules/session/types';
import type { SocialAuthProvider } from '$/shared/types/auth';

export function getSessionCookie(c: Context) {
	return getCookie(c, env.AUTH.SESSION_COOKIE_NAME);
}

export function isUserLoggedIn(c: Context) {
	return Boolean(getSessionCookie(c));
}

export async function createUserSession(c: Context, userId: string) {
	const session = await sessionService.createSessionForUser(userId);

	setCookie(
		c,
		SESSION_COOKIE_NAME,
		session.id,
		sessionService.getSessionCookieOptions(session.expiresAt),
	);

	return session;
}

export function buildOauthStateCookieName(provider: SocialAuthProvider) {
	return `${provider}_oauth_state`;
}

export function buildOauthCodeVerifierCookieName(provider: SocialAuthProvider) {
	return `${provider}_oauth_code_verifier`;
}
