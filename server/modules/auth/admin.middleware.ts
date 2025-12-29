import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { usersHandler } from '../users/users.handler';

export const adminMiddleware = createMiddleware(async (c: Context, next: Next) => {
	const user = await usersHandler.getCurrentUser(c);
	const isUserAdmin = user?.role === 'Admin';

	if (!isUserAdmin) {
		return new HTTPException(403, {
			message: 'Forbidden access',
		}).getResponse();
	}

	await next();
});
