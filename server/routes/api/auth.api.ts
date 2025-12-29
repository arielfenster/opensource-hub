import { loginSchema } from '$/shared/schemas/auth/login.schema';
import { signupSchema } from '$/shared/schemas/auth/signup.schema';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { loginHandler } from '../../modules/auth/login.handler';
import { signupHandler } from '../../modules/auth/signup.handler';
import { loggedInMiddleware } from '$/server/modules/auth/middlewares/logged-in.middleware';
import { usersHandler } from '$/server/modules/users/users.handler';
import { guestMiddleware } from '$/server/modules/auth/middlewares/guest.middleware';

export const authRouter = new Hono()
	.post('/login', guestMiddleware, vValidator('json', loginSchema), async (c) => {
		try {
			await loginHandler.loginWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/signup', guestMiddleware, vValidator('json', signupSchema), async (c) => {
		try {
			await signupHandler.signupWithEmailPassword(c);
			return c.redirect('/projects');
		} catch (error) {
			throw new HTTPException(400, { message: 'Incorrect email or password' });
		}
	})
	.post('/logout', loggedInMiddleware, async (c) => {
		try {
			await loginHandler.logoutUser(c);
			return c.redirect('/');
		} catch (error) {
			console.error('Logout error: ', error);
			throw new HTTPException(500, { message: 'Internal server error' });
		}
	})
	.post('/profile', loggedInMiddleware, async (c) => {
		try {
			const user = await usersHandler.getSafeCurrentUser(c);
			return c.json(user);
		} catch (error) {
			throw new HTTPException(500, { message: 'Internal server error' });
		}
	});
