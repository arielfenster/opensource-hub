import { technologiesService } from '$/server/modules/technologies/technologies.service';
import { Hono } from 'hono';

export const technologiesRouter = new Hono().get('/', async (c) => {
	try {
		const technologies = await technologiesService.getAllTechnologies();
		return c.json(technologies);
	} catch (error) {
		console.error('Error fetching technologies:', error);
		throw error;
	}
});
