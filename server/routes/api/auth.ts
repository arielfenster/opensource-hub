import { Hono } from 'hono';

export const authRouter = new Hono()
	.post('/login', async (c) => {
		return c.json({ title: 'meow' });
	})
	.post('/signup', async (c) => {
		return c.text('banana');
	});
