import { loginSchema } from '$/shared/schemas/auth/login.schema';
import { signupSchema } from '$/shared/schemas/auth/signup.schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { loginHandler } from '../../modules/auth/login.handler';
import { signupHandler } from '../../modules/auth/signup.handler';
import { loggedInMiddleware } from '$/server/modules/auth/logged-in.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';

export const authRouter = new Hono()
	.post('/login', zValidator('json', loginSchema), async (c) => {
		try {
			await loginHandler.loginWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/signup', zValidator('json', signupSchema), async (c) => {
		try {
			await signupHandler.signupWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/profile', loggedInMiddleware, async (c) => {
		try {
			const user = await usersHandler.getCurrentUser(c);
			return c.json(user);
		} catch (error) {
			throw new HTTPException(500, { message: 'Internal server error' });
		}
	});
