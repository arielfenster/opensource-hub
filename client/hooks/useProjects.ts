import { safeParse } from 'valibot';
import {
	paginationSchema,
	type PaginationInput,
	type PaginationOutput,
} from '$/shared/schemas/common/pagination.schema';
import { superjsonDeserialize, type AppSuperJsonResult } from '$/shared/superjson';
import type { ProjectDetails } from '$/shared/types/projects';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRpcQueryClient } from '../providers/rpc-query-provider';

type Props = Partial<PaginationInput>;

export function useProjects(pagination: Props = {}) {
	const rpcClient = useRpcQueryClient();

	const filters = safeParse(paginationSchema, pagination).output as PaginationOutput;

	return useInfiniteQuery<ProjectDetails[]>({
		queryKey: ['projects', pagination],
		initialPageParam: 0,
		initialData: { pages: [], pageParams: [0] },
		getNextPageParam: (lastPage, _, lastPageParam) => {
			return filters.limit <= lastPage.length
				? (lastPageParam as number) + lastPage.length
				: null;
		},
		queryFn: async ({ pageParam }) => {
			const response = await rpcClient.projects.$get({
				query: {
					limit: String(filters.limit),
					skip: String(pageParam),
				},
			});
			const data = (await response.json()) as AppSuperJsonResult<ProjectDetails[]>;
			return superjsonDeserialize(data);
		},
		refetchOnWindowFocus: false,
	});
}
