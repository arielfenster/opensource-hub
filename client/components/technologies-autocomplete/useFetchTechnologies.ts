import { useQuery } from '@tanstack/react-query';
import { useRpcQueryClient } from '../../providers/rpc-query-provider';

export function useFetchTechnologies() {
	const rpcClient = useRpcQueryClient();

	return useQuery({
		queryKey: ['technologies'],
		queryFn: async () => {
			const response = await rpcClient.technologies.$get();
			return response.json();
		},
		initialData: [],
		refetchOnWindowFocus: false,
	});
}
