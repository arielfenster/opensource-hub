import { Hono } from 'hono';

export const searchRouter = new Hono().get('/search', (c) => {
	return c.json({ data: [5, 11, 22] });
});
