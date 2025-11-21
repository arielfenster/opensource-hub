import { env } from '$/shared/env';
import type { Context } from 'hono';
import { getCookie } from 'hono/cookie';

export function getSessionCookie(c: Context) {
	return getCookie(c, env.AUTH.SESSION_COOKIE_NAME);
}

export function isUserLoggedIn(c: Context) {
	return Boolean(getSessionCookie(c));
}
