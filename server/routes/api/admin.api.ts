import { technologiesHandler } from '$/server/modules/technologies/technologies.handler';
import { updateTechnologyRequestSchema } from '$/shared/schemas/technologies/update-technology-request.schema';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const adminRouter = new Hono()
	.get('/technology-requests', async (c) => {
		try {
			const requests = await technologiesHandler.getTechnologyRequests();
			return c.json(requests);
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	})
	.patch(
		'/technology-requests/:id',
		vValidator('json', updateTechnologyRequestSchema),
		async (c) => {
			try {
				await technologiesHandler.updateTechnologyRequest(c);
				return c.status(200);
			} catch (error) {
				throw new HTTPException(500, {
					message: (error as Error).message,
				});
			}
		},
	)
	.get('/users', async (c) => {
		try {
			return c.json({ message: `hello from /users` });
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	})
	.get('/settings', async (c) => {
		try {
			return c.json({ message: `hello from /settings` });
		} catch (error) {
			throw new HTTPException(500, {
				message: (error as Error).message,
			});
		}
	});
