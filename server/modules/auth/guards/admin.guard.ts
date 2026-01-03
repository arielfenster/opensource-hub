import { createMiddleware } from 'hono/factory';
import { usersHandler } from '../../users/users.handler';

export const adminGuard = createMiddleware(async (c, next) => {
	const user = await usersHandler.getCurrentUser(c);
	const isUserAdmin = user?.role === 'Admin';

	if (!isUserAdmin) {
		return c.redirect('/');
	}

	await next();
});
