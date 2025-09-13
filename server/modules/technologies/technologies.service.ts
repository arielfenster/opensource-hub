import { technologiesDataAccessor } from './technologies.data-accessor';

class TechnologiesService {
	async getAllTechnologies() {
		return technologiesDataAccessor.findAllTechnologies();
	}
}

export const technologiesService = new TechnologiesService();
