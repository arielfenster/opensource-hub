import { loggedInMiddleware } from '$/server/modules/auth/logged-in.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';
import { updatePersonalInfoSchema } from '$/shared/schemas/user/update-personal-info.schema';
import { updateSecurityInfoSchema } from '$/shared/schemas/user/update-security-info.schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const userRouter = new Hono()
	.post(
		'/update-personal',
		loggedInMiddleware,
		zValidator('json', updatePersonalInfoSchema),
		async (c) => {
			try {
				const user = await usersHandler.updatePersonalInfo(c);
				return c.json(user);
			} catch (error) {
				console.error('Error updating personal info:', error);
				throw error;
			}
		},
	)
	.post(
		'/update-security',
		loggedInMiddleware,
		zValidator('json', updateSecurityInfoSchema),
		async (c) => {
			try {
				await usersHandler.updateSecurityInfo(c);
				return c.body(null, 204);
			} catch (error) {
				console.error('Error updating security info:', error);
				throw error;
			}
		},
	);
