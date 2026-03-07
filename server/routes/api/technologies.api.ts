import { userOnlyMiddleware } from '$/server/modules/auth/middlewares/user-only.middleware';
import { technologiesHandler } from '$/server/modules/technologies/technologies.handler';
import { requestTechnologySchema } from '$/shared/schemas/technologies/request-technology.schema';
import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';

export const technologiesRouter = new Hono()
	.get('/', async (c) => {
		try {
			const technologies = await technologiesHandler.getAllTechnologies();
			return c.json(technologies);
		} catch (error) {
			console.error('Error fetching technologies:', error);
			throw error;
		}
	})
	.post(
		'/request',
		userOnlyMiddleware,
		vValidator('json', requestTechnologySchema),
		async (c) => {
			try {
				const request = await technologiesHandler.requestNewTechnology(c);
				return c.json(request);
			} catch (error) {
				console.error('Error requesting new technology:', error);
				throw error;
			}
		},
	);
