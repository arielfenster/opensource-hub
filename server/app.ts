import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { STATIC_DIR } from '../shared/constants';
import { apiRouter, type ApiRoutes } from './routes/api/index.api';
import { pagesRouter } from './routes/pages/index.ssr';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.route('/', pagesRouter);
app.route('/api', apiRouter);
app.use(`/${STATIC_DIR}/*`, serveStatic({ root: './' }));

app.onError((err, c) => {
	const defaultResponse = new HTTPException(500, {
		message: 'Something went wrong. Please try again later.',
	}).getResponse();

	console.error('An error occurred: ', err);
	return err instanceof HTTPException ? err.getResponse() : defaultResponse;
});

export { app, type ApiRoutes };
