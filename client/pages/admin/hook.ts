import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { useQuery } from '@tanstack/react-query';

export function useAdminData() {
	const rpcClient = useRpcQueryClient();

	const technologyRequestsQuery = useQuery({
		queryKey: ['admin', 'technology-requests'],
		queryFn: async () => (await rpcClient.admin['technology-requests'].$get()).json(),
		initialData: [],
	});
	const usersQuery = useQuery({
		queryKey: ['admin', 'users'],
		queryFn: async () => (await rpcClient.admin.users.$get()).json(),
	});
	const settingsQuery = useQuery({
		queryKey: ['admin', 'settings'],
		queryFn: async () => (await rpcClient.admin.settings.$get()).json(),
	});

	return {
		technologyRequests: technologyRequestsQuery.data,
		users: usersQuery.data,
		settings: settingsQuery.data,
		loading: technologyRequestsQuery.isPending || usersQuery.isPending || settingsQuery.isPending,
		errors: [technologyRequestsQuery.error, usersQuery.error, settingsQuery.error],
	};
}
