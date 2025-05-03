import { loginSchema } from '$/shared/schemas/auth/login.schema';
import { signupSchema } from '$/shared/schemas/auth/signup.schema';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loginHandler } from '../../modules/auth/login.handler';
import { signupHandler } from '../../modules/auth/signup.handler';

export const authRouter = new Hono()
	.post('/login', zValidator('json', loginSchema), async (c) => {
		await loginHandler.loginWithEmailPassword(c);
		return c.redirect('/projects');
	})
	.post('/signup', zValidator('json', signupSchema), async (c) => {
		await signupHandler.signupWithEmailPassword(c);
		return c.redirect('/projects');
	});
