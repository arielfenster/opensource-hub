import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { requireAuthRule } from '../rules/require-auth.rule';

export const userOnlyMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (!requireAuthRule(c)) {
		return new HTTPException(401, {
			message: 'Unauthorized access. Please log in.',
		}).getResponse();
	}

	await next();
});
