export class CreateTechnologyDTO {
	constructor(
		public readonly groupId: string,
		public readonly name: string,
	) {}

	static create(groupId: string, name: string) {
		return new CreateTechnologyDTO(groupId, name);
	}
}
