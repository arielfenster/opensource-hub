import { Hono } from 'hono';

export const adminRouter = new Hono()
	.get('/tech-requests', async (c) => {
		return c.text(`hello from /tech-requests`);
	})
	.get('/users', async (c) => {
		return c.text(`hello from /users`);
	})
	.get('/settings', async (c) => {
		return c.text(`hello from /settings`);
	});
