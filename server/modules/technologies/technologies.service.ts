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
		return technologiesDataAccessor.updateTechnologyRequest(dto);
	}
}

export const technologiesService = new TechnologiesService();
