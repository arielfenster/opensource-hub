import { Hono } from 'hono';
import { authRouter } from './auth.api';
import { userRouter } from './user.api';

export const apiRouter = new Hono().route('/auth', authRouter).route('/user', userRouter);

export type ApiRoutes = typeof apiRouter;
