import { serveStatic } from 'hono/bun';
import { Hono } from 'hono';
import { STATIC_DIR } from '../shared/constants';
import { apiRouter, type ApiRoutes } from './routes/api';
import { pagesRouter } from './routes/pages';

const app = new Hono();

app.route('/', pagesRouter);
app.route('/api', apiRouter);
app.use(`/${STATIC_DIR}/*`, serveStatic({ root: '../' }));

export { app, type ApiRoutes };
