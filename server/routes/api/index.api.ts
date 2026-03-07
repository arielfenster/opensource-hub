import { Hono } from 'hono';
import { authRouter } from './auth.api';
import { userRouter } from './user.api';
import { technologiesRouter } from './technologies.api';
import { projectsRouter } from './projects.api';
import { socialAuthRouter } from './social-auth.api';
import { adminRouter } from './admin.api';

export const apiRouter = new Hono()
	.route('/auth', authRouter)
	.route('/user', userRouter)
	.route('/projects', projectsRouter)
	.route('/technologies', technologiesRouter)
	.route('/social-auth', socialAuthRouter)
	.route('/admin', adminRouter);

export type ApiRoutes = typeof apiRouter;
