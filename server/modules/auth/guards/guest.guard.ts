import { isUserLoggedIn } from '$/server/lib/auth';
import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';

export const guestGuard = createMiddleware(async (c: Context, next: Next) => {
	if (isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	await next();
});
