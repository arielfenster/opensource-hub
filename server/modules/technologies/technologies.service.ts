import type { RequestTechnologyDTO } from './dto/request-technology.dto';
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
}

export const technologiesService = new TechnologiesService();
