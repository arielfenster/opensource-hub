import { Hono } from 'hono';
import { authRouter } from './auth';
import { searchRouter } from './search';

export const apiRouter = new Hono().route('/auth', authRouter).route('/', searchRouter);

export type ApiRoutes = typeof apiRouter;
