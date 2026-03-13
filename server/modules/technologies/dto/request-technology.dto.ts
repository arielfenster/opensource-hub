import type { RequestTechnologyInput } from '$/shared/schemas/technologies/request-technology.schema';

export class RequestTechnologyDTO {
	private constructor(
		public readonly name: string,
		public readonly groupId: string,
		public readonly requestedBy: string,
		// public readonly comment?: string,
	) {}

	static create(input: RequestTechnologyInput, requestedBy: string) {
		const { name, groupId, comment } = input;
		return new RequestTechnologyDTO(name, groupId, requestedBy /*, comment */);
	}
}
