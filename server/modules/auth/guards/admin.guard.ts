import { createMiddleware } from 'hono/factory';
import { adminRule } from '../rules/admin.rule';

export const adminGuard = createMiddleware(async (c, next) => {
	if (!(await adminRule(c))) {
		return c.redirect('/');
	}

	await next();
});
