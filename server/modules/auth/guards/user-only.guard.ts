import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { requireAuthRule } from '../rules/require-auth.rule';

export const userOnlyGuard = createMiddleware(async (c: Context, next: Next) => {
	if (!requireAuthRule(c)) {
		return c.redirect('/');
	}

	await next();
});
