import type { FindUserParams, FindUserUniqueIdentifier } from '../types';

type WithTablesConfig = Partial<{
	socialLinks: true;
	projects: true;
}>;

type FindUserOptions = {
	withTables: WithTablesConfig;
};

export class FindUserDTO {
	private constructor(
		public readonly key: FindUserUniqueIdentifier,
		public readonly value: string,
		public readonly withTables?: WithTablesConfig,
	) {}

	static create(data: FindUserParams, options?: FindUserOptions): FindUserDTO {
		const searchKey = this.getSearchKey(data);
		const searchValue = data[searchKey] as string;

		return new FindUserDTO(searchKey, searchValue, options?.withTables);
	}

	private static getSearchKey(params: FindUserParams): FindUserUniqueIdentifier {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			throw new Error('No search parameters provided');
		}

		return keys[0] as FindUserUniqueIdentifier;
	}
}
