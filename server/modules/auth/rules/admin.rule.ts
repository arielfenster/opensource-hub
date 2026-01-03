import type { Context } from 'hono';
import { usersHandler } from '../../users/users.handler';

export async function adminRule(c: Context) {
	const user = await usersHandler.getCurrentUser(c);
	return user?.role === 'Admin';
}
