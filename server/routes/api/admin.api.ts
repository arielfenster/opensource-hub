import { technologiesHandler } from '$/server/modules/technologies/technologies.handler';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const adminRouter = new Hono()
	.get('/tech-requests', async (c) => {
		try {
			const requests = await technologiesHandler.getTechnologyRequests();
			return c.json(requests);
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	})
	.get('/users', async (c) => {
		try {
			return c.text(`hello from /users`);
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	})
	.get('/settings', async (c) => {
		try {
			return c.text(`hello from /settings`);
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	});
