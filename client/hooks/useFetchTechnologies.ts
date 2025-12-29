import { useQuery } from '@tanstack/react-query';
import { useRpcQueryClient } from '../providers/rpc-query-provider';

// TODO: move this to technologies autocomplete folder
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
