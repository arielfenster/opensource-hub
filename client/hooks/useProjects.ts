import { useQuery } from '@tanstack/react-query';
import { useRpcQueryClient } from '../providers/rpc-query-provider';
import { paginationSchema, type PaginationInput } from '$/shared/schemas/common/pagination.schema';

type Props = Partial<PaginationInput>;

export function useProjects(pagination: Props = {}) {
	const rpcClient = useRpcQueryClient();

	return useQuery({
		queryKey: ['projects', pagination],
		queryFn: async () => {
			const filters = paginationSchema.safeParse(pagination).data!;
			const response = await rpcClient.projects.$get({
				query: {
					limit: String(filters.limit),
					skip: String(filters.skip),
				},
			});
			return response.json();
		},
		initialData: [],
		refetchOnWindowFocus: false,
	});
}
