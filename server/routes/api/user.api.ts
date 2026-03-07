import { userOnlyMiddleware } from '$/server/modules/auth/middlewares/user-only.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';
import { updatePersonalInfoSchema } from '$/shared/schemas/user/update-personal-info.schema';
import { updateSecurityInfoSchema } from '$/shared/schemas/user/update-security-info.schema';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';

export const userRouter = new Hono()
	.post(
		'/update-personal',
		userOnlyMiddleware,
		vValidator('json', updatePersonalInfoSchema),
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
		userOnlyMiddleware,
		vValidator('json', updateSecurityInfoSchema),
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
