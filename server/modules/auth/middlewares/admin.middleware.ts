import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { adminRule } from '../rules/admin.rule';

export const adminMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (!(await adminRule(c))) {
		return new HTTPException(403, {
			message: 'Forbidden access',
		}).getResponse();
	}

	await next();
});
