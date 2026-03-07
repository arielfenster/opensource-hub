import { guestOnlyMiddleware } from '$/server/modules/auth/middlewares/guest-only.middleware';
import { userOnlyMiddleware } from '$/server/modules/auth/middlewares/user-only.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';
import { loginSchema } from '$/shared/schemas/auth/login.schema';
import { signupSchema } from '$/shared/schemas/auth/signup.schema';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { loginHandler } from '../../modules/auth/login.handler';
import { signupHandler } from '../../modules/auth/signup.handler';

export const authRouter = new Hono()
	.post('/login', guestOnlyMiddleware, vValidator('json', loginSchema), async (c) => {
		try {
			await loginHandler.loginWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/signup', guestOnlyMiddleware, vValidator('json', signupSchema), async (c) => {
		try {
			await signupHandler.signupWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/logout', userOnlyMiddleware, async (c) => {
		try {
			await loginHandler.logoutUser(c);
			return c.redirect('/');
		} catch (error) {
			console.error('Logout error: ', error);
			throw new HTTPException(500, { message: 'Internal server error' });
		}
	})
	.post('/profile', userOnlyMiddleware, async (c) => {
		try {
			const user = await usersHandler.getSafeCurrentUser(c);
			return c.json(user);
		} catch (error) {
			throw new HTTPException(500, { message: 'Internal server error' });
		}
	});
