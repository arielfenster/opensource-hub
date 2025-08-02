import { loggedInMiddleware } from '$/server/modules/auth/logged-in.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';
import { updatePersonalInfoSchema } from '$/shared/schemas/user/update-personal-info.schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const userRouter = new Hono().post(
	'/update-personal',
	loggedInMiddleware,
	zValidator('json', updatePersonalInfoSchema),
	async (c) => {
		try {
			const user = await usersHandler.updatePersonalInfo(c);
			return c.json(user);
		} catch (error) {
			console.log('error dog: ', error);
			return c.json({ message: 'no bueno' });
		}
	},
);
