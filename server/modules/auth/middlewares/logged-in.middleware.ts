import { isUserLoggedIn } from '$/server/lib/auth';
import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export const loggedInMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (!isUserLoggedIn(c)) {
		return new HTTPException(401, {
			message: 'Unauthorized access. Please log in.',
		}).getResponse();
	}

	await next();
});
