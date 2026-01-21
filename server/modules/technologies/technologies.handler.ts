import type { RequestTechnologyInput } from '$/shared/schemas/technologies/request-technology.schema';
import type { UpdateTechnologyRequestInput } from '$/shared/schemas/technologies/update-technology-request.schema';
import type { Context } from 'hono';
import { usersHandler } from '../users/users.handler';
import { RequestTechnologyDTO } from './dto/request-technology.dto';
import { technologiesService } from './technologies.service';
import { UpdateTechnologyRequestDTO } from './dto/update-technology-request.dto';

type RequestNewTechnologyContext = Context<{}, any, { out: { json: RequestTechnologyInput } }>;

type UpdateTechnologyRequestContext = Context<
	{},
	'/technology-requests/:id',
	{ out: { json: UpdateTechnologyRequestInput } }
>;

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

	async getTechnologyRequests() {
		return technologiesService.getTechnologyRequests();
	}

	async updateTechnologyRequest(c: UpdateTechnologyRequestContext) {
		const id = c.req.param('id');
		const input = c.req.valid('json');
		const dto = UpdateTechnologyRequestDTO.create(id, input);

		const updatedRequest = await technologiesService.updateTechnologyRequest(dto);
		// TODO: send email to requester about status update

		return updatedRequest;
	}
}

export const technologiesHandler = new TechnologiesHandler();
