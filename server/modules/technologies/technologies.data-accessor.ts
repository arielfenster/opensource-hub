import { db } from '$/server/database/db';
import { projectsToTechnologies, technologyRequests } from '$/server/database/schemas';
import type { TechnologyData } from '$/shared/types/technologies';
import { eq } from 'drizzle-orm';
import { DataAccessor } from '../dal/data-accessor';
import type { RequestTechnologyDTO } from './dto/request-technology.dto';
import type { UpdateTechnologyRequestDTO } from './dto/update-technology-request.dto';

export class TechnologiesDataAccessor extends DataAccessor {
	async findAllTechnologies(): Promise<TechnologyData[]> {
		return this.db.query.technologies.findMany({
			with: {
				group: true,
			},
		});
	}

	async linkTechnologiesToProject(projectId: string, technologyIds: string[]) {
		const links = technologyIds.map((technologyId) => ({
			projectId,
			technologyId,
		}));

		await this.db.insert(projectsToTechnologies).values(links).returning().execute();
	}

	async createTechnologyRequest(dto: RequestTechnologyDTO) {
		const [request] = await this.db
			.insert(technologyRequests)
			.values(dto)
			.returning()
			.execute();

		return request;
	}

	async updateTechnologyRequest(dto: UpdateTechnologyRequestDTO) {
		const { id, status } = dto;

		const [updatedRequest] = await this.db
			.update(technologyRequests)
			.set({ status })
			.where(eq(technologyRequests.id, id))
			.returning()
			.execute();

		return updatedRequest;
	}

	async findAllTechnologyRequests() {
		return this.db.query.technologyRequests
			.findMany({
				where: (fields, { eq }) => eq(fields.status, 'pending'),
			})
			.execute();
	}
}

export const technologiesDataAccessor = new TechnologiesDataAccessor(db);
