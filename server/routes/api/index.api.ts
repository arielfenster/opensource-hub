import { Hono } from 'hono';
import { authRouter } from './auth.api';
import { userRouter } from './user.api';
import { technologiesRouter } from './technologies.api';

export const apiRouter = new Hono()
	.route('/auth', authRouter)
	.route('/user', userRouter)
	.route('/technologies', technologiesRouter);

export type ApiRoutes = typeof apiRouter;
