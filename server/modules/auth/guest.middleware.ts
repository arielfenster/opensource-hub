import { isUserLoggedIn } from '$/server/lib/auth';
import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export const guestMiddleware = createMiddleware(async (c: Context, next: Next) => {
	if (isUserLoggedIn(c)) {
		return new HTTPException(401, {
			message: 'Unauthorized access. Please log out.',
		}).getResponse();
	}

	await next();
});
