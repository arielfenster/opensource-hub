import type { UpdateTechnologyRequestInput } from '$/shared/schemas/technologies/update-technology-request.schema';
import type { TechnologyRequestStatus } from '$/shared/types/technology-requests';

export class UpdateTechnologyRequestDTO {
	private constructor(
		public readonly id: string,
		public readonly status: TechnologyRequestStatus,
	) {}

	static create(id: string, input: UpdateTechnologyRequestInput) {
		const { status } = input;
		return new UpdateTechnologyRequestDTO(id, status);
	}
}
