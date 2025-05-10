import { Hono } from 'hono';
import { authRouter } from './auth.api';
// import { projectsRouter } from './projects.api';

export const apiRouter = new Hono().route('/auth', authRouter);

export type ApiRoutes = typeof apiRouter;
