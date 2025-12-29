import type { RequestTechnologyInput } from '$/shared/schemas/technologies/request-technology.schema';
import type { Context } from 'hono';
import { usersHandler } from '../users/users.handler';
import { RequestTechnologyDTO } from './dto/request-technology.dto';
import { technologiesService } from './technologies.service';

type RequestNewTechnologyContext = Context<{}, any, { out: { json: RequestTechnologyInput } }>;

class TechnologiesHandler {
	async getAllTechnologies() {
		return technologiesService.getAllTechnologies();
	}

	async requestNewTechnology(c: RequestNewTechnologyContext) {
		const input = c.req.valid('json');
		const requestedBy = (await usersHandler.getCurrentUser(c))!.email;

		const dto = RequestTechnologyDTO.create(input, requestedBy);
		return technologiesService.requestNewTechnology(dto);
	}
}

export const technologiesHandler = new TechnologiesHandler();
