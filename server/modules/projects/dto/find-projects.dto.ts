import { projects } from '$/server/database/schemas';
import type { PaginationOutput } from '$/shared/schemas/common/pagination.schema';
import type { Project } from '$/shared/types/projects';
import { SQL, asc, desc } from 'drizzle-orm';

type OrderBy = {
	[Key in keyof Partial<Pick<Project, 'createdAt' | 'updatedAt'>>]: {
		direction: 'asc' | 'desc';
		order?: number;
	};
};

type FindProjectsOptions = {
	orderBy?: OrderBy;
};

export class FindProjectsDTO {
	private constructor(
		public readonly limit: number,
		public readonly skip: number,
		public readonly orderBy?: SQL<unknown>[],
	) {}

	static create(input: PaginationOutput, options?: FindProjectsOptions) {
		const { limit, skip } = input;
		const orderByClause = this.buildOrderByClause(options?.orderBy);

		return new FindProjectsDTO(limit, skip, orderByClause);
	}

	private static buildOrderByClause(orderBy?: OrderBy) {
		if (!orderBy) {
			return undefined;
		}

		return Object.entries(orderBy)
			.sort(
				([_, fieldAConfig], [__, fieldBConfig]) =>
					(fieldAConfig.order ?? 0) - (fieldBConfig.order ?? 0),
			)
			.reduce((acc, [field, fieldConfig]) => {
				if (fieldConfig.direction === 'asc') {
					acc.push(asc(projects[field as keyof Project]));
				} else {
					acc.push(desc(projects[field as keyof Project]));
				}
				return acc;
			}, [] as SQL<unknown>[]);
	}
}
