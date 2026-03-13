import { executeDataOperation } from '../dal/data-executor';
import { CreateTechnologyDTO } from './dto/create-technology.dto';
import type { RequestTechnologyDTO } from './dto/request-technology.dto';
import type { UpdateTechnologyRequestDTO } from './dto/update-technology-request.dto';
import { technologiesDataAccessor } from './technologies.data-accessor';

class TechnologiesService {
	async getAllTechnologies() {
		return technologiesDataAccessor.findAllTechnologies();
	}

	async requestNewTechnology(dto: RequestTechnologyDTO) {
		return technologiesDataAccessor.createTechnologyRequest(dto);
	}

	async getTechnologyRequests() {
		return technologiesDataAccessor.findAllTechnologyRequests();
	}

	async updateTechnologyRequest(dto: UpdateTechnologyRequestDTO) {
		return executeDataOperation(async ({ technologies }) => {
			const updatedRequest = await technologies.updateTechnologyRequest(dto);

			if (updatedRequest.status === 'approved') {
				const createTechnologyDto = CreateTechnologyDTO.create(
					updatedRequest.groupId,
					updatedRequest.name,
				);

				await technologies.addTechnology(createTechnologyDto);
			}
			return updatedRequest;
		});
	}
}

export const technologiesService = new TechnologiesService();
