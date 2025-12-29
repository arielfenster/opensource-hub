import type { RequestTechnologyInput } from '$/shared/schemas/technologies/request-technology.schema';
import type { TechnologyGroupName } from '$/shared/types/technologies';

export class RequestTechnologyDTO {
	constructor(
		public readonly name: string,
		public readonly group: TechnologyGroupName,
		public readonly requestedBy: string,
		// public readonly comment?: string,
	) {}

	static create(input: RequestTechnologyInput, requestedBy: string) {
		const { name, group, comment } = input;
		return new RequestTechnologyDTO(name, group, requestedBy /*, comment */);
	}
}
