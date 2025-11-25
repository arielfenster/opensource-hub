import { env } from '$/shared/env';
import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { sessionService } from '../modules/session/session.service';
import { SESSION_COOKIE_NAME } from '../modules/session/types';
import {
	buildOauthCodeVerifierCookieName,
	buildOauthStateCookieName,
	getSocialAuthProviders,
} from './social-auth';

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

	getSocialAuthProviders().forEach((provider) => {
		deleteCookie(c, buildOauthStateCookieName(provider));
		deleteCookie(c, buildOauthCodeVerifierCookieName(provider));
	});

	return session;
}
