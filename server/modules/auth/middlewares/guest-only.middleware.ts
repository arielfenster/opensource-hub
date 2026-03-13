import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { requireAuthRule } from '../rules/require-auth.rule';

export const guestOnlyMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (requireAuthRule(c)) {
		return new HTTPException(401, {
			message: 'Unauthorized access. Please log out.',
		}).getResponse();
	}

	await next();
});
